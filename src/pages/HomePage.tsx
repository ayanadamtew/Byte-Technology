import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Copy,
  Layers,
  Mail,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  HOMEPAGE_HERO,
  HERO_SYSTEM_LAYERS,
  TARGET_AUDIENCE_SEGMENTS,
  HOMEPAGE_SERVICES_BENTO,
  FEATURED_SOLUTION_BLUEPRINTS,
  WHY_BYTE_PILLARS,
  DEVELOPMENT_PROCESS_PHASES,
  type SystemLayerNode,
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
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/ui/card';
import { ServiceSchematic } from '../components/home/ServiceSchematic';

/**
 * BYTE TECHNOLOGY — COMPLETE HOMEPAGE
 * Implements:
 * 1. Premium Hero Section ("Build smarter. Work better. Move Ethiopia forward.") + Interactive 3-Layer System Blueprint
 * 2. Clear Company Introduction & Target Customer Profiles (Businesses & Organizations in Ethiopia)
 * 3. Services Overview (Asymmetric 12-Column Bento Matrix across all 7 Official Services with custom SVG schematics)
 * 4. Featured Work / Reference Enterprise Solution Blueprints (Interactive 4-Blueprint Architecture Explorer — zero fabricated data)
 * 5. Why Byte Technology (High-contrast Dark Section #1A2130 centering "Our mission is simple: To Digitalize Ethiopia.")
 * 6. Our Development Process (4-Phase Engineering & Delivery Lifecycle)
 * 7. Strong Contact & Consultation CTA (Dark Section with interactive capability brief selector + direct email copy/mailto)
 */
