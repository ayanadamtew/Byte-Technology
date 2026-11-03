import * as React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BYTE_NAVIGATION_ITEMS } from '../../config/navigation';
import { BYTE_BRAND } from '../../styles/tokens';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { BrandLogo } from './BrandLogo';

/**
 * Sticky Architectural Header (68px height, Warm Alabaster Glass, 1px hairline border)
 * with responsive mobile navigation drawer.
 */
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  // Close mobile menu automatically on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on Escape key
  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 h-[68px] w-full border-b border-[#DFDFD9] bg-[#F2F2EE]/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Official Byte Technology Brand Lockup */}
        <Link
          to="/"
          aria-label={`${BYTE_BRAND.name} Home`}
          className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA8112] focus-visible:ring-offset-2"
        >
          <BrandLogo tone="light" showLocation />
        </Link>

        {/* Center: Primary Desktop Navigation Links (Clean Typography, Zero Pills) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex md:items-center md:gap-8"
        >
          {BYTE_NAVIGATION_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'relative py-2 text-sm font-medium transition-colors duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA8112] rounded-sm',
                  isActive
                    ? 'text-[#1A2130] font-semibold'
                    : 'text-[#4A5365] hover:text-[#1A2130]'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="byte-header-active-indicator"
                      className="absolute inset-x-0 -bottom-[17px] h-[2px] bg-[#FA8112]"
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right: Primary Consultation CTA + Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="navy"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Link to="/contact">
              <span>Request Consultation</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </Button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="byte-mobile-navigation"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#DFDFD9] bg-[#FAF9F6] text-[#1A2130] transition-colors hover:border-[#1A2130] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA8112] md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="byte-mobile-navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="border-b border-[#DFDFD9] bg-[#FAF9F6] px-4 pt-4 pb-6 shadow-[0_12px_32px_-8px_rgba(26,33,48,0.12)] md:hidden"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col divide-y divide-[#DFDFD9]">
              {BYTE_NAVIGATION_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between py-3.5 text-base font-medium transition-colors',
                      isActive
                        ? 'text-[#FA8112] font-semibold'
                        : 'text-[#1A2130] hover:text-[#FA8112]'
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#687285]">
                      {item.index}.
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 opacity-60" aria-hidden="true" />
                </NavLink>
              ))}
            </nav>

            <div className="mt-6 flex flex-col gap-3 pt-4 border-t border-[#DFDFD9]">
              <Button asChild variant="primary" size="default" className="w-full">
                <Link to="/contact">
                  <span>Request Consultation</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <a
                href={`mailto:${BYTE_BRAND.email}`}
                className="py-2 text-center font-mono text-xs text-[#4A5365] hover:text-[#1A2130]"
              >
                {BYTE_BRAND.email} · {BYTE_BRAND.location}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
