import { BYTE_BRAND, BYTE_OFFICIAL_SERVICES } from '../styles/tokens';
import { BYTE_NAVIGATION_ITEMS, resolveRouteMetadata } from './navigation';

export const DEFAULT_SITE_ORIGIN =
  'https://ais-pre-2h3gjdw4zceauafcilbfwq-257327972633.europe-west2.run.app';

export interface PageSeoPayload {
  title: string;
  description: string;
  canonicalUrl: string;
  robots: 'index, follow' | 'noindex, nofollow';
  ogType: 'website';
  ogSiteName: string;
  ogLocale: string;
  ogImage: string;
  ogImageAlt: string;
  twitterCard: 'summary_large_image';
  jsonLd: Record<string, unknown>;
}

/**
 * Normalizes a base site origin (stripping trailing slashes) with fallback.
 */
export function normalizeSiteOrigin(rawOrigin?: string): string {
  const candidate = rawOrigin?.trim();
  if (!candidate || candidate === 'MY_APP_URL') {
    return DEFAULT_SITE_ORIGIN;
  }
  return candidate.endsWith('/') ? candidate.slice(0, -1) : candidate;
}

/**
 * Resolves a clean canonical URL for a given route pathname.
 */
export function resolveCanonicalUrl(pathname: string, rawOrigin?: string): string {
  const origin = normalizeSiteOrigin(rawOrigin);
  const cleanPath =
    pathname.length > 1 && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname || '/';
  return `${origin}${cleanPath === '/' ? '/' : cleanPath}`;
}

/**
 * Builds the Schema.org JSON-LD @graph for Byte Technology and the active route.
 * Uses only verified company facts from BYTE_BRAND and BYTE_OFFICIAL_SERVICES.
 */