export function HomePage() {
  const [activeLayerId, setActiveLayerId] = React.useState<SystemLayerNode['id']>('core');
  const [activeBlueprintId, setActiveBlueprintId] = React.useState<FeaturedSolutionBlueprint['id']>('erp-blueprint');
  const [selectedCtaService, setSelectedCtaService] = React.useState<string>('Custom software and ERP systems');
  const [emailCopied, setEmailCopied] = React.useState(false);

  const activeLayer =
    HERO_SYSTEM_LAYERS.find((layer) => layer.id === activeLayerId) ??
    HERO_SYSTEM_LAYERS[1];

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
        className="pt-12 pb-20 md:pt-20 md:pb-28"
      >
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left 7 Columns: Strategic Headline, Official Mission & Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-7"
          >
            <SectionKicker
              index="01"
              label={HOMEPAGE_HERO.kicker}
              tone="light"
            />

            <h1 className="font-display text-[clamp(2.5rem,4.6vw,4rem)] font-bold leading-[1.06] tracking-[-0.03em] text-[#1A2130]">
              {HOMEPAGE_HERO.headline}
            </h1>

            <div className="rounded-md border border-[#DFDFD9] bg-[#FAF9F6] px-5 py-4">
              <p className="font-display text-base font-semibold text-[#1A2130] sm:text-lg">
                “{HOMEPAGE_HERO.mission}”
              </p>
              <p className="mt-1 text-xs text-[#687285]">
                Official Mandate · Serving Businesses and Organizations Across {BYTE_BRAND.location}
              </p>
            </div>

            <p className="max-w-2xl text-base leading-relaxed text-[#4A5365] sm:text-lg">
              {HOMEPAGE_HERO.lead}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
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

            <InlineMetadata
              tone="light"
              className="pt-2"
              items={[
                '7 Integrated Technology Disciplines',
                `Based in ${BYTE_BRAND.location}`,
                `Direct Inquiry: ${BYTE_BRAND.email}`,
              ]}
            />
          </motion.div>

          {/* Right 5 Columns: Interactive 3-Layer "Byte System Architecture" Schematic */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-lg border border-[#DFDFD9] bg-[#FAF9F6] p-6 sm:p-7 shadow-[0_12px_32px_-8px_rgba(26,33,48,0.08)]">
              <GridCrosshair className="absolute top-3.5 right-3.5" tone="light" />

              <div className="flex items-center justify-between border-b border-[#DFDFD9] pb-4">
                <div>
                  <span className="font-mono text-[11px] font-medium text-[#FA8112]">
                    INTERACTIVE SYSTEM ARCHITECTURE
                  </span>
                  <h2 className="mt-0.5 font-display text-lg font-bold text-[#1A2130]">
                    Full-Stack Digitalization Blueprint
                  </h2>
                </div>
                {/* Modular "B" Geometric Motif */}
                <svg
                  aria-hidden="true"
                  width="28"
                  height="28"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="shrink-0"
                >
                  <rect x="3" y="4" width="7" height="24" fill="#1A2130" />
                  <rect x="12" y="4" width="6" height="6" fill="#FA8112" />
                  <rect x="12" y="13" width="6" height="6" fill="#FA8112" />
                  <rect x="12" y="22" width="6" height="6" fill="#FA8112" />
                  <path d="M20 4C24.9706 4 29 8.02944 29 13H20V4Z" fill="#FDA63A" />
                  <path d="M20 28C24.9706 28 29 23.9706 29 19H20V28Z" fill="#FDA63A" />
                </svg>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-[#4A5365]">
                Select an architectural layer below to inspect how Byte Technology
                connects user interfaces, enterprise ERP operations, and cloud
                infrastructure:
              </p>

              {/* Interactive Layer Selector Buttons */}
              <div
                role="tablist"
                aria-label="Byte Technology System Architecture Layers"
                className="mt-4 space-y-2.5"
              >
                {HERO_SYSTEM_LAYERS.map((layer) => {
                  const isSelected = layer.id === activeLayer.id;
                  return (
                    <button
                      key={layer.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => setActiveLayerId(layer.id)}
                      className={cn(
                        'w-full rounded-md border p-3.5 text-left transition-all duration-[180ms] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA8112]',
                        isSelected
                          ? 'border-[#FA8112] bg-[#1A2130] text-[#F2F2EE]'
                          : 'border-[#DFDFD9] bg-[#FFFFFF] text-[#1A2130] hover:border-[#1A2130]/50'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span
                            className={cn(
                              'font-mono text-xs font-semibold',
                              isSelected ? 'text-[#FDA63A]' : 'text-[#FA8112]'
                            )}
                          >
                            {layer.index}.
                          </span>
                          <span className="font-display text-sm font-semibold">
                            {layer.layerName}
                          </span>
                        </div>
                        <span
                          className={cn(
                            'font-mono text-[11px]',
                            isSelected ? 'text-[#B0B8C8]' : 'text-[#687285]'
                          )}
                        >
                          {layer.services.length} Capabilities
                        </span>
                      </div>
                      <p
                        className={cn(
                          'mt-1 pl-6 text-xs',
                          isSelected ? 'text-[#B0B8C8]' : 'text-[#4A5365]'
                        )}
                      >
                        {layer.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Active Layer Details Panel */}
              <div
                role="tabpanel"
                aria-label={`${activeLayer.layerName} Details`}
                className="mt-4 rounded-md border border-[#DFDFD9] bg-[#FFFFFF] p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#1A2130]">
                    Active Layer {activeLayer.index} · {activeLayer.layerName}
                  </span>
                  <Layers className="h-4 w-4 text-[#FA8112]" aria-hidden="true" />
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-[#4A5365]">
                  {activeLayer.description}
                </p>
                <ul className="mt-3 space-y-2 border-t border-[#DFDFD9] pt-3">
                  {activeLayer.services.map((svc) => (
                    <li
                      key={svc.name}
                      className="flex items-baseline justify-between gap-2 text-xs"
                    >
                      <span className="font-medium text-[#1A2130]">
                        <span className="font-mono text-[#FA8112] mr-1.5">
                          {svc.index}.
                        </span>
                        {svc.name}
                      </span>
                      <span className="text-right text-[11px] text-[#687285]">
                        {svc.role}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 2: COMPANY INTRODUCTION & TARGET ORGANIZATIONS (Crisp Ivory #FAF9F6)
      ====================================================================== */}
      <ArchitecturalSection tone="ivory" withBottomRule>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left 5 Columns: Company Introduction Narrative */}
          <div className="lg:col-span-5 space-y-5">
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
                  className="h-4 w-4 text-[#FA8112] transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* Right 7 Columns: 4 Target Customer Archetypes Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {TARGET_AUDIENCE_SEGMENTS.map((segment) => (
              <Card
                key={segment.index}
                surface="pure"
                radius="lg"
                padding="sm"
                className="flex flex-col justify-between border-[#DFDFD9]"
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
                  <span className="block font-mono text-[11px] text-[#687285]">
                    Primary Capability Focus:
                  </span>
                  <InlineMetadata
                    tone="light"
                    className="mt-1 text-[#1A2130] font-medium"
                    items={segment.primaryCapabilities}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 3: SERVICES OVERVIEW — 7 CAPABILITIES BENTO MATRIX (Warm Alabaster #F2F2EE)
      ====================================================================== */}
      <ArchitecturalSection
        id="capabilities-overview"
        tone="light"
        withBottomRule
      >
        <div className="space-y-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
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
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#FA8112] hover:text-[#1A2130]"
              >
                <span>View Full Services Specification</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Asymmetric 12-Column Bento Matrix (Row 1: 4+4+4, Row 2: 8+4, Row 3: 6+6) */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {HOMEPAGE_SERVICES_BENTO.map((service) => {
              const colSpanClass =
                service.gridSpan === 'wide'
                  ? 'md:col-span-12 lg:col-span-8'
                  : service.gridSpan === 'half'
                    ? 'md:col-span-6 lg:col-span-6'
                    : 'md:col-span-6 lg:col-span-4';

              return (
                <Card
                  key={service.id}
                  surface="light"
                  interactive
                  radius="lg"
                  padding="default"
                  className={cn('flex flex-col justify-between', colSpanClass)}
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
                      <span className="font-mono text-[11px] font-medium text-[#687285]">
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
                              className="font-mono text-[#FA8112]"
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
                        className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A2130] hover:text-[#FA8112]"
                      >
                        <span>Inquire About {service.name}</span>
                        <ArrowRight
                          className="h-3.5 w-3.5 text-[#FA8112] transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 4: FEATURED WORK — ENTERPRISE SOLUTION BLUEPRINTS (Crisp Ivory #FAF9F6)
          Demonstrates concrete architectural solutions without fabricating client projects.
      ====================================================================== */}
      <ArchitecturalSection tone="ivory" withBottomRule>
        <div className="space-y-10">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
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
          </div>

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
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveBlueprintId(bp.id)}
                  className={cn(
                    'flex items-center justify-between rounded-md px-4 py-3 text-left text-xs font-semibold transition-all duration-[180ms] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA8112]',
                    isSelected
                      ? 'bg-[#FFFFFF] text-[#1A2130] shadow-[0_1px_3px_rgba(26,33,48,0.08)]'
                      : 'text-[#4A5365] hover:text-[#1A2130]'
                  )}
                >
                  <span>
                    <span className="font-mono text-[#FA8112] mr-1.5">
                      {bp.index}.
                    </span>
                    {bp.tabLabel}
                  </span>
                  {isSelected && (
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 bg-[#FA8112]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Solution Blueprint Detail Panel */}
          <motion.div
            key={activeBlueprint.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            role="tabpanel"
            aria-label={activeBlueprint.title}
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
                      <span className="font-mono text-[11px] font-semibold text-[#687285]">
                        LEGACY BOTTLENECK
                      </span>
                      <p className="mt-1 text-sm leading-relaxed text-[#4A5365]">
                        {activeBlueprint.legacyBottleneck}
                      </p>
                    </div>

                    <div className="rounded-md border border-[#FA8112]/40 bg-[#FAF9F6] p-4">
                      <span className="font-mono text-[11px] font-semibold text-[#FA8112]">
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
                    <span className="font-mono text-xs text-[#687285]">
                      Capabilities Combined in This Architecture:
                    </span>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-[#1A2130]">
                      {activeBlueprint.servicesCombined.map((svc, idx) => (
                        <React.Fragment key={svc.id}>
                          <span>
                            <span className="font-mono text-[#FA8112] mr-1">
                              {svc.index}.
                            </span>
                            {svc.name}
                          </span>
                          {idx < activeBlueprint.servicesCombined.length - 1 && (
                            <span aria-hidden="true" className="text-[#687285]">
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
                  <span className="font-mono text-xs text-[#FA8112]">
                    3-Tier Execution
                  </span>
                </div>

                <div className="my-6 space-y-4">
                  {activeBlueprint.systemNodes.map((node, index) => (
                    <div key={node.step} className="relative">
                      <div className="rounded-md border border-[#DFDFD9] bg-[#FFFFFF] p-4 sm:p-5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-mono text-xs font-semibold text-[#FA8112]">
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
                    </div>
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
        </div>
      </ArchitecturalSection>

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
          <div className="grid grid-cols-1 gap-10 border-b border-[#F2F2EE]/11 pb-14 lg:grid-cols-12 lg:items-end">
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
          </div>

          {/* 4 Architectural Pillars of Trust */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {WHY_BYTE_PILLARS.map((pillar) => (
              <Card
                key={pillar.index}
                surface="dark"
                interactive="darkInteractive"
                radius="lg"
                padding="default"
                className="flex flex-col justify-between"
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
            ))}
          </div>
        </div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 6: OUR DEVELOPMENT PROCESS (Warm Alabaster #F2F2EE)
      ====================================================================== */}
      <ArchitecturalSection tone="light" withBottomRule>
        <div className="space-y-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
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
                  className="h-4 w-4 text-[#FA8112] transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {DEVELOPMENT_PROCESS_PHASES.map((step) => (
              <Card
                key={step.phase}
                surface="pure"
                radius="lg"
                padding="default"
                className="flex flex-col justify-between border-[#DFDFD9]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#DFDFD9] pb-3">
                    <span className="font-mono text-sm font-bold text-[#FA8112]">
                      Phase {step.phase}
                    </span>
                    <span className="font-mono text-[11px] text-[#687285]">
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
                  <span className="font-mono text-[11px] font-medium text-[#687285]">
                    Phase Deliverables:
                  </span>
                  <ul className="mt-2 space-y-1.5 text-xs text-[#1A2130]">
                    {step.keyOutputs.map((output) => (
                      <li key={output} className="flex items-baseline gap-2">
                        <span
                          aria-hidden="true"
                          className="font-mono text-[#FA8112]"
                        >
                          ·
                        </span>
                        <span>{output}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
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
        <div className="rounded-lg border border-[#F2F2EE]/15 bg-[#111622] p-6 sm:p-10 lg:p-12">
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
                        <span className="font-mono text-[#FA8112] mr-2">
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
        </div>
      </ArchitecturalSection>
    </div>
  );
}
