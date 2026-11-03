import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Mail,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  HOMEPAGE_HERO,
  HERO_VALUE_PROPOSITIONS,
  HERO_WORKFLOW_COMPARISON,
  TARGET_AUDIENCE_SEGMENTS,
  HOMEPAGE_SERVICES_BENTO,
  FEATURED_SOLUTION_BLUEPRINTS,
  WHY_BYTE_PILLARS,
  DEVELOPMENT_PROCESS_PHASES,
  type WorkflowComparisonTabId,
  type FeaturedSolutionBlueprint,
} from '../config/homepage';
import { buildConsultationMailto } from '../config/navigation';
import { BYTE_BRAND } from '../styles/tokens';
import { cn } from '../lib/utils';
import { ArchitecturalSection, GridCrosshair } from '../components/ui/architectural-grid';
import { SectionKicker, InlineMetadata } from '../components/ui/section-kicker';
import { Button } from '../components/ui/button';
import {
  Card,
  CardTitle,
  CardDescription,
} from '../components/ui/card';
import {
  HeroHeadlineReveal,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from '../components/ui/motion-primitives';
import { ServiceSchematic } from '../components/home/ServiceSchematic';

/**
 * BYTE TECHNOLOGY — COMPLETE HOMEPAGE
 * Implements:
 * 1. Premium Hero Section ("Software that replaces your manual workflows.") + Interactive Workflow Comparison Panel ("Today" vs "With Byte") + Bottom Mission Statement
 * 2. Clear Company Introduction & Target Customer Profiles (Businesses & Organizations in Ethiopia)
 * 3. Services Overview (Asymmetric 12-Column Bento Matrix across all 7 Official Services with custom SVG schematics)
 * 4. Featured Work / Reference Enterprise Solution Blueprints (Interactive 4-Blueprint Architecture Explorer — zero fabricated data)
 * 5. Why Byte Technology (High-contrast Dark Section #1A2130 centering "Our mission is simple: To Digitalize Ethiopia.")
 * 6. Our Development Process (4-Phase Engineering & Delivery Lifecycle)
 * 7. Strong Contact & Consultation CTA (Dark Section with interactive capability brief selector + direct email copy/mailto)
 */
export function HomePage() {
  const [comparisonTab, setComparisonTab] = React.useState<WorkflowComparisonTabId>('today');
  const [activeBlueprintId, setActiveBlueprintId] = React.useState<FeaturedSolutionBlueprint['id']>('erp-blueprint');
  const [selectedCtaService, setSelectedCtaService] = React.useState<string>('Custom software and ERP systems');
  const [emailCopied, setEmailCopied] = React.useState(false);
  const [hydrationStage, setHydrationStage] = React.useState<number>(() =>
    typeof window !== 'undefined' && window.location.hash ? 2 : 0
  );

  React.useEffect(() => {
    if (hydrationStage >= 2) return;
    let frame2 = 0;
    const frame1 = window.requestAnimationFrame(() => {
      React.startTransition(() => {
        setHydrationStage(1);
      });
      frame2 = window.requestAnimationFrame(() => {
        React.startTransition(() => {
          setHydrationStage(2);
        });
      });
    });
    return () => {
      window.cancelAnimationFrame(frame1);
      if (frame2) window.cancelAnimationFrame(frame2);
    };
  }, [hydrationStage]);

  const activeComparison = HERO_WORKFLOW_COMPARISON.states[comparisonTab];

  const activeBlueprint =
    FEATURED_SOLUTION_BLUEPRINTS.find((bp) => bp.id === activeBlueprintId) ??
    FEATURED_SOLUTION_BLUEPRINTS[0];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(BYTE_BRAND.email);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${BYTE_BRAND.email}`;
    }
  };

  return (
    <div>
      {/* =====================================================================
          SECTION 1: PREMIUM HERO SECTION (Warm Alabaster #F2F2EE + Blueprint Grid)
      ====================================================================== */}
      <ArchitecturalSection
        tone="light"
        withGridBg
        withBottomRule
        className="pt-10 pb-14 md:pt-16 md:pb-20"
      >
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left Side (7 Columns): Headline, Supporting Copy, CTAs & Value Propositions */}
          <div className="lg:col-span-7 space-y-6">
            <SectionKicker
              index="01"
              label={HOMEPAGE_HERO.kicker}
              tone="light"
            />

            <HeroHeadlineReveal
              text={HOMEPAGE_HERO.headline}
              className="font-display text-[clamp(2.35rem,4.5vw,3.85rem)] font-bold leading-[1.06] tracking-[-0.03em] text-[#1A2130]"
            />

            <p className="max-w-xl text-base leading-relaxed text-[#4A5365] sm:text-lg">
              {HOMEPAGE_HERO.lead}
            </p>

            {/* Primary & Secondary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <Button asChild variant="primary" size="lg">
                <Link to={HOMEPAGE_HERO.primaryCta.path}>
                  <span>{HOMEPAGE_HERO.primaryCta.label}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>

              <Button asChild variant="outline" size="lg">
                <a href={HOMEPAGE_HERO.secondaryCta.href}>
                  <span>{HOMEPAGE_HERO.secondaryCta.label}</span>
                </a>
              </Button>
            </div>

            {/* Compact Two-Column List of Four Value Propositions */}
            <div className="pt-2">
              <ul
                aria-label="Byte Technology value propositions"
                className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2"
              >
                {HERO_VALUE_PROPOSITIONS.map((item) => (
                  <li
                    key={item.id}
                    className={cn(
                      'flex items-start gap-2.5 text-sm leading-snug',
                      item.verified
                        ? 'text-[#1A2130]'
                        : 'rounded-md border border-dashed border-[#9A3412]/40 bg-[#FAF9F6] px-2.5 py-1.5 text-[#4A5365]'
                    )}
                  >
                    {item.verified ? (
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FA8112]"
                      />
                    ) : (
                      <AlertCircle
                        aria-hidden="true"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#9A3412]"
                      />
                    )}
                    <div className="min-w-0">
                      <span className={cn(item.verified ? 'font-medium text-[#1A2130]' : 'line-through decoration-[#9A3412]/50 text-xs text-[#525B6C]')}>
                        {item.text}
                      </span>
                      {!item.verified && item.reviewFlag && (
                        <span className="mt-0.5 block font-mono text-[10px] font-semibold text-[#9A3412]">
                          [{item.reviewFlag}]
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side (5 Columns): Interactive Business Workflow Comparison Card */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-lg border border-[#DFDFD9] bg-[#FFFFFF] shadow-[0_14px_36px_-10px_rgba(26,33,48,0.1)]">
              <GridCrosshair className="absolute top-3.5 right-3.5 pointer-events-none" tone="light" />

              {/* Top Header & Interactive Selectable Tabs: Today | With Byte */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DFDFD9] bg-[#FAF9F6] px-4 py-3.5 sm:px-6">
                <div
                  role="tablist"
                  aria-label="Workflow comparison view"
                  className="inline-flex items-center rounded-md border border-[#DFDFD9] bg-[#F2F2EE] p-1"
                >
                  {(['today', 'with-byte'] as const).map((tabKey) => {
                    const tabState = HERO_WORKFLOW_COMPARISON.states[tabKey];
                    const isSelected = comparisonTab === tabKey;
                    return (
                      <button
                        key={tabKey}
                        id={`hero-comparison-tab-${tabKey}`}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        aria-controls={`hero-comparison-panel-${tabKey}`}
                        onClick={() => setComparisonTab(tabKey)}
                        className={cn(
                          'relative rounded-[4px] px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA8112]',
                          isSelected
                            ? 'bg-[#1A2130] text-[#F2F2EE] shadow-xs'
                            : 'text-[#4A5365] hover:text-[#1A2130]'
                        )}
                      >
                        {tabState.tabLabel}
                      </button>
                    );
                  })}
                </div>

                <span className="font-mono text-[11px] font-medium text-[#525B6C] pr-4">
                  Illustrative scenario
                </span>
              </div>

              {/* Tab Panel Body */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeComparison.id}
                  id={`hero-comparison-panel-${activeComparison.id}`}
                  role="tabpanel"
                  aria-labelledby={`hero-comparison-tab-${activeComparison.id}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="p-4 sm:p-6"
                >
                  {/* Column Headers */}
                  <div className="grid grid-cols-12 items-center gap-3 border-b border-[#DFDFD9] pb-2.5 text-[11px] font-semibold tracking-[0.04em] uppercase text-[#525B6C]">
                    <div className="col-span-4 sm:col-span-5">
                      {activeComparison.columnLeftHeader}
                    </div>
                    <div className="col-span-8 sm:col-span-7 text-right">
                      {activeComparison.columnRightHeader}
                    </div>
                  </div>

                  {/* Four Comparison Rows */}
                  <div className="divide-y divide-[#DFDFD9]/80">
                    {activeComparison.rows.map((row) => (
                      <div
                        key={row.area}
                        className="grid grid-cols-12 items-center gap-3 py-3.5 text-sm transition-colors hover:bg-[#FAF9F6]/70"
                      >
                        <div className="col-span-4 sm:col-span-5 font-medium text-[#1A2130]">
                          {row.area}
                        </div>
                        <div className="col-span-8 sm:col-span-7 flex items-center justify-end text-right">
                          {row.isMonospace ? (
                            <code className="rounded border border-[#DFDFD9] bg-[#F2F2EE] px-2 py-0.5 font-mono text-xs font-medium text-[#1A2130] break-all">
                              {row.value}
                            </code>
                          ) : comparisonTab === 'with-byte' ? (
                            <span className="inline-flex items-center justify-end gap-1.5 font-medium text-[#1A2130]">
                              <CheckCircle2
                                className="h-3.5 w-3.5 shrink-0 text-[#FA8112]"
                                aria-hidden="true"
                              />
                              <span>{row.value}</span>
                            </span>
                          ) : (
                            <span className="text-[#4A5365]">{row.value}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Callout Box Below Rows */}
                  <div
                    className={cn(
                      'mt-4 rounded-md border px-4 py-3 transition-colors',
                      comparisonTab === 'today'
                        ? 'border-[#FA8112]/35 bg-[#FAF9F6] text-[#9A3412]'
                        : 'border-[#1A2130] bg-[#1A2130] text-[#F2F2EE]'
                    )}
                  >
                    <p className="text-xs font-semibold sm:text-sm">
                      {activeComparison.summaryMessage}
                    </p>
                  </div>

                  {/* Explicit Illustrative Disclaimer */}
                  <p className="mt-2.5 text-[11px] text-[#525B6C]">
                    {HERO_WORKFLOW_COMPARISON.disclaimer}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Mission Statement below Subtle Horizontal Divider */}
        <div className="mt-12 border-t border-[#DFDFD9] pt-6 md:mt-14 md:pt-7">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <p className="font-display text-base font-semibold tracking-[-0.01em] text-[#1A2130] sm:text-lg">
              {HOMEPAGE_HERO.mission}
            </p>
            <span className="font-mono text-xs text-[#525B6C]">
              Official Mandate · {BYTE_BRAND.name}, {BYTE_BRAND.location}
            </span>
          </div>
        </div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 2: COMPANY INTRODUCTION & TARGET ORGANIZATIONS (Crisp Ivory #FAF9F6)
      ====================================================================== */}
      <ArchitecturalSection tone="ivory" withBottomRule>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left 5 Columns: Company Introduction Narrative */}
          <ScrollReveal className="lg:col-span-5 space-y-5">
            <SectionKicker
              index="02"
              label="Who We Partner With"
              tone="light"
            />
            <h2 className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[#1A2130]">
              Built for Businesses and Organizations Ready to Modernize.
            </h2>
            <p className="text-base leading-relaxed text-[#4A5365]">
              Across {BYTE_BRAND.location}, ambitious enterprises and institutions are
              outgrowing manual paper trails, disconnected spreadsheets, and fragile
              legacy tools. Digitalization is not simply launching a website—it is
              engineering the operational systems that allow your people to work with
              speed, accuracy, and clarity.
            </p>
            <p className="text-sm leading-relaxed text-[#4A5365]">
              Byte Technology serves as a long-term engineering and consulting partner,
              guiding organizations from initial technical strategy and UI/UX design to
              custom ERP implementation, cloud infrastructure, and AI automation.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[#1A2130] hover:text-[#FA8112]"
              >
                <span>Read More About Our Mission in Ethiopia</span>
                <ArrowRight
                  className="h-4 w-4 text-[#FA8112] transition-transform duration-[180ms] group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </ScrollReveal>

          {/* Right 7 Columns: 4 Target Customer Archetypes Grid */}
          <StaggerContainer className="lg:col-span-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {TARGET_AUDIENCE_SEGMENTS.map((segment) => (
              <StaggerItem key={segment.index} className="h-full">
                <Card
                  surface="pure"
                  interactive
                  radius="lg"
                  padding="sm"
                  className="flex h-full flex-col justify-between border-[#DFDFD9]"
                >
                  <div className="space-y-3">
                    <InlineMetadata
                      tone="light"
                      items={[`Profile ${segment.index}`, segment.who]}
                    />
                    <h3 className="font-display text-lg font-semibold text-[#1A2130]">
                      {segment.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4A5365]">
                      {segment.challengeSolved}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-[#DFDFD9] pt-3">
                    <span className="block font-mono text-[11px] text-[#525B6C]">
                      Primary Capability Focus:
                    </span>
                    <InlineMetadata
                      tone="light"
                      className="mt-1 text-[#1A2130] font-medium"
                      items={segment.primaryCapabilities}
                    />
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </ArchitecturalSection>

      {hydrationStage >= 1 && (
        <>
          {/* =====================================================================
              SECTION 3: SERVICES OVERVIEW — 7 CAPABILITIES BENTO MATRIX (Warm Alabaster #F2F2EE)
          ====================================================================== */}
          <ArchitecturalSection
            id="capabilities-overview"
            tone="light"
            withBottomRule
          >
        <div className="space-y-12">
          <ScrollReveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl space-y-3">
              <SectionKicker
                index="03"
                label="Full-Spectrum Capabilities · 01 — 07"
                tone="light"
              />
              <h2 className="font-display text-[clamp(1.875rem,3vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[#1A2130]">
                Seven Core Capabilities. One Accountable Technology Partner.
              </h2>
            </div>
            <div className="max-w-md space-y-3">
              <p className="text-sm leading-relaxed text-[#4A5365]">
                Every service is engineered to integrate cleanly with the others—so
                your user interfaces, core ERP logic, cloud infrastructure, and AI
                workflows operate as a single cohesive system.
              </p>
              <Link
                to="/services"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#9A3412] hover:text-[#1A2130]"
              >
                <span>View Full Services Specification</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-[180ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </ScrollReveal>

          {/* Asymmetric 12-Column Bento Matrix (Row 1: 4+4+4, Row 2: 8+4, Row 3: 6+6) */}
          <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {HOMEPAGE_SERVICES_BENTO.map((service) => {
              const colSpanClass =
                service.gridSpan === 'wide'
                  ? 'md:col-span-12 lg:col-span-8'
                  : service.gridSpan === 'half'
                    ? 'md:col-span-6 lg:col-span-6'
                    : 'md:col-span-6 lg:col-span-4';

              return (
                <StaggerItem
                  key={service.id}
                  className={cn('flex', colSpanClass)}
                >
                  <Card
                    surface="light"
                    interactive
                    radius="lg"
                    padding="default"
                    className="flex w-full flex-col justify-between"
                  >
                    <div className="space-y-5">
                      <div className="flex items-center justify-between gap-2">
                        <InlineMetadata
                          tone="light"
                          items={[service.index, service.pillar]}
                        />
                      </div>

                      {/* Custom Architectural SVG Schematic */}
                      <ServiceSchematic type={service.schematicType} />

                      <div className="space-y-2">
                        <CardTitle className="text-xl text-[#1A2130]">
                          {service.index}. {service.name}
                        </CardTitle>
                        <p className="font-display text-sm font-medium text-[#1A2130]/90">
                          {service.headline}
                        </p>
                        <CardDescription className="text-sm leading-relaxed text-[#4A5365]">
                          {service.summary}
                        </CardDescription>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4 border-t border-[#DFDFD9] pt-4">
                      <div>
                        <span className="font-mono text-[11px] font-medium text-[#525B6C]">
                          Key Deliverables:
                        </span>
                        <ul
                          className={cn(
                            'mt-2 grid gap-1.5 text-xs text-[#1A2130]',
                            service.gridSpan === 'wide' || service.gridSpan === 'half'
                              ? 'grid-cols-1 sm:grid-cols-2'
                              : 'grid-cols-1'
                          )}
                        >
                          {service.deliverables.map((item) => (
                            <li key={item} className="flex items-baseline gap-2">
                              <span
                                aria-hidden="true"
                                className="font-mono text-[#9A3412]"
                              >
                                —
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <Link
                          to={`/contact?service=${encodeURIComponent(service.id)}`}
                          className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A2130] hover:text-[#9A3412]"
                        >
                          <span>Inquire About {service.name}</span>
                          <ArrowRight
                            className="h-3.5 w-3.5 text-[#9A3412] transition-transform duration-[180ms] group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </Link>
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 4: FEATURED WORK — ENTERPRISE SOLUTION BLUEPRINTS (Crisp Ivory #FAF9F6)
          Demonstrates concrete architectural solutions without fabricating client projects.
      ====================================================================== */}
      <ArchitecturalSection tone="ivory" withBottomRule>
        <div className="space-y-10">
          <ScrollReveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl space-y-3">
              <SectionKicker
                index="04"
                label="Featured Solution Architectures"
                tone="light"
              />
              <h2 className="font-display text-[clamp(1.875rem,3vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[#1A2130]">
                Engineered Blueprints for Organizational Transformation.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#4A5365]">
              Explore how Byte Technology architects production systems across ERP,
              digital customer portals, AI automation, and cloud modernization for
              organizations in {BYTE_BRAND.location}.
            </p>
          </ScrollReveal>

          {/* Interactive Segmented Blueprint Selector */}
          <div
            role="tablist"
            aria-label="Featured Solution Blueprints"
            className="grid grid-cols-1 gap-2 rounded-lg border border-[#DFDFD9] bg-[#E7E6E0]/70 p-1.5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {FEATURED_SOLUTION_BLUEPRINTS.map((bp) => {
              const isSelected = bp.id === activeBlueprint.id;
              return (
                <button
                  key={bp.id}
                  id={`home-bp-tab-${bp.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`home-bp-panel-${bp.id}`}
                  onClick={() => setActiveBlueprintId(bp.id)}
                  className={cn(
                    'relative flex items-center justify-between rounded-md px-4 py-3 text-left text-xs font-semibold transition-colors duration-[180ms] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA8112]',
                    isSelected
                      ? 'text-[#1A2130]'
                      : 'text-[#4A5365] hover:text-[#1A2130]'
                  )}
                >
                  {isSelected && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-md bg-[#FFFFFF] shadow-[0_1px_3px_rgba(26,33,48,0.08)] transition-all duration-[220ms]"
                    />
                  )}
                  <span className="relative z-10">
                    <span className="font-mono text-[#9A3412] mr-1.5">
                      {bp.index}.
                    </span>
                    {bp.tabLabel}
                  </span>
                  {isSelected && (
                    <span
                      aria-hidden="true"
                      className="relative z-10 h-1.5 w-1.5 bg-[#FA8112]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Solution Blueprint Detail Panel */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeBlueprint.id}
              id={`home-bp-panel-${activeBlueprint.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              role="tabpanel"
              aria-labelledby={`home-bp-tab-${activeBlueprint.id}`}
              className="rounded-lg border border-[#DFDFD9] bg-[#FFFFFF] p-6 sm:p-8 lg:p-10"
            >
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                {/* Left 5 Columns: Problem vs. Byte Solution Narrative */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <InlineMetadata
                      tone="light"
                      items={[
                        `Blueprint ${activeBlueprint.index}`,
                        activeBlueprint.targetOrganization,
                      ]}
                    />
                    <h3 className="font-display text-2xl font-bold leading-snug tracking-tight text-[#1A2130]">
                      {activeBlueprint.title}
                    </h3>

                    <div className="space-y-3 pt-2">
                      <div className="rounded-md border border-[#DFDFD9] bg-[#FAF9F6] p-4">
                        <span className="font-mono text-[11px] font-semibold text-[#525B6C]">
                          LEGACY BOTTLENECK
                        </span>
                        <p className="mt-1 text-sm leading-relaxed text-[#4A5365]">
                          {activeBlueprint.legacyBottleneck}
                        </p>
                      </div>

                      <div className="rounded-md border border-[#FA8112]/40 bg-[#FAF9F6] p-4">
                        <span className="font-mono text-[11px] font-semibold text-[#9A3412]">
                          BYTE TECHNOLOGY ARCHITECTURE
                        </span>
                        <p className="mt-1 text-sm leading-relaxed text-[#1A2130]">
                          {activeBlueprint.byteArchitecture}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-[#DFDFD9] pt-5">
                    <div>
                      <span className="font-mono text-xs text-[#525B6C]">
                        Capabilities Combined in This Architecture:
                      </span>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-[#1A2130]">
                        {activeBlueprint.servicesCombined.map((svc, idx) => (
                          <React.Fragment key={svc.id}>
                            <span>
                              <span className="font-mono text-[#9A3412] mr-1">
                                {svc.index}.
                              </span>
                              {svc.name}
                            </span>
                            {idx < activeBlueprint.servicesCombined.length - 1 && (
                              <span aria-hidden="true" className="text-[#525B6C]">
                                +
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <Button asChild variant="navy" size="default">
                      <Link
                        to={`/contact?service=${encodeURIComponent(
                          activeBlueprint.servicesCombined[0].id
                        )}`}
                      >
                        <span>Discuss This Architecture for Your Organization</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Right 7 Columns: 3-Stage System Flow Schematic */}
                <div className="lg:col-span-7 flex flex-col justify-between rounded-lg border border-[#DFDFD9] bg-[#F2F2EE] p-6 sm:p-8">
                  <div className="flex items-center justify-between border-b border-[#DFDFD9] pb-4">
                    <span className="font-mono text-xs font-semibold text-[#1A2130]">
                      SYSTEM ARCHITECTURE FLOW · {activeBlueprint.tabLabel.toUpperCase()}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#9A3412]">
                      3-Tier Execution
                    </span>
                  </div>

                  <div className="my-6 space-y-4">
                    {activeBlueprint.systemNodes.map((node, index) => (
                      <motion.div
                        key={node.step}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.25,
                          delay: index * 0.055,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative"
                      >
                        <div className="rounded-md border border-[#DFDFD9] bg-[#FFFFFF] p-4 sm:p-5 transition-colors hover:border-[#FA8112]/50">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-mono text-xs font-semibold text-[#9A3412]">
                              0{index + 1} · {node.step}
                            </span>
                            <span className="font-display text-sm font-bold text-[#1A2130]">
                              {node.label}
                            </span>
                          </div>
                          <p className="mt-2 text-xs leading-relaxed text-[#4A5365]">
                            {node.detail}
                          </p>
                        </div>
                        {index < activeBlueprint.systemNodes.length - 1 && (
                          <div
                            aria-hidden="true"
                            className="ml-6 h-4 w-[1.5px] bg-[#FA8112]"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="rounded-md bg-[#1A2130] px-5 py-4 text-[#F2F2EE]">
                    <span className="font-mono text-[11px] font-semibold text-[#FDA63A]">
                      OPERATIONAL OUTCOME
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-[#F2F2EE]">
                      {activeBlueprint.operationalOutcome}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </ArchitecturalSection>
        </>
      )}

      {hydrationStage >= 2 && (
        <>
          {/* =====================================================================
              SECTION 5: WHY BYTE TECHNOLOGY & MISSION MANDATE (Dark Section #1A2130)
          ====================================================================== */}
          <ArchitecturalSection
            tone="dark"
            withGridBg
            withBottomRule
            className="py-20 md:py-28"
          >
        <div className="space-y-16">
          {/* Top Mission Mandate Banner */}
          <ScrollReveal className="grid grid-cols-1 gap-10 border-b border-[#F2F2EE]/11 pb-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7 space-y-4">
              <SectionKicker
                index="05"
                label="Why Byte Technology · The Mandate"
                tone="dark"
              />
              <h2 className="font-display text-[clamp(2rem,3.6vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#F2F2EE]">
                “{BYTE_BRAND.mission}”
              </h2>
            </div>
            <div className="lg:col-span-5 space-y-4">
              <p className="text-base leading-relaxed text-[#B0B8C8]">
                True digital transformation requires more than isolated code—it
                requires an engineering partner who understands how Ethiopian
                organizations operate and builds systems worthy of long-term
                institutional trust.
              </p>
              <InlineMetadata
                tone="dark"
                items={['Modern', 'Professional', 'Innovative', 'Trustworthy', 'Ambitious']}
              />
            </div>
          </ScrollReveal>

          {/* 4 Architectural Pillars of Trust */}
          <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {WHY_BYTE_PILLARS.map((pillar) => (
              <StaggerItem key={pillar.index} className="h-full">
                <Card
                  surface="dark"
                  interactive="darkInteractive"
                  radius="lg"
                  padding="default"
                  className="flex h-full flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-[#FDA63A]">
                        {pillar.index} · {pillar.attribute}
                      </span>
                      <ShieldCheck
                        className="h-4 w-4 text-[#FA8112]"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#F2F2EE]">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#B0B8C8]">
                      {pillar.description}
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 6: OUR DEVELOPMENT PROCESS (Warm Alabaster #F2F2EE)
      ====================================================================== */}
      <ArchitecturalSection tone="light" withBottomRule>
        <div className="space-y-12">
          <ScrollReveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl space-y-3">
              <SectionKicker
                index="06"
                label="Engineering & Delivery Governance"
                tone="light"
              />
              <h2 className="font-display text-[clamp(1.875rem,3vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[#1A2130]">
                How We Deliver: From Strategic Discovery to Scalable Production.
              </h2>
            </div>
            <div className="max-w-md space-y-2">
              <p className="text-sm leading-relaxed text-[#4A5365]">
                Every engagement follows a transparent four-phase engineering
                lifecycle so your leadership has complete visibility into architecture,
                progress, and quality.
              </p>
              <Link
                to="/approach"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A2130] hover:text-[#FA8112]"
              >
                <span>Explore Our Full Engineering Approach</span>
                <ArrowRight
                  className="h-4 w-4 text-[#FA8112] transition-transform duration-[180ms] group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {DEVELOPMENT_PROCESS_PHASES.map((step) => (
              <StaggerItem key={step.phase} className="h-full">
                <Card
                  surface="pure"
                  interactive
                  radius="lg"
                  padding="default"
                  className="flex h-full flex-col justify-between border-[#DFDFD9]"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#DFDFD9] pb-3">
                      <span className="font-mono text-sm font-bold text-[#9A3412]">
                        Phase {step.phase}
                      </span>
                      <span className="font-mono text-[11px] text-[#525B6C]">
                        {step.subtitle}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold leading-snug text-[#1A2130]">
                      {step.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-[#4A5365]">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-[#DFDFD9] pt-4">
                    <span className="font-mono text-[11px] font-medium text-[#525B6C]">
                      Phase Deliverables:
                    </span>
                    <ul className="mt-2 space-y-1.5 text-xs text-[#1A2130]">
                      {step.keyOutputs.map((output) => (
                        <li key={output} className="flex items-baseline gap-2">
                          <span
                            aria-hidden="true"
                            className="font-mono font-bold text-[#9A3412]"
                          >
                            ·
                          </span>
                          <span>{output}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 7: STRONG CONTACT & CONSULTATION CTA (Dark Section #1A2130)
      ====================================================================== */}
      <ArchitecturalSection
        tone="dark"
        withGridBg
        withBottomRule={false}
        className="py-20 md:py-28"
      >
        <ScrollReveal className="rounded-lg border border-[#F2F2EE]/15 bg-[#111622] p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left 7 Columns: Consultation Headline & Direct Executive Contact */}
            <div className="lg:col-span-7 space-y-6">
              <SectionKicker
                index="07"
                label="Start a Conversation · Ethiopia"
                tone="dark"
              />

              <h2 className="font-display text-[clamp(1.875rem,3.2vw,2.875rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[#F2F2EE]">
                Ready to Modernize Your Organization’s Digital Infrastructure?
              </h2>

              <p className="max-w-xl text-base leading-relaxed text-[#B0B8C8]">
                Whether you are planning a custom enterprise ERP system, launching a
                customer-facing web or mobile application, modernizing cloud
                infrastructure, or automating workflows with AI, let’s discuss your
                roadmap.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button asChild variant="primary" size="lg">
                  <Link
                    to={`/contact?service=${encodeURIComponent(
                      selectedCtaService
                    )}`}
                  >
                    <span>Configure Project Consultation</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>

                <Button asChild variant="outlineDark" size="lg">
                  <a
                    href={buildConsultationMailto({
                      serviceName: selectedCtaService,
                    })}
                  >
                    <Mail className="h-4 w-4 text-[#FDA63A]" aria-hidden="true" />
                    <span>Email {BYTE_BRAND.email}</span>
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-[#B0B8C8]">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#FA8112]" aria-hidden="true" />
                  <span>Location: {BYTE_BRAND.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#F2F2EE]">
                    {BYTE_BRAND.email}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 rounded border border-[#F2F2EE]/20 bg-[#232C3F] px-2 py-1 font-mono text-[11px] text-[#F2F2EE] hover:border-[#FDA63A] cursor-pointer"
                  >
                    {emailCopied ? (
                      <>
                        <Check className="h-3 w-3 text-[#FDA63A]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" aria-hidden="true" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Quick Capability Scope Selector */}
            <div className="lg:col-span-5 rounded-md border border-[#F2F2EE]/12 bg-[#1A2130] p-6">
              <span className="font-mono text-xs font-semibold text-[#FDA63A]">
                SELECT PRIMARY CAPABILITY OF INTEREST
              </span>
              <p className="mt-1 text-xs text-[#B0B8C8]">
                Choose a service below to pre-configure your consultation inquiry:
              </p>

              <div
                role="radiogroup"
                aria-label="Primary capability of interest"
                className="mt-4 space-y-2"
              >
                {HOMEPAGE_SERVICES_BENTO.map((svc) => {
                  const isActive = selectedCtaService === svc.name;
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      role="radio"
                      aria-checked={isActive}
                      onClick={() => setSelectedCtaService(svc.name)}
                      className={cn(
                        'flex w-full items-center justify-between rounded border px-3.5 py-2.5 text-left text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA8112]',
                        isActive
                          ? 'border-[#FA8112] bg-[#232C3F] text-[#F2F2EE] font-semibold'
                          : 'border-[#F2F2EE]/10 bg-[#111622]/60 text-[#B0B8C8] hover:border-[#F2F2EE]/30 hover:text-[#F2F2EE]'
                      )}
                    >
                      <span>
                        <span className="font-mono text-[#FDA63A] mr-2">
                          {svc.index}.
                        </span>
                        {svc.name}
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-2 w-2 rounded-xs',
                          isActive ? 'bg-[#FA8112]' : 'bg-transparent'
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ArchitecturalSection>
        </>
      )}
    </div>
  );
}
