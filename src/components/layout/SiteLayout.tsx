import * as React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { resolveRouteMetadata } from '../../config/navigation';
import { BYTE_BRAND } from '../../styles/tokens';
import { Header } from './Header';
import { Footer } from './Footer';

/**
 * Shared SiteLayout wrapping all routes with:
 * - Accessible skip-to-content link
 * - Dynamic document title and meta description synchronization
 * - Smooth scroll-to-top or hash-anchor alignment on route changes
 * - Global Header, Main landmark, and Global Footer
 */
export function SiteLayout() {
  const location = useLocation();

  React.useEffect(() => {
    const routeMeta = resolveRouteMetadata(location.pathname);
    document.title = routeMeta
      ? routeMeta.title
      : `Page Not Found | ${BYTE_BRAND.name}`;

    const descriptionEl = document.querySelector('meta[name="description"]');
    if (descriptionEl && routeMeta) {
      descriptionEl.setAttribute('content', routeMeta.metaDescription);
    }

    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname, location.hash]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F2F2EE] text-[#1A2130]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-[#1A2130] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#F2F2EE] focus:ring-2 focus:ring-[#FA8112]"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
