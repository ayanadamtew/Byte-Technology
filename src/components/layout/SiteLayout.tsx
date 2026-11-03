import * as React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { MotionConfig, motion, useReducedMotion } from 'motion/react';
import { buildPageSeoPayload } from '../../config/seo';
import { createPageTransitionVariants } from '../../lib/motion';
import { Header } from './Header';
import { Footer } from './Footer';

function setMetaTagContent(selector: string, content: string) {
  const el = document.querySelector<HTMLMetaElement>(selector);
  if (el) {
    el.setAttribute('content', content);
  }
}

/**
 * Shared SiteLayout wrapping all routes with:
 * - Global MotionConfig respecting OS/browser prefers-reduced-motion
 * - Accessible skip-to-content link
 * - Dynamic document title, meta description, Open Graph, Twitter Card, canonical URL, and JSON-LD synchronization
 * - Smooth scroll-to-top or hash-anchor alignment on route changes
 * - Subtle, zero-blocking page transitions between routes
 */
export function SiteLayout() {
  const location = useLocation();
  const prefersReducedMotion = Boolean(useReducedMotion());
  const hasMountedRef = React.useRef(false);

  React.useEffect(() => {
    hasMountedRef.current = true;
  }, []);

  const pageVariants = React.useMemo(
    () => createPageTransitionVariants(prefersReducedMotion),
    [prefersReducedMotion]
  );

  React.useEffect(() => {
    const origin =
      typeof window !== 'undefined' ? window.location.origin : undefined;
    const seo = buildPageSeoPayload(location.pathname, origin);

    document.title = seo.title;
    setMetaTagContent('meta[name="description"]', seo.description);
    setMetaTagContent('meta[name="robots"]', seo.robots);
    setMetaTagContent('meta[property="og:title"]', seo.title);
    setMetaTagContent('meta[property="og:description"]', seo.description);
    setMetaTagContent('meta[property="og:url"]', seo.canonicalUrl);
    setMetaTagContent('meta[property="og:image"]', seo.ogImage);
    setMetaTagContent('meta[name="twitter:title"]', seo.title);
    setMetaTagContent('meta[name="twitter:description"]', seo.description);
    setMetaTagContent('meta[name="twitter:image"]', seo.ogImage);

    const canonicalEl = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (canonicalEl) {
      canonicalEl.setAttribute('href', seo.canonicalUrl);
    }

    const jsonLdEl = document.getElementById('byte-jsonld');
    if (jsonLdEl) {
      jsonLdEl.textContent = JSON.stringify(seo.jsonLd);
    }

    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const scrollToHashTarget = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };

      if (!scrollToHashTarget()) {
        const timerId = window.setTimeout(scrollToHashTarget, 60);
        return () => window.clearTimeout(timerId);
      }
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname, location.hash]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-[#F2F2EE] text-[#1A2130]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-[#1A2130] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#F2F2EE] focus:ring-2 focus:ring-[#FA8112]"
        >
          Skip to main content
        </a>

        <Header />

        <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial={hasMountedRef.current ? 'initial' : false}
            animate="animate"
          >
            <Outlet />
          </motion.div>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}

