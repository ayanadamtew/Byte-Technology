import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import {
  BYTE_NAVIGATION_ITEMS,
  type ByteNavItem,
  buildConsultationMailto,
} from '../../config/navigation';
import { BYTE_BRAND, BYTE_OFFICIAL_SERVICES } from '../../styles/tokens';
import { ArchitecturalSection, GridCrosshair } from '../ui/architectural-grid';
import { SectionKicker, InlineMetadata } from '../ui/section-kicker';
import { Button } from '../ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';

export interface RouteArchitectureShellProps {
  route: ByteNavItem;
}

/**
 * Reusable Route Architecture Shell.
 * Initializes the approved route structure, design tokens, responsive 12-column grid,
 * and verified Byte Technology brand foundations before full page-by-page implementation.
 */
export function RouteArchitectureShell({ route }: RouteArchitectureShellProps) {
  return (
    <>
      {/* Light Section 1: Architectural Hero & Route Foundation */}
      <ArchitecturalSection tone="light" withGridBg withBottomRule>
        <motion.div
          key={route.path}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start"
        >
          {/* Left 7 Columns: Verified Brand Messaging & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <SectionKicker index={route.index} label={route.kicker} tone="light" />

            <h1 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[#1A2130]">
              {route.headline}
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-[#4A5365]">
              {route.lead}
            </p>

            <InlineMetadata
              tone="light"
              items={[
                `Mission: “${BYTE_BRAND.mission}”`,
                `Location: ${BYTE_BRAND.location}`,
                'For Businesses & Organizations',
              ]}
            />

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button asChild variant="primary" size="lg">
                <Link to="/contact">
                  <span>Start a Project Conversation</span>
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

          {/* Right 5 Columns: Modular System Blueprint Card */}
          <div className="lg:col-span-5">
            <Card
              surface="pure"
              radius="lg"
              padding="default"
              className="relative border-[#DFDFD9]"
            >
              <GridCrosshair className="absolute top-3 right-3" tone="light" />
              <CardHeader>
                <SectionKicker label="System Foundation" tone="light" />
                <CardTitle className="mt-2">
                  Modular Systems Architecture
                </CardTitle>
                <CardDescription>
                  Unified routing, design tokens, and responsive layout foundation
                  active for <span className="font-mono text-[#1A2130]">{route.path}</span>.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-3 border-t border-[#DFDFD9] mt-4 pt-4">
                <p className="text-xs font-medium text-[#687285]">
                  Switch Active Route View
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {BYTE_NAVIGATION_ITEMS.map((nav) => {
                    const isCurrent = nav.path === route.path;
                    return (
                      <Link
                        key={nav.path}
                        to={nav.path}
                        className={`flex items-center justify-between rounded-md border px-3 py-2 text-xs font-medium transition-colors ${
                          isCurrent
                            ? 'border-[#FA8112] bg-[#FAF9F6] text-[#1A2130] font-semibold'
                            : 'border-[#DFDFD9] bg-[#FFFFFF] text-[#4A5365] hover:border-[#1A2130] hover:text-[#1A2130]'
                        }`}
                      >
                        <span>
                          <span className="font-mono text-[#FA8112] mr-1.5">
                            {nav.index}.
                          </span>
                          {nav.label}
                        </span>
                        <ArrowRight className="h-3 w-3 opacity-60" aria-hidden="true" />
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </ArchitecturalSection>

      {/* Light Ivory Section 2: The 7 Official Byte Technology Services Foundation */}
      <ArchitecturalSection tone="ivory" withBottomRule>
        <div className="space-y-10">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="space-y-3">
              <SectionKicker index="01" label="Core Capabilities" tone="light" />
              <h2 className="font-display text-[clamp(1.75rem,2.8vw,2.5rem)] font-bold leading-[1.14] tracking-[-0.025em] text-[#1A2130]">
                Seven Integrated Capabilities Under One Roof.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#4A5365]">
              Every capability is structured around how Ethiopian businesses and
              organizations modernize operations, infrastructure, and customer
              experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BYTE_OFFICIAL_SERVICES.map((service) => (
              <Card
                key={service.id}
                id={service.id}
                surface="light"
                interactive
                radius="lg"
                padding="default"
                className="flex flex-col justify-between"
              >
                <CardHeader>
                  <InlineMetadata
                    tone="light"
                    items={[`${service.index}`, service.pillar]}
                  />
                  <CardTitle className="pt-2">{service.name}</CardTitle>
                </CardHeader>
                <CardFooter className="border-t border-[#DFDFD9]/80 mt-6 pt-4">
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
            ))}
          </div>
        </div>
      </ArchitecturalSection>
    </>
  );
}

/**
 * 404 Not Found Route View with architectural recovery navigation.
 */
export function NotFoundView() {
  const location = useLocation();

  return (
    <ArchitecturalSection tone="light" withGridBg withBottomRule>
      <div className="mx-auto max-w-2xl py-12 text-center space-y-6">
        <SectionKicker index="404" label="Route Not Found" tone="light" />
        <h1 className="font-display text-3xl font-bold tracking-tight text-[#1A2130] sm:text-4xl">
          The requested path could not be found.
        </h1>
        <p className="text-base leading-relaxed text-[#4A5365]">
          No page is registered at{' '}
          <code className="rounded bg-[#E7E6E0] px-2 py-0.5 font-mono text-sm text-[#1A2130]">
            {location.pathname}
          </code>
          . Use the navigation below to return to Byte Technology’s core sections.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button asChild variant="primary" size="default">
            <Link to="/">Return to Homepage</Link>
          </Button>
          <Button asChild variant="outline" size="default">
            <Link to="/contact">Contact Byte Technology</Link>
          </Button>
        </div>
      </div>
    </ArchitecturalSection>
  );
}
