import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  Mail,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  FULL_SERVICES_SPECIFICATIONS,
  type FullServiceSpecification,
} from '../config/pages';
import { buildConsultationMailto } from '../config/navigation';
import { BYTE_BRAND } from '../styles/tokens';
import { ArchitecturalSection, GridCrosshair } from '../components/ui/architectural-grid';
import { SectionKicker, InlineMetadata } from '../components/ui/section-kicker';
import { Button } from '../components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/ui/card';
import { ServiceSchematic } from '../components/home/ServiceSchematic';

/**
 * BYTE TECHNOLOGY — SERVICES PAGE (/services)
 * Implements the approved 4-Pillar, 7-Service specification from docs/WEBSITE_STRUCTURE.md
 * and docs/WEBSITE_CONTENT.md with deep-link anchor IDs (#web-development, #custom-software-and-erp-systems, etc.).
 */
export function ServicesPage() {
  const digitalProductServices = FULL_SERVICES_SPECIFICATIONS.filter(
    (s) => s.pillarId === 'digital-products'
  );
  const erpService = FULL_SERVICES_SPECIFICATIONS.find(
    (s) => s.id === 'custom-software-and-erp-systems'
  )!;
  const aiService = FULL_SERVICES_SPECIFICATIONS.find(
    (s) => s.id === 'ai-and-business-automation'
  )!;
  const strategyCloudServices = FULL_SERVICES_SPECIFICATIONS.filter(
    (s) => s.pillarId === 'strategy-cloud'
  );

  return (
    <div>
      {/* =====================================================================
          SECTION 2.1: SERVICES HERO & 4-PILLAR CAPABILITY INDEX (Light #F2F2EE)
      ====================================================================== */}
      <ArchitecturalSection
        tone="light"
        withGridBg
        withBottomRule
        className="pt-12 pb-20 md:pt-20 md:pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start"
        >
          {/* Left 7 Columns */}
          <div className="lg:col-span-7 space-y-6">
            <SectionKicker
              index="01 — 07"
              label="Full-Spectrum Capabilities · Ethiopia"
              tone="light"
            />

            <h1 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#1A2130]">
              End-to-End Software Engineering, Cloud, and Digital Transformation Services in Ethiopia.
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-[#4A5365] sm:text-lg">
              Whether your organization needs to build a mission-critical ERP
              platform, launch a modern web or mobile product, migrate to the
              cloud, or automate complex workflows with AI, Byte Technology
              delivers structured, production-grade execution.
            </p>

            <InlineMetadata
              tone="light"
              items={[
                `Mission: “${BYTE_BRAND.mission}”`,
                '4 Strategic Pillars',
                '7 Integrated Services',
              ]}
            />

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button asChild variant="primary" size="lg">
                <Link to="/contact">
                  <span>Configure a Multi-Service Consultation</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={buildConsultationMailto()}>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span>{BYTE_BRAND.email}</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Right 5 Columns: Quick Jump Capability Index */}
          <div className="lg:col-span-5">
            <Card surface="pure" radius="lg" padding="default" className="relative">
              <GridCrosshair className="absolute top-3.5 right-3.5" tone="light" />
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#FA8112]">
                    CAPABILITY DIRECTORY
                  </span>
                  <Layers className="h-4 w-4 text-[#1A2130]" aria-hidden="true" />
                </div>
                <CardTitle className="mt-1">
                  Jump to a Specific Discipline
                </CardTitle>
                <CardDescription>
                  Select any of the 7 official Byte Technology capabilities below to
                  inspect deliverables and business impact:
                </CardDescription>
              </CardHeader>

              <CardContent className="mt-4 border-t border-[#DFDFD9] pt-4">
                <ul className="space-y-2">
                  {FULL_SERVICES_SPECIFICATIONS.slice()
                    .sort((a, b) => a.index.localeCompare(b.index))
                    .map((service) => (
                      <li key={service.id}>
                        <a
                          href={`#${service.id}`}
                          className="group flex items-center justify-between rounded-md border border-[#DFDFD9] bg-[#FAF9F6] px-3.5 py-2.5 text-xs font-medium text-[#1A2130] transition-colors hover:border-[#FA8112] hover:bg-[#FFFFFF]"
                        >
                          <span>
                            <span className="font-mono font-semibold text-[#FA8112] mr-2">
                              {service.index}.
                            </span>
                            {service.name}
                          </span>
                          <ArrowRight
                            className="h-3.5 w-3.5 text-[#687285] transition-transform group-hover:translate-x-1 group-hover:text-[#FA8112]"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 2.2: PILLAR I — DIGITAL PRODUCTS & USER EXPERIENCES (Ivory #FAF9F6)
          Covers: 01 Web Development, 02 Mobile Application Development, 06 UI/UX Design
      ====================================================================== */}
      <ArchitecturalSection tone="ivory" withBottomRule>
        <div className="space-y-12">
          <div className="max-w-3xl space-y-3">
            <SectionKicker
              index="Pillar I"
              label="Digital Products & User Experiences"
              tone="light"
            />
            <h2 className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[#1A2130]">
              Intuitive Interfaces &amp; High-Performance Digital Channels.
            </h2>
            <p className="text-base leading-relaxed text-[#4A5365]">
              We combine human-centered UI/UX design with modern web and mobile
              application engineering so your customers and teams experience zero
              friction across every device.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {digitalProductServices.map((service) => (
              <ServiceSpecificationCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 2.3: PILLAR II — ENTERPRISE SYSTEMS & CORE OPERATIONS (Dark #1A2130)
          Covers: 03 Custom Software and ERP Systems
      ====================================================================== */}
      <ArchitecturalSection
        id={erpService.id}
        tone="dark"
        withGridBg
        withBottomRule
        className="scroll-mt-20 py-20 md:py-28"
      >
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7 space-y-4">
              <SectionKicker
                index="Pillar II · Service 03"
                label="Enterprise Systems & Core Operations"
                tone="dark"
              />
              <h2 className="font-display text-[clamp(1.875rem,3.2vw,2.875rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[#F2F2EE]">
                {erpService.heading}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm leading-relaxed text-[#B0B8C8]">
                Centralize finance, inventory, procurement, human resources, and
                branch operations into a single bespoke software architecture.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-[#F2F2EE]/15 bg-[#232C3F] p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
              <div className="lg:col-span-6 space-y-6">
                <InlineMetadata
                  tone="dark"
                  items={[
                    `Service ${erpService.index}`,
                    erpService.name,
                    'Tailored for Ethiopian Enterprises',
                  ]}
                />

                <p className="text-base leading-relaxed text-[#F2F2EE]/90">
                  {erpService.overview}
                </p>

                <div className="rounded-md border border-[#FDA63A]/35 bg-[#111622] p-4">
                  <span className="font-mono text-xs font-semibold text-[#FDA63A]">
                    MEASURABLE BUSINESS IMPACT
                  </span>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#F2F2EE]">
                    {erpService.businessImpact}
                  </p>
                </div>

                {erpService.placeholderNote && (
                  <p className="rounded border border-[#F2F2EE]/12 bg-[#1A2130]/70 px-3.5 py-2.5 font-mono text-xs text-[#B0B8C8]">
                    {erpService.placeholderNote}
                  </p>
                )}

                <div className="pt-2">
                  <Button asChild variant="primary" size="lg">
                    <Link to={`/contact?service=${encodeURIComponent(erpService.id)}`}>
                      <span>Inquire About Custom Software &amp; ERP Systems</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                <ServiceSchematic type={erpService.schematicType} />

                <div className="rounded-md border border-[#F2F2EE]/12 bg-[#1A2130] p-6">
                  <h3 className="font-mono text-xs font-semibold text-[#FDA63A]">
                    WHAT WE DELIVER · SERVICE {erpService.index}
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-[#F2F2EE]">
                    {erpService.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#FA8112]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 2.4: PILLAR III — INTELLIGENCE & OPERATIONAL SPEED (Light #F2F2EE)
          Covers: 07 AI and Business Automation
      ====================================================================== */}
      <ArchitecturalSection
        id={aiService.id}
        tone="light"
        withBottomRule
        className="scroll-mt-20"
      >
        <div className="space-y-10">
          <div className="max-w-3xl space-y-3">
            <SectionKicker
              index="Pillar III · Service 07"
              label="Intelligence & Operational Speed"
              tone="light"
            />
            <h2 className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[#1A2130]">
              {aiService.heading}
            </h2>
          </div>

          <Card surface="pure" radius="lg" padding="lg" className="border-[#DFDFD9]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6 space-y-5">
                <InlineMetadata
                  tone="light"
                  items={[`Service ${aiService.index}`, aiService.name]}
                />
                <h3 className="font-display text-2xl font-bold text-[#1A2130]">
                  07. {aiService.name}
                </h3>
                <p className="text-base leading-relaxed text-[#4A5365]">
                  {aiService.overview}
                </p>

                <div className="rounded-md border border-[#FA8112]/40 bg-[#FAF9F6] p-4">
                  <span className="font-mono text-xs font-semibold text-[#FA8112]">
                    BUSINESS IMPACT
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-[#1A2130]">
                    {aiService.businessImpact}
                  </p>
                </div>

                <div className="pt-2">
                  <Button asChild variant="navy" size="default">
                    <Link to={`/contact?service=${encodeURIComponent(aiService.id)}`}>
                      <span>Inquire About AI &amp; Business Automation</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <ServiceSchematic type={aiService.schematicType} />

                <div className="rounded-md border border-[#DFDFD9] bg-[#FAF9F6] p-5">
                  <span className="font-mono text-xs font-semibold text-[#1A2130]">
                    KEY DELIVERABLES · AI &amp; AUTOMATION
                  </span>
                  <ul className="mt-3 space-y-2.5 text-sm text-[#1A2130]">
                    {aiService.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#FA8112]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 2.5: PILLAR IV — TECHNICAL STRATEGY & CLOUD INFRASTRUCTURE (Ivory #FAF9F6)
          Covers: 04 IT Consulting, 05 Cloud Solutions
      ====================================================================== */}
      <ArchitecturalSection tone="ivory" withBottomRule>
        <div className="space-y-12">
          <div className="max-w-3xl space-y-3">
            <SectionKicker
              index="Pillar IV"
              label="Technical Strategy & Cloud Infrastructure"
              tone="light"
            />
            <h2 className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[#1A2130]">
              Senior Architectural Advisory &amp; Resilient Cloud Foundations.
            </h2>
            <p className="text-base leading-relaxed text-[#4A5365]">
              Establish a secure, scalable technical roadmap and cloud
              infrastructure designed to support long-term institutional growth.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {strategyCloudServices.map((service) => (
              <ServiceSpecificationCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 2.6: CUSTOM CAPABILITY PAIRING CTA (Dark #1A2130)
      ====================================================================== */}
      <ArchitecturalSection
        tone="dark"
        withGridBg
        withBottomRule={false}
        className="py-16 md:py-24"
      >
        <div className="flex flex-col items-start justify-between gap-8 rounded-lg border border-[#F2F2EE]/15 bg-[#111622] p-8 sm:p-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl space-y-3">
            <SectionKicker
              index="08"
              label="Integrated Delivery"
              tone="dark"
            />
            <h2 className="font-display text-2xl font-bold text-[#F2F2EE] sm:text-3xl">
              Need Multiple Capabilities Working Together?
            </h2>
            <p className="text-sm leading-relaxed text-[#B0B8C8] sm:text-base">
              Most organizational transformations combine two or more disciplines—such
              as UI/UX Design with Web &amp; Mobile Development, or IT Consulting with
              Custom ERP and Cloud Solutions. Configure your exact scope in our
              consultation brief builder.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <Button asChild variant="primary" size="lg">
              <Link to="/contact">
                <span>Configure Your Project Brief</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </ArchitecturalSection>
    </div>
  );
}

function ServiceSpecificationCard({
  service,
}: {
  service: FullServiceSpecification;
}) {
  return (
    <Card
      id={service.id}
      surface="pure"
      interactive
      radius="lg"
      padding="default"
      className="scroll-mt-24 flex flex-col justify-between border-[#DFDFD9]"
    >
      <div className="space-y-5">
        <InlineMetadata
          tone="light"
          items={[`Service ${service.index}`, service.name]}
        />

        <ServiceSchematic type={service.schematicType} />

        <div className="space-y-2.5">
          <CardTitle className="text-xl text-[#1A2130]">
            {service.index}. {service.name}
          </CardTitle>
          <p className="font-display text-sm font-semibold text-[#1A2130]/90">
            {service.heading}
          </p>
          <CardDescription className="text-sm leading-relaxed text-[#4A5365]">
            {service.overview}
          </CardDescription>
        </div>

        <div className="border-t border-[#DFDFD9] pt-4">
          <span className="font-mono text-xs font-semibold text-[#1A2130]">
            What We Deliver:
          </span>
          <ul className="mt-2.5 space-y-2 text-xs text-[#4A5365]">
            {service.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FA8112]"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {service.placeholderNote && (
          <p className="rounded border border-[#DFDFD9] bg-[#FAF9F6] px-3 py-2 font-mono text-[11px] text-[#687285]">
            {service.placeholderNote}
          </p>
        )}
      </div>

      <CardFooter className="mt-6 flex flex-col items-start gap-4 border-t border-[#DFDFD9] pt-4">
        <div className="rounded bg-[#FAF9F6] p-3 w-full border border-[#DFDFD9]/70">
          <span className="font-mono text-[10px] font-semibold text-[#FA8112]">
            BUSINESS IMPACT
          </span>
          <p className="mt-1 text-xs leading-relaxed text-[#1A2130]">
            {service.businessImpact}
          </p>
        </div>

        <Link
          to={`/contact?service=${encodeURIComponent(service.id)}`}
          className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A2130] hover:text-[#FA8112]"
        >
          <span>Inquire About {service.name}</span>
          <ArrowRight
            className="h-3.5 w-3.5 text-[#FA8112] transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </CardFooter>
    </Card>
  );
}
