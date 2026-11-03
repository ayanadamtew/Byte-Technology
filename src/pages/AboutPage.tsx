import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Mail, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { ABOUT_BRAND_PRINCIPLES } from '../config/pages';
import { buildConsultationMailto } from '../config/navigation';
import { BYTE_BRAND, BYTE_OFFICIAL_SERVICES } from '../styles/tokens';
import { ArchitecturalSection, GridCrosshair } from '../components/ui/architectural-grid';
import { SectionKicker, InlineMetadata } from '../components/ui/section-kicker';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import {
  HeroHeadlineReveal,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from '../components/ui/motion-primitives';
import { BrandLogo } from '../components/layout/BrandLogo';

/**
 * BYTE TECHNOLOGY — ABOUT PAGE (/about)
 * Implements the approved section structure and copy from docs/WEBSITE_STRUCTURE.md
 * and docs/WEBSITE_CONTENT.md:
 * 4.1 About Hero & Official Mission Statement (Light #F2F2EE)
 * 4.2 Why Digitalizing Ethiopia Matters Now (Dark #1A2130)
 * 4.3 Core Brand Principles (Modern, Professional, Innovative, Trustworthy, Ambitious) (Ivory #FAF9F6)
 * 4.4 Verified Company Profile & Explicit Placeholders for Unverified History/Leadership (Light #F2F2EE)
 * 4.5 Partner With Byte Technology CTA (Dark #1A2130)
 */
export function AboutPage() {
  return (
    <div>
      {/* =====================================================================
          SECTION 4.1: ABOUT HERO & OFFICIAL MISSION STATEMENT (Light #F2F2EE)
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
          {/* Left 7 Columns */}
          <div className="lg:col-span-7 space-y-6">
            <SectionKicker
              index="01"
              label={`About ${BYTE_BRAND.name} · ${BYTE_BRAND.location}`}
              tone="light"
            />

            <HeroHeadlineReveal
              text="Advancing Ethiopia’s Digital Transformation Through Engineering Excellence."
              className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#1A2130]"
            />

            <blockquote className="rounded-md border border-[#DFDFD9] bg-[#FAF9F6] p-6">
              <p className="font-display text-xl font-bold text-[#1A2130] sm:text-2xl">
                “{BYTE_BRAND.mission}”
              </p>
              <footer className="mt-2 font-mono text-xs text-[#525B6C]">
                Official Company Mission · {BYTE_BRAND.name} ({BYTE_BRAND.location})
              </footer>
            </blockquote>

            <p className="max-w-2xl text-base leading-relaxed text-[#4A5365] sm:text-lg">
              Byte Technology is an {BYTE_BRAND.location}-based technology company
              built to serve businesses and organizations with modern software
              engineering, enterprise systems, cloud infrastructure, strategic
              consulting, and intelligent automation. We exist to bridge the gap
              between ambitious organizational goals and the technical systems
              required to achieve them.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button asChild variant="primary" size="lg">
                <Link to="/contact">
                  <span>Partner With Byte Technology</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">
                  <span>Explore Our 7 Services</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Right 5 Columns: Official Brand Identity & Fact Sheet Card */}
          <div className="lg:col-span-5">
            <Card surface="pure" radius="lg" padding="default" className="relative">
              <GridCrosshair className="absolute top-3.5 right-3.5" tone="light" />
              <div className="space-y-6">
                <BrandLogo tone="light" showLocation />

                <div className="space-y-3 border-t border-[#DFDFD9] pt-4 text-sm">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs text-[#525B6C]">
                      COMPANY NAME
                    </span>
                    <span className="font-semibold text-[#1A2130]">
                      {BYTE_BRAND.name}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs text-[#525B6C]">
                      HEADQUARTERS
                    </span>
                    <span className="font-semibold text-[#1A2130]">
                      {BYTE_BRAND.location}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs text-[#525B6C]">
                      PRIMARY FOCUS
                    </span>
                    <span className="font-semibold text-[#1A2130]">
                      Businesses &amp; Organizations
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs text-[#525B6C]">
                      CORE DISCIPLINES
                    </span>
                    <span className="font-semibold text-[#9A3412]">
                      7 Integrated Services
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xs text-[#525B6C]">
                      DIRECT EMAIL
                    </span>
                    <a
                      href={buildConsultationMailto()}
                      className="font-mono text-xs font-semibold text-[#1A2130] underline-offset-4 hover:text-[#B45309] hover:underline"
                    >
                      {BYTE_BRAND.email}
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 4.2: WHY DIGITALIZING ETHIOPIA MATTERS NOW (Dark #1A2130)
      ====================================================================== */}
      <ArchitecturalSection
        tone="dark"
        withGridBg
        withBottomRule
        className="py-20 md:py-28"
      >
        <ScrollReveal className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 space-y-5">
            <SectionKicker
              index="02"
              label="The Ethiopian Digital Imperative"
              tone="dark"
            />
            <h2 className="font-display text-[clamp(1.875rem,3.2vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.025em] text-[#F2F2EE]">
              Why Ethiopian Businesses and Organizations Need Unified Technology Partners.
            </h2>
          </div>

          <div className="lg:col-span-6 space-y-5 text-base leading-relaxed text-[#B0B8C8]">
            <p>
              Every sector of the Ethiopian economy relies on organizations that can
              coordinate people, resources, data, and customer relationships
              effectively. Yet too many businesses are held back by fragmented
              manual processes or rigid software that was never designed for their
              reality.
            </p>
            <p className="text-[#F2F2EE]">
              Digitalizing Ethiopia means equipping organizations—from growing
              enterprises to established institutions—with reliable, thoughtfully
              designed technology. When an organization replaces manual friction
              with a unified ERP system, a modern web or mobile platform, resilient
              cloud infrastructure, or automated workflows, its capacity to grow and
              serve its community multiplies.
            </p>
          </div>
        </ScrollReveal>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 4.3: OUR FIVE DEFINING PRINCIPLES (Ivory #FAF9F6)
      ====================================================================== */}
      <ArchitecturalSection tone="ivory" withBottomRule>
        <div className="space-y-12">
          <ScrollReveal className="max-w-3xl space-y-3">
            <SectionKicker
              index="03"
              label="Brand & Engineering DNA"
              tone="light"
            />
            <h2 className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[#1A2130]">
              The Five Principles Behind Every System We Build.
            </h2>
            <p className="text-base leading-relaxed text-[#4A5365]">
              Our work is guided by five core commitments that define how we
              architect software and collaborate with organizational leaders.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ABOUT_BRAND_PRINCIPLES.map((item) => (
              <StaggerItem key={item.index} className="h-full">
                <Card
                  surface="pure"
                  interactive
                  radius="lg"
                  padding="default"
                  className="flex h-full flex-col justify-between border-[#DFDFD9]"
                >
                  <div className="space-y-3">
                    <InlineMetadata
                      tone="light"
                      items={[item.index, item.tagline]}
                    />
                    <h3 className="font-display text-xl font-bold text-[#1A2130]">
                      {item.principle}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#4A5365]">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </StaggerItem>
            ))}

            {/* 6th Card in the 3x2 grid: Full-Spectrum Discipline Summary */}
            <StaggerItem className="h-full">
              <Card
                surface="light"
                interactive
                radius="lg"
                padding="default"
                className="flex h-full flex-col justify-between border-[#FA8112]/40"
              >
                <div className="space-y-3">
                  <InlineMetadata
                    tone="light"
                    items={['06', 'Unified Execution']}
                  />
                  <h3 className="font-display text-xl font-bold text-[#1A2130]">
                    One Accountable Partner
                  </h3>
                  <p className="text-sm leading-relaxed text-[#4A5365]">
                    All 7 core capabilities—Web, Mobile, Custom Software/ERP, IT
                    Consulting, Cloud, UI/UX, and AI Automation—delivered with
                    unified architectural ownership.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#DFDFD9]">
                  <Link
                    to="/services"
                    className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[#B45309] hover:text-[#1A2130]"
                  >
                    <span>View All 7 Services</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-[180ms] group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 4.4: COMPANY PROFILE & STRUCTURED PLACEHOLDERS (Light #F2F2EE)
      ====================================================================== */}
      <ArchitecturalSection tone="light" withBottomRule>
        <ScrollReveal className="space-y-10">
          <div className="max-w-3xl space-y-3">
            <SectionKicker
              index="04"
              label="Institutional Profile & Governance"
              tone="light"
            />
            <h2 className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[#1A2130]">
              Verified Company Profile &amp; Documentation.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Verified Capabilities List */}
            <Card
              surface="pure"
              radius="lg"
              padding="default"
              className="lg:col-span-6 space-y-4 border-[#DFDFD9]"
            >
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#1A2130]">
                <Building2 className="h-4 w-4 text-[#B45309]" aria-hidden="true" />
                <span>OFFICIAL SERVICE PORTFOLIO</span>
              </div>
              <p className="text-sm text-[#4A5365]">
                Byte Technology operates across seven verified technology
                disciplines for businesses and organizations in {BYTE_BRAND.location}:
              </p>
              <ul className="space-y-2 border-t border-[#DFDFD9] pt-4 text-sm text-[#1A2130]">
                {BYTE_OFFICIAL_SERVICES.map((svc) => (
                  <li key={svc.id} className="flex items-center justify-between">
                    <span>
                      <span className="font-mono text-xs font-semibold text-[#B45309] mr-2">
                        {svc.index}.
                      </span>
                      <span className="font-medium">{svc.name}</span>
                    </span>
                    <span className="text-xs text-[#525B6C]">{svc.pillar}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Explicit Placeholders for Unverified Historical / Leadership Details */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-lg border border-dashed border-[#1A2130]/30 bg-[#FAF9F6] p-5">
                <span className="font-mono text-xs font-semibold text-[#B45309]">
                  FOUNDING STORY &amp; MILESTONES
                </span>
                <p className="mt-2 font-mono text-xs leading-relaxed text-[#4A5365]">
                  [CONTENT PLACEHOLDER: Founding Story &amp; Company History — To be inserted only when official historical milestones and registration details are provided.]
                </p>
              </div>

              <div className="rounded-lg border border-dashed border-[#1A2130]/30 bg-[#FAF9F6] p-5">
                <span className="font-mono text-xs font-semibold text-[#B45309]">
                  EXECUTIVE LEADERSHIP &amp; TEAM
                </span>
                <p className="mt-2 font-mono text-xs leading-relaxed text-[#4A5365]">
                  [CONTENT PLACEHOLDER: Leadership &amp; Executive Team Profiles — To be inserted only when verified names, titles, and biographies are provided.]
                </p>
              </div>

              <div className="rounded-lg border border-dashed border-[#1A2130]/30 bg-[#FAF9F6] p-5">
                <span className="font-mono text-xs font-semibold text-[#B45309]">
                  VERIFIED CLIENT PORTFOLIO &amp; TESTIMONIALS
                </span>
                <p className="mt-2 font-mono text-xs leading-relaxed text-[#4A5365]">
                  [CONTENT PLACEHOLDER: Verified Client Portfolio, Case Studies &amp; Testimonials — Reserved for real, client-approved project engagements.]
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ArchitecturalSection>

      {/* =====================================================================
          SECTION 4.5: PARTNER WITH BYTE TECHNOLOGY CTA (Dark #1A2130)
      ====================================================================== */}
      <ArchitecturalSection
        tone="dark"
        withGridBg
        withBottomRule={false}
        className="py-16 md:py-24"
      >
        <ScrollReveal className="flex flex-col items-start justify-between gap-8 rounded-lg border border-[#F2F2EE]/15 bg-[#111622] p-8 sm:p-10 lg:flex-row lg:items-center">
          <div className="max-w-2xl space-y-3">
            <SectionKicker
              index="05"
              label="Direct Executive Inquiry"
              tone="dark"
            />
            <h2 className="font-display text-2xl font-bold text-[#F2F2EE] sm:text-3xl">
              Let’s Build the Technology That Moves Your Organization Forward.
            </h2>
            <div className="flex flex-wrap items-center gap-6 pt-1 text-xs text-[#B0B8C8]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#FA8112]" aria-hidden="true" />
                {BYTE_BRAND.location}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[#F2F2EE]">
                <Mail className="h-3.5 w-3.5 text-[#FA8112]" aria-hidden="true" />
                {BYTE_BRAND.email}
              </span>
            </div>
          </div>

          <Button asChild variant="primary" size="lg" className="shrink-0">
            <Link to="/contact">
              <span>Start a Project Conversation</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </ScrollReveal>
      </ArchitecturalSection>
    </div>
  );
}
