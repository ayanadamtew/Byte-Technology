import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { BYTE_NAVIGATION_ITEMS } from '../../config/navigation';
import { BYTE_BRAND, BYTE_OFFICIAL_SERVICES } from '../../styles/tokens';
import { BrandLogo } from './BrandLogo';

/**
 * Global Architectural Footer (Dark Section — Byte Navy Obsidian #1A2130).
 * Presents verified company information, all 7 official services, navigation links,
 * and direct contact access without any fabricated metrics or ornamental engines.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dark-section border-t border-[#F2F2EE]/11 bg-[#1A2130] text-[#F2F2EE]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Column 1: Brand Identity & Official Mission (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Link
                to="/"
                aria-label={`${BYTE_BRAND.name} Home`}
                className="inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA8112]"
              >
                <BrandLogo tone="dark" showLocation />
              </Link>
              <p className="font-display text-lg font-semibold text-[#F2F2EE]">
                “{BYTE_BRAND.mission}”
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-[#B0B8C8]">
                Partnering with businesses and organizations in {BYTE_BRAND.location} to
                engineer reliable web, mobile, custom ERP, cloud, UI/UX, and AI
                automation systems.
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs text-[#B0B8C8]">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#FA8112]" aria-hidden="true" />
                <span>Location: {BYTE_BRAND.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-[#FA8112]" aria-hidden="true" />
                <a
                  href={`mailto:${BYTE_BRAND.email}`}
                  className="font-mono text-[#F2F2EE] underline-offset-4 hover:text-[#FDA63A] hover:underline"
                >
                  {BYTE_BRAND.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: All 7 Official Services (5 cols) */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-sm font-semibold tracking-tight text-[#F2F2EE]">
              Core Capabilities
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {BYTE_OFFICIAL_SERVICES.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services#${service.id}`}
                    className="group inline-flex items-baseline gap-2 text-sm text-[#B0B8C8] transition-colors hover:text-[#F2F2EE]"
                  >
                    <span className="font-mono text-xs text-[#FA8112]">
                      {service.index}.
                    </span>
                    <span className="group-hover:underline underline-offset-4">
                      {service.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Platform Architecture & Direct Consultation (3 cols) */}
          <div className="lg:col-span-3 flex flex-col justify-between space-y-8">
            <div>
              <h2 className="font-display text-sm font-semibold tracking-tight text-[#F2F2EE]">
                Navigation
              </h2>
              <ul className="mt-4 space-y-2.5">
                {BYTE_NAVIGATION_ITEMS.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="inline-flex items-center gap-2 text-sm text-[#B0B8C8] transition-colors hover:text-[#F2F2EE]"
                    >
                      <span className="font-mono text-xs text-[#8490A5]">
                        {item.index}.
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#F2F2EE]/11 pt-6">
              <p className="text-xs text-[#B0B8C8]">
                Ready to discuss an upcoming initiative?
              </p>
              <Link
                to="/contact"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#FA8112] hover:text-[#FDA63A]"
              >
                <span>Start a Project Conversation</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Truthfulness Bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-[#F2F2EE]/11 pt-8 text-xs text-[#8490A5] sm:flex-row sm:items-center">
          <p>
            © {currentYear} {BYTE_BRAND.name}. All rights reserved.
          </p>
          <p className="text-[#B0B8C8]">
            {BYTE_BRAND.location} · Built for Businesses and Organizations
          </p>
        </div>
      </div>
    </footer>
  );
}
