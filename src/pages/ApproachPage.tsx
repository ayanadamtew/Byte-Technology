import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  FileCode2,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  FEATURED_SOLUTION_BLUEPRINTS,
  DEVELOPMENT_PROCESS_PHASES,
  type FeaturedSolutionBlueprint,
} from '../config/homepage';
import { ENGINEERING_STANDARDS } from '../config/pages';
import { BYTE_BRAND } from '../styles/tokens';
import { cn } from '../lib/utils';
import { ArchitecturalSection, GridCrosshair } from '../components/ui/architectural-grid';
import { SectionKicker, InlineMetadata } from '../components/ui/section-kicker';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

/**
 * BYTE TECHNOLOGY — SOLUTIONS & APPROACH PAGE (/approach)
 * Implements the approved section structure from docs/WEBSITE_STRUCTURE.md:
 * 3.1 Approach Hero: Modular Systems Architecture (Light #F2F2EE)
 * 3.2 Organizational Transformation Blueprints (Before vs. After Digitalization) (Ivory #FAF9F6)
 * 3.3 The 4-Phase Byte Delivery Lifecycle (Dark #1A2130)
 * 3.4 Engineering Quality, Security & Scalability Standards + Verified Case Study Placeholder (Light #F2F2EE)
 * 3.5 Project Discovery CTA (Dark #1A2130)
 */
