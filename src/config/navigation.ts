import { BYTE_BRAND } from '../styles/tokens';

export type ByteRoutePath = '/' | '/services' | '/approach' | '/about' | '/contact';

export interface ByteNavItem {
  index: string;
  label: string;
  path: ByteRoutePath;
  title: string;
  metaDescription: string;
  kicker: string;
  headline: string;
  lead: string;
}

export const BYTE_NAVIGATION_ITEMS: readonly ByteNavItem[] = [
  {
    index: '01',
    label: 'Home',
    path: '/',
    title: 'Byte Technology | Software, ERP, Cloud & AI in Ethiopia',
    metaDescription:
      'Our mission is simple: To Digitalize Ethiopia. Byte Technology builds custom ERP, web, mobile, cloud, UI/UX, and AI automation systems for organizations.',
    kicker: 'Byte Technology · Ethiopia',
    headline: 'Modern Software, Cloud, and AI Systems Built to Digitalize Ethiopia.',
    lead: 'Byte Technology partners with businesses and organizations across Ethiopia to replace fragmented, manual workflows with resilient digital systems.',
  },
  {
    index: '02',
    label: 'Services',
    path: '/services',
    title: 'Services | Byte Technology — Web, ERP, Cloud & AI Ethiopia',
    metaDescription:
      'Explore Byte Technology’s 7 core services in Ethiopia: Web, Mobile Apps, Custom Software & ERP, IT Consulting, Cloud Solutions, UI/UX Design, and AI Automation.',
    kicker: 'Capabilities · 01 — 07',
    headline:
      'End-to-End Software Engineering, Cloud, and Digital Transformation Services in Ethiopia.',
    lead: 'Seven integrated disciplines under one accountable engineering and consulting partner.',
  },
  {
    index: '03',
    label: 'Approach',
    path: '/approach',
    title: 'Approach & Delivery | Byte Technology Systems Architecture',
    metaDescription:
      'Discover how Byte Technology architects, builds, and scales custom ERP systems, web and mobile platforms, cloud infrastructure, and AI for Ethiopian enterprises.',
    kicker: 'Delivery Governance',
    headline: 'How Byte Technology Architects, Builds, and Scales Enterprise Systems.',
    lead: 'Strong software requires disciplined execution. Every engagement follows a transparent four-phase engineering lifecycle.',
  },
  {
    index: '04',
    label: 'About',
    path: '/about',
    title: 'About Byte Technology | Our Mission: To Digitalize Ethiopia',
    metaDescription:
      'Learn about Byte Technology in Ethiopia. Our mission is simple: To Digitalize Ethiopia through modern software engineering, ERP, cloud, UI/UX, and AI solutions.',
    kicker: 'About Byte Technology · Ethiopia',
    headline: 'Advancing Ethiopia’s Digital Transformation Through Engineering Excellence.',
    lead: BYTE_BRAND.mission,
  },
  {
    index: '05',
    label: 'Contact',
    path: '/contact',
    title: 'Contact & Consultation | Byte Technology — Ethiopia',
    metaDescription:
      'Start a project consultation with Byte Technology in Ethiopia (ayanadamtew@gmail.com) for custom software, ERP, web, mobile, cloud, UI/UX, and AI automation.',
    kicker: 'Contact & Consultation · Ethiopia',
    headline: 'Start a Project Conversation with Byte Technology.',
    lead: 'Whether you are planning an enterprise ERP system, launching a new web or mobile platform, or exploring AI automation, let’s discuss your roadmap.',
  },
] as const;

/**
 * Resolves a route metadata record by pathname, falling back to undefined for unknown routes.
 */
export function resolveRouteMetadata(pathname: string): ByteNavItem | undefined {
  const normalized =
    pathname.length > 1 && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname;
  return BYTE_NAVIGATION_ITEMS.find((item) => item.path === normalized);
}

/**
 * Builds a clean mailto consultation link targeting Byte Technology's official email.
 */
export function buildConsultationMailto(params?: {
  serviceName?: string;
  subject?: string;
}): string {
  const baseEmail = BYTE_BRAND.email;
  const subjectText =
    params?.subject ??
    (params?.serviceName
      ? `Project Consultation Inquiry: ${params.serviceName} — Byte Technology`
      : 'Project Consultation Inquiry — Byte Technology');
  return `mailto:${baseEmail}?subject=${encodeURIComponent(subjectText)}`;
}

export interface ByteSocialLink {
  id: 'linkedin' | 'github' | 'facebook';
  label: string;
  href: string;
}

/**
 * Validates that an external link is a well-formed https:// URL and not a placeholder.
 */
export function isValidExternalHttpsUrl(rawUrl: string | undefined): boolean {
  if (!rawUrl) return false;
  const trimmed = rawUrl.trim();
  if (!trimmed || trimmed.startsWith('MY_') || trimmed.includes('placeholder')) {
    return false;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' && Boolean(parsed.hostname);
  } catch {
    return false;
  }
}

/**
 * Returns only verified external social links that have been explicitly configured.
 * Never fabricates or guesses unverified social profile URLs.
 */
export function getVerifiedSocialLinks(
  env?: Record<string, string | undefined>
): readonly ByteSocialLink[] {
  const sourceEnv: Record<string, string | undefined> =
    env ??
    ((typeof import.meta !== 'undefined' &&
      (import.meta as unknown as { env?: Record<string, string | undefined> }).env) ||
      {});

  const candidates: Array<{
    id: ByteSocialLink['id'];
    label: string;
    raw: string | undefined;
  }> = [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      raw: sourceEnv.VITE_SOCIAL_LINKEDIN_URL,
    },
    {
      id: 'github',
      label: 'GitHub',
      raw: sourceEnv.VITE_SOCIAL_GITHUB_URL,
    },
    {
      id: 'facebook',
      label: 'Facebook',
      raw: sourceEnv.VITE_SOCIAL_FACEBOOK_URL,
    },
  ];

  return candidates
    .filter((item) => isValidExternalHttpsUrl(item.raw))
    .map((item) => ({
      id: item.id,
      label: item.label,
      href: item.raw!.trim(),
    }));
}