export function buildStructuredDataGraph(
  pathname: string,
  rawOrigin?: string
): Record<string, unknown> {
  const origin = normalizeSiteOrigin(rawOrigin);
  const canonicalUrl = resolveCanonicalUrl(pathname, origin);
  const routeMeta = resolveRouteMetadata(pathname);
  const logoUrl = `${origin}/assets/aistudio/byte_logo_og.jpg`;

  const organizationId = `${origin}/#organization`;
  const websiteId = `${origin}/#website`;

  const organizationNode = {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': organizationId,
    name: BYTE_BRAND.name,
    url: `${origin}/`,
    logo: {
      '@type': 'ImageObject',
      url: logoUrl,
      width: 1200,
      height: 630,
    },
    image: logoUrl,
    email: BYTE_BRAND.email,
    slogan: BYTE_BRAND.mission,
    description:
      'Byte Technology is an Ethiopia-based technology partner delivering web development, mobile apps, custom software and ERP systems, IT consulting, cloud solutions, UI/UX design, and AI automation for businesses and organizations.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: BYTE_BRAND.location,
      addressCountry: 'ET',
    },
    areaServed: {
      '@type': 'Country',
      name: BYTE_BRAND.location,
    },
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Businesses and organizations',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support and project consultation',
      email: BYTE_BRAND.email,
      areaServed: 'ET',
      availableLanguage: ['English'],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Byte Technology Official Services',
      itemListElement: BYTE_OFFICIAL_SERVICES.map((service, idx) => ({
        '@type': 'Offer',
        position: idx + 1,
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          serviceType: service.pillar,
          provider: {
            '@id': organizationId,
          },
          areaServed: {
            '@type': 'Country',
            name: BYTE_BRAND.location,
          },
          url: `${origin}/services#${service.id}`,
        },
      })),
    },
  };

  const websiteNode = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: `${origin}/`,
    name: BYTE_BRAND.name,
    description: BYTE_BRAND.mission,
    publisher: {
      '@id': organizationId,
    },
    inLanguage: 'en',
  };

  const pageType =
    routeMeta?.path === '/contact'
      ? 'ContactPage'
      : routeMeta?.path === '/about'
        ? 'AboutPage'
        : 'WebPage';

  const webPageNode = {
    '@type': pageType,
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: routeMeta
      ? routeMeta.title
      : `Page Not Found | ${BYTE_BRAND.name}`,
    description: routeMeta
      ? routeMeta.metaDescription
      : `Explore ${BYTE_BRAND.name} software engineering, ERP, cloud, and AI capabilities in ${BYTE_BRAND.location}.`,
    isPartOf: {
      '@id': websiteId,
    },
    about: {
      '@id': organizationId,
    },
    inLanguage: 'en',
  };

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${origin}/`,
    },
  ];

  if (routeMeta && routeMeta.path !== '/') {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: routeMeta.label,
      item: canonicalUrl,
    });
  }

  const breadcrumbNode = {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: breadcrumbItems,
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [organizationNode, websiteNode, webPageNode, breadcrumbNode],
  };
}

/**
 * Resolves the complete SEO metadata payload for any pathname.
 */
export function buildPageSeoPayload(
  pathname: string,
  rawOrigin?: string
): PageSeoPayload {
  const origin = normalizeSiteOrigin(rawOrigin);
  const routeMeta = resolveRouteMetadata(pathname);
  const canonicalUrl = resolveCanonicalUrl(pathname, origin);
  const ogImage = `${origin}/assets/aistudio/byte_logo_og.jpg`;

  if (!routeMeta) {
    return {
      title: `Page Not Found | ${BYTE_BRAND.name}`,
      description: `The requested page was not found. Explore ${BYTE_BRAND.name} software, ERP, cloud, and AI solutions in ${BYTE_BRAND.location}.`,
      canonicalUrl,
      robots: 'noindex, nofollow',
      ogType: 'website',
      ogSiteName: BYTE_BRAND.name,
      ogLocale: 'en_US',
      ogImage,
      ogImageAlt: `${BYTE_BRAND.name} — ${BYTE_BRAND.mission}`,
      twitterCard: 'summary_large_image',
      jsonLd: buildStructuredDataGraph(pathname, origin),
    };
  }

  return {
    title: routeMeta.title,
    description: routeMeta.metaDescription,
    canonicalUrl,
    robots: 'index, follow',
    ogType: 'website',
    ogSiteName: BYTE_BRAND.name,
    ogLocale: 'en_US',
    ogImage,
    ogImageAlt: `${BYTE_BRAND.name} — ${BYTE_BRAND.mission}`,
    twitterCard: 'summary_large_image',
    jsonLd: buildStructuredDataGraph(routeMeta.path, origin),
  };
}

/**
 * Generates standard XML sitemap covering all 5 approved Byte Technology routes.
 */
export function generateSitemapXml(rawOrigin?: string): string {
  const origin = normalizeSiteOrigin(rawOrigin);
  const lastmod = '2026-11-03';

  const routePriorities: Record<string, { priority: string; changefreq: string }> = {
    '/': { priority: '1.0', changefreq: 'weekly' },
    '/services': { priority: '0.9', changefreq: 'weekly' },
    '/approach': { priority: '0.8', changefreq: 'monthly' },
    '/about': { priority: '0.8', changefreq: 'monthly' },
    '/contact': { priority: '0.9', changefreq: 'monthly' },
  };

  const urlEntries = BYTE_NAVIGATION_ITEMS.map((item) => {
    const loc = resolveCanonicalUrl(item.path, origin);
    const config = routePriorities[item.path] ?? {
      priority: '0.8',
      changefreq: 'monthly',
    };
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      `    <changefreq>${config.changefreq}</changefreq>`,
      `    <priority>${config.priority}</priority>`,
      '  </url>',
    ].join('\n');
  }).join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlEntries,
    '</urlset>',
    '',
  ].join('\n');
}

/**
 * Generates standard robots.txt referencing the canonical sitemap.xml URL.
 */
export function generateRobotsTxt(rawOrigin?: string): string {
  const origin = normalizeSiteOrigin(rawOrigin);
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    '',
    `Sitemap: ${origin}/sitemap.xml`,
    '',
  ].join('\n');
}

/**
 * WCAG 2.1 Relative Luminance & Contrast Ratio Calculator for automated accessibility verification.
 */
export function calculateRelativeLuminance(hex: string): number {
  const cleaned = hex.replace('#', '').trim();
  const r = parseInt(cleaned.slice(0, 2), 16) / 255;
  const g = parseInt(cleaned.slice(2, 4), 16) / 255;
  const b = parseInt(cleaned.slice(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function calculateContrastRatio(hexA: string, hexB: string): number {
  const lumA = calculateRelativeLuminance(hexA);
  const lumB = calculateRelativeLuminance(hexB);
  const brightest = Math.max(lumA, lumB);
  const darkest = Math.min(lumA, lumB);
  return Number(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));
}