export function ApproachPage() {
  const [selectedBlueprintId, setSelectedBlueprintId] =
    React.useState<FeaturedSolutionBlueprint['id']>('erp-blueprint');

  const activeBlueprint =
    FEATURED_SOLUTION_BLUEPRINTS.find((bp) => bp.id === selectedBlueprintId) ??
    FEATURED_SOLUTION_BLUEPRINTS[0];

  return (
    <div>
      {/* =====================================================================
          SECTION 3.1: APPROACH HERO — MODULAR SYSTEMS ARCHITECTURE (Light #F2F2EE)
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
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center"
        >
          <div className="lg:col-span-7 space-y-6">
            <SectionKicker
              index="01"
              label="Delivery Governance & System Architecture"
              tone="light"
            />

            <h1 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#1A2130]">
              How Byte Technology Architects, Builds, and Scales Enterprise Systems.
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-[#4A5365] sm:text-lg">
              Strong software requires disciplined execution. We bridge strategic
              IT consulting, human-centered UI/UX design, custom ERP engineering,
              cloud infrastructure, and AI automation through a transparent,
              four-phase engineering lifecycle.
            </p>

            <InlineMetadata
              tone="light"
              items={[
                `Mission: “${BYTE_BRAND.mission}”`,
                '4-Phase Delivery Lifecycle',
                'Security-First Engineering',
              ]}
            />

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button asChild variant="primary" size="lg">
                <Link to="/contact">
                  <span>Request a Technical Discovery Session</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">
                  <span>Explore All 7 Capabilities</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Right 5 Columns: Architectural Governance Summary Card */}
          <div className="lg:col-span-5">
            <Card surface="pure" radius="lg" padding="default" className="relative">
              <GridCrosshair className="absolute top-3.5 right-3.5" tone="light" />
              <div className="space-y-4">
                <span className="font-mono text-xs font-semibold text-[#FA8112]">
                  ARCHITECTURAL PRINCIPLES
                </span>
                <h2 className="font-display text-xl font-bold text-[#1A2130]">
                  Why Systems Thinking Matters
                </h2>
                <p className="text-sm leading-relaxed text-[#4A5365]">
                  Instead of treating web apps, mobile apps, ERP databases, and
                  cloud servers as isolated projects, we engineer them as
                  interconnected modules of a single organizational architecture.
                </p>

                <div className="space-y-2.5 border-t border-[#DFDFD9] pt-4 text-xs text-[#1A2130]">
                  <div className="flex items-center justify-between rounded bg-[#FAF9F6] px-3.5 py-2.5 border border-[#DFDFD9]">
                    <span className="font-mono text-[#FA8112]">01 · Alignment</span>
                    <span className="font-medium">Workflow-First Discovery</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-[#FAF9F6] px-3.5 py-2.5 border border-[#DFDFD9]">
                    <span className="font-mono text-[#FA8112]">02 · Blueprint</span>
                    <span className="font-medium">Validated UI/UX &amp; Data Schemas</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-[#FAF9F6] px-3.5 py-2.5 border border-[#DFDFD9]">
                    <span className="font-mono text-[#FA8112]">03 · Execution</span>
                    <span className="font-medium">Modular Iterative Engineering</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-[#FAF9F6] px-3.5 py-2.5 border border-[#DFDFD9]">
                    <span className="font-mono text-[#FA8112]">04 · Resilience</span>
                    <span className="font-medium">Hardened Cloud &amp; Team Onboarding</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 3.2: ORGANIZATIONAL TRANSFORMATION BLUEPRINTS (Ivory #FAF9F6)
      ====================================================================== */}
      <ArchitecturalSection tone="ivory" withBottomRule>
        <div className="space-y-10">
          <div className="max-w-3xl space-y-3">
            <SectionKicker
              index="02"
              label="Applied Systems Architecture"
              tone="light"
            />
            <h2 className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[#1A2130]">
              Organizational Transformation Blueprints: From Manual Friction to Digital Flow.
            </h2>
            <p className="text-base leading-relaxed text-[#4A5365]">
              Inspect how Byte Technology transitions businesses and organizations
              in {BYTE_BRAND.location} from fragmented legacy bottlenecks to unified
              digital systems.
            </p>
          </div>

          {/* Interactive Scenario Selector */}
          <div
            role="tablist"
            aria-label="Organizational Transformation Blueprints"
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
                  onClick={() => setSelectedBlueprintId(bp.id)}
                  className={cn(
                    'flex items-center justify-between rounded-md px-4 py-3 text-left text-xs font-semibold transition-all duration-[180ms] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA8112]',
                    isSelected
                      ? 'bg-[#FFFFFF] text-[#1A2130] shadow-xs'
                      : 'text-[#4A5365] hover:text-[#1A2130]'
                  )}
                >
                  <span>
                    <span className="font-mono text-[#FA8112] mr-1.5">
                      {bp.index}.
                    </span>
                    {bp.tabLabel}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            aria-label={activeBlueprint.title}
            className="rounded-lg border border-[#DFDFD9] bg-[#FFFFFF] p-6 sm:p-8 lg:p-10"
          >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5 space-y-5">
                <InlineMetadata
                  tone="light"
                  items={[
                    `Blueprint ${activeBlueprint.index}`,
                    activeBlueprint.targetOrganization,
                  ]}
                />
                <h3 className="font-display text-2xl font-bold text-[#1A2130]">
                  {activeBlueprint.title}
                </h3>

                <div className="rounded-md border border-[#DFDFD9] bg-[#FAF9F6] p-4">
                  <span className="font-mono text-[11px] font-semibold text-[#687285]">
                    BEFORE · LEGACY BOTTLENECK
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-[#4A5365]">
                    {activeBlueprint.legacyBottleneck}
                  </p>
                </div>

                <div className="rounded-md border border-[#FA8112]/40 bg-[#FAF9F6] p-4">
                  <span className="font-mono text-[11px] font-semibold text-[#FA8112]">
                    AFTER · BYTE TECHNOLOGY ARCHITECTURE
                  </span>
                  <p className="mt-1 text-sm leading-relaxed text-[#1A2130]">
                    {activeBlueprint.byteArchitecture}
                  </p>
                </div>

                <Button asChild variant="navy" size="default">
                  <Link
                    to={`/contact?service=${encodeURIComponent(
                      activeBlueprint.servicesCombined[0].id
                    )}`}
                  >
                    <span>Plan This Architecture with Our Team</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-between rounded-lg border border-[#DFDFD9] bg-[#F2F2EE] p-6">
                <div className="space-y-4">
                  <span className="font-mono text-xs font-semibold text-[#1A2130]">
                    3-TIER ARCHITECTURAL EXECUTION
                  </span>
                  {activeBlueprint.systemNodes.map((node, idx) => (
                    <div
                      key={node.step}
                      className="rounded-md border border-[#DFDFD9] bg-[#FFFFFF] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-[#FA8112]">
                          0{idx + 1} · {node.step}
                        </span>
                        <span className="font-display text-sm font-bold text-[#1A2130]">
                          {node.label}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#4A5365]">
                        {node.detail}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-md bg-[#1A2130] p-4 text-[#F2F2EE]">
                  <span className="font-mono text-[11px] font-semibold text-[#FDA63A]">
                    OPERATIONAL OUTCOME
                  </span>
                  <p className="mt-1 text-sm text-[#F2F2EE]">
                    {activeBlueprint.operationalOutcome}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 3.3: THE FOUR-PHASE BYTE DELIVERY LIFECYCLE (Dark #1A2130)
      ====================================================================== */}
      <ArchitecturalSection
        tone="dark"
        withGridBg
        withBottomRule
        className="py-20 md:py-28"
      >
        <div className="space-y-12">
          <div className="max-w-3xl space-y-3">
            <SectionKicker
              index="03"
              label="Lifecycle Governance"
              tone="dark"
            />
            <h2 className="font-display text-[clamp(1.875rem,3vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[#F2F2EE]">
              The Four-Phase Byte Delivery Lifecycle.
            </h2>
            <p className="text-base leading-relaxed text-[#B0B8C8]">
              Every project is structured into four transparent phases with clear
              deliverables, architectural reviews, and executive checkpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {DEVELOPMENT_PROCESS_PHASES.map((phase) => (
              <Card
                key={phase.phase}
                surface="dark"
                radius="lg"
                padding="default"
                className="flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#F2F2EE]/11 pb-3">
                    <span className="font-mono text-sm font-bold text-[#FDA63A]">
                      Phase {phase.phase}
                    </span>
                    <span className="font-mono text-xs text-[#B0B8C8]">
                      {phase.subtitle}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#F2F2EE]">
                    {phase.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#B0B8C8]">
                    {phase.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#F2F2EE]/11 pt-4">
                  <span className="font-mono text-xs font-semibold text-[#FDA63A]">
                    Key Phase Deliverables:
                  </span>
                  <ul className="mt-2.5 space-y-2 text-xs text-[#F2F2EE]">
                    {phase.keyOutputs.map((out) => (
                      <li key={out} className="flex items-start gap-2">
                        <CheckCircle2
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FA8112]"
                          aria-hidden="true"
                        />
                        <span>{out}</span>
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
          SECTION 3.4: ENGINEERING STANDARDS & PLACEHOLDER GOVERNANCE (Light #F2F2EE)
      ====================================================================== */}
      <ArchitecturalSection tone="light" withBottomRule>
        <div className="space-y-12">
          <div className="max-w-3xl space-y-3">
            <SectionKicker
              index="04"
              label="Engineering Quality & Security"
              tone="light"
            />
            <h2 className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[#1A2130]">
              Built on Non-Negotiable Engineering Standards.
            </h2>
            <p className="text-base leading-relaxed text-[#4A5365]">
              Correctness, security, maintainability, and requirement compliance
              govern every system we architect.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {ENGINEERING_STANDARDS.map((std) => (
              <Card
                key={std.index}
                surface="pure"
                radius="lg"
                padding="default"
                className="flex flex-col justify-between border-[#DFDFD9]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <InlineMetadata
                      tone="light"
                      items={[`Standard ${std.index}`, std.focus]}
                    />
                    <ShieldCheck
                      className="h-4 w-4 text-[#FA8112]"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#1A2130]">
                    {std.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#4A5365]">
                    {std.description}
                  </p>
                </div>

                <ul className="mt-6 space-y-2 border-t border-[#DFDFD9] pt-4 text-xs text-[#1A2130]">
                  {std.practices.map((practice) => (
                    <li key={practice} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="font-mono font-bold text-[#FA8112]"
                      >
                        —
                      </span>
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* Explicit Verified Case Study & Internal Demo Placeholder Block */}
          <div className="rounded-lg border border-dashed border-[#1A2130]/30 bg-[#FAF9F6] p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#FA8112]">
                  <FileCode2 className="h-4 w-4" aria-hidden="true" />
                  <span>PORTFOLIO &amp; CASE STUDY REPOSITORY</span>
                </div>
                <p className="font-mono text-xs text-[#1A2130]">
                  [CONTENT PLACEHOLDER: Verified Case Studies / Client Portfolio / Internal Product Demos — Reserved exclusively for real, client-approved project deployments and verified outcomes.]
                </p>
              </div>
              <Button asChild variant="outline" size="sm" className="shrink-0">
                <Link to="/contact">Request Live Technical Walkthrough</Link>
              </Button>
            </div>
          </div>
        </div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 3.5: PROJECT DISCOVERY CTA (Dark #1A2130)
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
              index="05"
              label="Start Phase 01 · Discovery"
              tone="dark"
            />
            <h2 className="font-display text-2xl font-bold text-[#F2F2EE] sm:text-3xl">
              Ready to Map Your Organization’s Target Architecture?
            </h2>
            <p className="text-sm leading-relaxed text-[#B0B8C8] sm:text-base">
              Initiate a technical discovery conversation with Byte Technology in{' '}
              {BYTE_BRAND.location} to review your workflows and scope your next
              system.
            </p>
          </div>
          <Button asChild variant="primary" size="lg" className="shrink-0">
            <Link to="/contact">
              <span>Start a Project Conversation</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </ArchitecturalSection>
    </div>
  );
}
