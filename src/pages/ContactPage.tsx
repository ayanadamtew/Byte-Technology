import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Copy,
  Loader2,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  CONSULTATION_RESPONSE_STEPS,
  resolveServiceIdFromParam,
  validateConsultationForm,
  formatConsultationBrief,
  type ConsultationValidationResult,
} from '../config/pages';
import { BYTE_BRAND, BYTE_OFFICIAL_SERVICES } from '../styles/tokens';
import { cn } from '../lib/utils';
import { ArchitecturalSection, GridCrosshair } from '../components/ui/architectural-grid';
import { SectionKicker, InlineMetadata } from '../components/ui/section-kicker';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import {
  HeroHeadlineReveal,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from '../components/ui/motion-primitives';

interface ContactSubmissionOutcome {
  deliveryStatus: 'delivered' | 'provider_unconfigured' | 'provider_error' | 'network_error';
  message: string;
  recipient: string;
  emailId?: string;
  brief: ReturnType<typeof formatConsultationBrief>;
}

/**
 * BYTE TECHNOLOGY — CONTACT & CONSULTATION PAGE (/contact)
 * Implements the approved section structure and interactive Project Consultation Brief Builder
 * with server-side validation and Resend email notification integration (`POST /api/contact`):
 * 5.1 Contact Hero & Direct Executive Channels (Light #F2F2EE)
 * 5.2 Interactive Project Consultation & Service Intake (Ivory #FAF9F6)
 * 5.3 What to Expect After You Reach Out — 3-Step Response Governance (Dark #1A2130)
 */
export function ContactPage() {
  const [searchParams] = useSearchParams();
  const initialServiceParam = searchParams.get('service');

  const [selectedServiceIds, setSelectedServiceIds] = React.useState<string[]>(() => {
    const resolved = resolveServiceIdFromParam(initialServiceParam);
    return resolved ? [resolved] : ['custom-software-and-erp-systems'];
  });
  const [senderName, setSenderName] = React.useState('');
  const [senderRole, setSenderRole] = React.useState('');
  const [organizationName, setOrganizationName] = React.useState('');
  const [workEmail, setWorkEmail] = React.useState('');
  const [projectContext, setProjectContext] = React.useState('');
  const [websiteHoneypot, setWebsiteHoneypot] = React.useState('');

  const [errors, setErrors] = React.useState<ConsultationValidationResult['errors']>({});
  const [submitErrorBanner, setSubmitErrorBanner] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [providerConfigured, setProviderConfigured] = React.useState<boolean | null>(null);
  const [submissionOutcome, setSubmissionOutcome] =
    React.useState<ContactSubmissionOutcome | null>(null);
  const [copiedBrief, setCopiedBrief] = React.useState(false);
  const [copiedDirectEmail, setCopiedDirectEmail] = React.useState(false);

  // Sync pre-selected service when URL query parameter changes
  React.useEffect(() => {
    const resolved = resolveServiceIdFromParam(initialServiceParam);
    if (resolved) {
      setSelectedServiceIds((prev) =>
        prev.includes(resolved) ? prev : [resolved, ...prev]
      );
    }
  }, [initialServiceParam]);

  // Query server-side email provider readiness status on mount
  React.useEffect(() => {
    let active = true;
    fetch('/api/contact/status')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data && typeof data.configured === 'boolean') {
          setProviderConfigured(data.configured);
        }
      })
      .catch(() => {
        // Non-blocking status check
      });
    return () => {
      active = false;
    };
  }, []);

  const toggleService = (serviceId: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
    if (errors.selectedServiceIds) {
      setErrors((prev) => ({ ...prev, selectedServiceIds: undefined }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitErrorBanner(null);

    const payload = {
      selectedServiceIds,
      senderName,
      senderRole,
      organizationName,
      workEmail,
      projectContext,
      websiteHoneypot,
    };

    const validation = validateConsultationForm(payload);

    if (!validation.valid) {
      setErrors(validation.errors);
      setSubmissionOutcome(null);
      setSubmitErrorBanner(
        'Please review the highlighted fields below before submitting your consultation inquiry.'
      );
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const localFormatted = formatConsultationBrief(payload);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok && (response.status === 400 || response.status === 429)) {
        if (data?.errors) {
          setErrors(data.errors);
        }
        setSubmissionOutcome(null);
        setSubmitErrorBanner(
          data?.message ||
            'Please correct the highlighted fields and resubmit your consultation brief.'
        );
        return;
      }

      if (data && data.brief) {
        setSubmissionOutcome({
          deliveryStatus: data.deliveryStatus ?? 'provider_unconfigured',
          message: data.message,
          recipient: data.recipient ?? BYTE_BRAND.email,
          emailId: data.emailId,
          brief: data.brief,
        });
      } else {
        setSubmissionOutcome({
          deliveryStatus: 'provider_error',
          message:
            data?.message ||
            `Your consultation brief was formatted, but automated server email delivery encountered an error. Please use the direct email dispatch button below to send to ${BYTE_BRAND.email}.`,
          recipient: BYTE_BRAND.email,
          brief: localFormatted,
        });
      }
    } catch {
      setSubmissionOutcome({
        deliveryStatus: 'network_error',
        message: `Could not reach the server endpoint, so your consultation brief was prepared locally. Please click "Open in Email Client" below to send directly to ${BYTE_BRAND.email}.`,
        recipient: BYTE_BRAND.email,
        brief: localFormatted,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyBriefText = async () => {
    if (!submissionOutcome) return;
    try {
      await navigator.clipboard.writeText(submissionOutcome.brief.body);
      setCopiedBrief(true);
      window.setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      // Fallback handled via direct mailto link
    }
  };

  const handleCopyDirectEmail = async () => {
    try {
      await navigator.clipboard.writeText(BYTE_BRAND.email);
      setCopiedDirectEmail(true);
      window.setTimeout(() => setCopiedDirectEmail(false), 2500);
    } catch {
      window.location.href = `mailto:${BYTE_BRAND.email}`;
    }
  };

  return (
    <div>
      {/* =====================================================================
          SECTION 5.1: CONTACT HERO & DIRECT EXECUTIVE CHANNELS (Light #F2F2EE)
      ====================================================================== */}
      <ArchitecturalSection
        tone="light"
        withGridBg
        withBottomRule
        className="pt-12 pb-16 md:pt-20 md:pb-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start"
        >
          {/* Left 7 Columns */}
          <div className="lg:col-span-7 space-y-5">
            <SectionKicker
              index="01"
              label={`Contact & Consultation · ${BYTE_BRAND.location}`}
              tone="light"
            />

            <HeroHeadlineReveal
              text="Start a Project Conversation with Byte Technology."
              className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#1A2130]"
            />

            <p className="max-w-2xl text-base leading-relaxed text-[#4A5365] sm:text-lg">
              Whether you are looking to architect a custom ERP system, build a
              web or mobile application, modernize your cloud infrastructure, or
              automate internal workflows, our team is ready to discuss your
              objectives.
            </p>

            <InlineMetadata
              tone="light"
              items={[
                `Mission: “${BYTE_BRAND.mission}”`,
                `Location: ${BYTE_BRAND.location}`,
                'For Businesses & Organizations',
              ]}
            />
          </div>

          {/* Right 5 Columns: Direct Executive Contact Card */}
          <div className="lg:col-span-5">
            <Card surface="pure" radius="lg" padding="default" className="relative">
              <GridCrosshair className="absolute top-3.5 right-3.5" tone="light" />
              <div className="space-y-4">
                <span className="font-mono text-xs font-semibold text-[#9A3412]">
                  DIRECT EXECUTIVE CONTACT IN ETHIOPIA
                </span>
                <h2 className="font-display text-xl font-bold text-[#1A2130]">
                  Reach Out Directly
                </h2>

                <div className="space-y-3 border-t border-[#DFDFD9] pt-4 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-[#4A5365]">
                      <Mail className="h-4 w-4 text-[#B45309]" aria-hidden="true" />
                      <span>Electronic Mail</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <a
                        href={`mailto:${BYTE_BRAND.email}`}
                        className="font-mono text-xs font-semibold text-[#1A2130] hover:text-[#B45309] underline-offset-4 hover:underline"
                      >
                        {BYTE_BRAND.email}
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyDirectEmail}
                        className="inline-flex items-center gap-1 rounded border border-[#DFDFD9] bg-[#FAF9F6] px-2 py-1 font-mono text-[11px] text-[#1A2130] hover:border-[#FA8112] cursor-pointer"
                      >
                        {copiedDirectEmail ? (
                          <>
                            <Check className="h-3 w-3 text-[#15803D]" aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-[#4A5365]">
                      <MapPin className="h-4 w-4 text-[#B45309]" aria-hidden="true" />
                      <span>Location</span>
                    </span>
                    <span className="font-semibold text-[#1A2130]">
                      {BYTE_BRAND.location}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 border-t border-[#DFDFD9] pt-3">
                  <p className="rounded border border-dashed border-[#1A2130]/25 bg-[#FAF9F6] px-3 py-2 font-mono text-[11px] text-[#525B6C]">
                    [CONTENT PLACEHOLDER: Official Office Address in Ethiopia — e.g., City / District / Building]
                  </p>
                  <p className="rounded border border-dashed border-[#1A2130]/25 bg-[#FAF9F6] px-3 py-2 font-mono text-[11px] text-[#525B6C]">
                    [CONTENT PLACEHOLDER: Official Business Phone / WhatsApp / Facebook Contact]
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 5.2: INTERACTIVE PROJECT CONSULTATION BRIEF BUILDER (Ivory #FAF9F6)
      ====================================================================== */}
      <ArchitecturalSection tone="ivory" withBottomRule>
        <ScrollReveal className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-3">
            <SectionKicker
              index="02"
              label="Structured Project Intake"
              tone="light"
            />
            <h2 className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[#1A2130]">
              Configure Your Technical Consultation Brief
            </h2>
            <p className="text-base leading-relaxed text-[#4A5365]">
              Select the capabilities relevant to your initiative and share a
              brief overview of your organizational goals.
            </p>
          </div>

          <Card surface="pure" radius="lg" padding="lg" className="border-[#DFDFD9]">
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* Step 1: Multi-Select Capabilities (The 7 Official Services) */}
              <fieldset className="space-y-3">
                <Label asChild>
                  <legend className="text-base font-display font-bold text-[#1A2130]">
                    1. Select Capabilities Needed{' '}
                    <span className="font-mono text-xs font-normal text-[#525B6C]">
                      (Select all that apply)
                    </span>
                  </legend>
                </Label>

                <div
                  role="group"
                  aria-label="Select Capabilities Needed"
                  className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 pt-1"
                >
                  {BYTE_OFFICIAL_SERVICES.map((service) => {
                    const isSelected = selectedServiceIds.includes(service.id);
                    return (
                      <button
                        key={service.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => toggleService(service.id)}
                        className={cn(
                          'flex items-center justify-between rounded-md border px-4 py-3 text-left text-xs font-medium transition-all duration-[180ms] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA8112]',
                          isSelected
                            ? 'border-[#FA8112] bg-[#1A2130] text-[#F2F2EE] font-semibold'
                            : 'border-[#DFDFD9] bg-[#FAF9F6] text-[#1A2130] hover:border-[#1A2130]'
                        )}
                      >
                        <span>
                          <span
                            className={cn(
                              'font-mono font-semibold mr-2',
                              isSelected ? 'text-[#FDA63A]' : 'text-[#B45309]'
                            )}
                          >
                            {service.index}.
                          </span>
                          {service.name}
                        </span>
                        <span
                          aria-hidden="true"
                          className={cn(
                            'flex h-4 w-4 items-center justify-center rounded-xs border',
                            isSelected
                              ? 'border-[#FA8112] bg-[#FA8112] text-[#111622]'
                              : 'border-[#C8C8C0] bg-[#FFFFFF]'
                          )}
                        >
                          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {errors.selectedServiceIds && (
                  <p
                    id="selected-services-error"
                    role="alert"
                    className="flex items-center gap-1.5 text-xs font-medium text-[#B91C1C]"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.selectedServiceIds}</span>
                  </p>
                )}
              </fieldset>

              {/* Step 2: Contact & Organization Details */}
              <div className="grid grid-cols-1 gap-6 border-t border-[#DFDFD9] pt-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="sender-name">Your Full Name *</Label>
                  <Input
                    id="sender-name"
                    name="senderName"
                    autoComplete="name"
                    value={senderName}
                    onChange={(e) => {
                      setSenderName(e.target.value);
                      if (errors.senderName) {
                        setErrors((prev) => ({ ...prev, senderName: undefined }));
                      }
                    }}
                    placeholder="e.g., Abebe Kebede"
                    aria-invalid={Boolean(errors.senderName)}
                    aria-describedby={errors.senderName ? 'sender-name-error' : undefined}
                  />
                  {errors.senderName && (
                    <p
                      id="sender-name-error"
                      role="alert"
                      className="flex items-center gap-1.5 text-xs font-medium text-[#B91C1C]"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.senderName}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sender-role">Your Role / Title (Optional)</Label>
                  <Input
                    id="sender-role"
                    name="senderRole"
                    autoComplete="organization-title"
                    value={senderRole}
                    onChange={(e) => setSenderRole(e.target.value)}
                    placeholder="e.g., Operations Director, CEO, IT Head"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization-name">Organization Name *</Label>
                  <Input
                    id="organization-name"
                    name="organizationName"
                    autoComplete="organization"
                    value={organizationName}
                    onChange={(e) => {
                      setOrganizationName(e.target.value);
                      if (errors.organizationName) {
                        setErrors((prev) => ({
                          ...prev,
                          organizationName: undefined,
                        }));
                      }
                    }}
                    placeholder="Your Company or Institution"
                    aria-invalid={Boolean(errors.organizationName)}
                    aria-describedby={
                      errors.organizationName ? 'organization-name-error' : undefined
                    }
                  />
                  {errors.organizationName && (
                    <p
                      id="organization-name-error"
                      role="alert"
                      className="flex items-center gap-1.5 text-xs font-medium text-[#B91C1C]"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.organizationName}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="work-email">Work Email Address *</Label>
                  <Input
                    id="work-email"
                    name="workEmail"
                    type="email"
                    autoComplete="email"
                    value={workEmail}
                    onChange={(e) => {
                      setWorkEmail(e.target.value);
                      if (errors.workEmail) {
                        setErrors((prev) => ({ ...prev, workEmail: undefined }));
                      }
                    }}
                    placeholder="name@organization.com"
                    aria-invalid={Boolean(errors.workEmail)}
                    aria-describedby={errors.workEmail ? 'work-email-error' : undefined}
                  />
                  {errors.workEmail && (
                    <p
                      id="work-email-error"
                      role="alert"
                      className="flex items-center gap-1.5 text-xs font-medium text-[#B91C1C]"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.workEmail}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Step 3: Project Context & Objectives */}
              <div className="space-y-2 border-t border-[#DFDFD9] pt-6">
                <Label htmlFor="project-context">
                  Project Context &amp; Objectives *
                </Label>
                <Textarea
                  id="project-context"
                  name="projectContext"
                  value={projectContext}
                  onChange={(e) => {
                    setProjectContext(e.target.value);
                    if (errors.projectContext) {
                      setErrors((prev) => ({ ...prev, projectContext: undefined }));
                    }
                  }}
                  placeholder="Briefly describe the operational challenge, system you want to build, or transformation goal..."
                  aria-invalid={Boolean(errors.projectContext)}
                  aria-describedby={
                    errors.projectContext ? 'project-context-error' : undefined
                  }
                />
                {errors.projectContext && (
                  <p
                    id="project-context-error"
                    role="alert"
                    className="flex items-center gap-1.5 text-xs font-medium text-[#B91C1C]"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>{errors.projectContext}</span>
                  </p>
                )}
              </div>

              {/* Anti-Spam Honeypot (Hidden from assistive & visual users) */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website-honeypot">Leave this field empty</label>
                <input
                  id="website-honeypot"
                  name="websiteHoneypot"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={websiteHoneypot}
                  onChange={(e) => setWebsiteHoneypot(e.target.value)}
                />
              </div>

              {/* Validation / Submission Error Banner */}
              {submitErrorBanner && (
                <div
                  role="alert"
                  className="flex items-start gap-2.5 rounded-md border border-[#B91C1C]/35 bg-[#FEF2F2] p-4 text-xs font-medium text-[#B91C1C]"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{submitErrorBanner}</span>
                </div>
              )}

              {/* Submit Button & Server Delivery Status */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#DFDFD9] pt-6">
                <div className="space-y-1 text-xs text-[#525B6C]">
                  <p>
                    Direct recipient:{' '}
                    <span className="font-mono font-semibold text-[#1A2130]">
                      {BYTE_BRAND.email}
                    </span>
                  </p>
                  {providerConfigured !== null && (
                    <p className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#4A5365]">
                      <ShieldCheck
                        className="h-3.5 w-3.5 text-[#B45309]"
                        aria-hidden="true"
                      />
                      <span>
                        {providerConfigured
                          ? 'Server-side Resend notification: Active'
                          : 'Server validation active · Direct email dispatch & Resend integration ready'}
                      </span>
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                      <span>Submitting Consultation Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>
                        Submit Consultation Inquiry to {BYTE_BRAND.email}
                      </span>
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Consultation Submission & Delivery Status Panel */}
            {submissionOutcome && (
              <div
                role="status"
                aria-live="polite"
                className={cn(
                  'mt-8 rounded-lg border p-6',
                  submissionOutcome.deliveryStatus === 'delivered'
                    ? 'border-[#15803D]/50 bg-[#F0FDF4]'
                    : 'border-[#FA8112]/45 bg-[#FAF9F6]'
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DFDFD9] pb-4">
                  <div className="flex items-center gap-2.5 text-[#15803D]">
                    <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <h3 className="font-display text-lg font-bold text-[#1A2130]">
                      {submissionOutcome.deliveryStatus === 'delivered'
                        ? `Consultation Inquiry Sent to ${submissionOutcome.recipient}`
                        : 'Consultation Brief Validated & Ready for Dispatch'}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-[#4A5365]">
                    Recipient: {submissionOutcome.recipient}
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#4A5365]">
                  {submissionOutcome.message}
                </p>

                <pre className="mt-4 overflow-x-auto rounded-md border border-[#DFDFD9] bg-[#FFFFFF] p-4 font-mono text-xs leading-relaxed text-[#1A2130]">
                  {submissionOutcome.brief.body}
                </pre>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Button asChild variant="navy" size="default">
                    <a href={submissionOutcome.brief.mailtoHref}>
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      <span>
                        Open in Email Client ({submissionOutcome.recipient})
                      </span>
                    </a>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="default"
                    onClick={handleCopyBriefText}
                  >
                    {copiedBrief ? (
                      <>
                        <Check className="h-4 w-4 text-[#15803D]" aria-hidden="true" />
                        <span>Brief Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" aria-hidden="true" />
                        <span>Copy Formatted Brief</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </ScrollReveal>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 5.3: WHAT TO EXPECT AFTER YOU REACH OUT (Dark #1A2130)
      ====================================================================== */}
      <ArchitecturalSection
        tone="dark"
        withGridBg
        withBottomRule={false}
        className="py-20 md:py-24"
      >
        <div className="space-y-10">
          <ScrollReveal className="max-w-2xl space-y-3">
            <SectionKicker
              index="03"
              label="Consultation Governance"
              tone="dark"
            />
            <h2 className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[#F2F2EE]">
              What to Expect After You Reach Out
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {CONSULTATION_RESPONSE_STEPS.map((step) => (
              <StaggerItem key={step.step} className="h-full">
                <Card
                  surface="dark"
                  interactive="darkInteractive"
                  radius="lg"
                  padding="default"
                  className="h-full space-y-3"
                >
                  <span className="font-mono text-sm font-bold text-[#FDA63A]">
                    Step {step.step}
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#F2F2EE]">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#B0B8C8]">
                    {step.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </ArchitecturalSection>
    </div>
  );
}
