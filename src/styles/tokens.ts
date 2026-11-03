/**
 * BYTE TECHNOLOGY — SHARED DESIGN SYSTEM TOKENS
 * Derived directly from docs/DESIGN_DIRECTION.md, docs/DESIGN_SYSTEM.md,
 * and the official Byte Technology modular "B" logo (/assets/aistudio/byte_logo_2939abed.jpeg).
 */

export const BYTE_BRAND = {
  name: 'Byte Technology',
  location: 'Ethiopia',
  mission: 'Our mission is simple: To Digitalize Ethiopia.',
  email: 'ayanadamtew@gmail.com',
  logoPath: '/assets/aistudio/byte_logo_2939abed.jpeg',
} as const;

export const BYTE_COLORS = {
  light: {
    canvas: '#F2F2EE',       // Warm Alabaster (matches official logo background)
    surface: '#FAF9F6',      // Crisp Ivory (Bento cards & modules)
    pure: '#FFFFFF',         // Active/Hover elevated surface & inputs
    subtle: '#E7E6E0',       // Segmented control tracks & subtle fills
    border: '#DFDFD9',       // 1px exposed structural hairline
    inkPrimary: '#1A2130',   // Byte Navy Ink (13.8:1 AAA contrast on #F2F2EE)
    inkSecondary: '#4A5365', // Muted Slate prose (6.8:1 AA contrast)
    inkMuted: '#687285',     // Index numbers & captions (4.6:1 AA contrast)
  },
  dark: {
    canvas: '#1A2130',       // Byte Navy Obsidian (from logo left structural pillar)
    deep: '#111622',         // Deep Midnight architectural recess
    surface: '#232C3F',      // Elevated Midnight Slate card surface
    border: 'rgba(242, 242, 238, 0.11)', // 1px structural hairline on dark
    inkPrimary: '#F2F2EE',   // Warm Alabaster headline & primary text
    inkSecondary: '#B0B8C8', // Cool Pewter body copy
    inkMuted: '#8490A5',     // Technical coordinates on dark sections
  },
  accent: {
    orange: '#FA8112',       // Official logo center square byte orange
    orangeHover: '#E06D05',  // Tactile hover state
    amber: '#FDA63A',        // Official logo right curved quadrant amber
  },
  status: {
    success: '#15803D',
    warning: '#B45309',
    danger: '#B91C1C',
  },
} as const;

export const BYTE_TYPOGRAPHY = {
  fonts: {
    display: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    sans: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
  },
  scale: {
    displayXl: {
      fontSize: 'clamp(2.375rem, 4.2vw, 3.75rem)',
      lineHeight: '1.08',
      letterSpacing: '-0.03em',
      fontWeight: 700,
    },
    headingLg: {
      fontSize: 'clamp(1.75rem, 2.8vw, 2.625rem)',
      lineHeight: '1.14',
      letterSpacing: '-0.025em',
      fontWeight: 700,
    },
    headingMd: {
      fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)',
      lineHeight: '1.24',
      letterSpacing: '-0.015em',
      fontWeight: 600,
    },
    headingSm: {
      fontSize: '1.125rem',
      lineHeight: '1.35',
      letterSpacing: '-0.01em',
      fontWeight: 600,
    },
    bodyLg: {
      fontSize: '1.125rem',
      lineHeight: '1.65',
      fontWeight: 400,
    },
    bodyBase: {
      fontSize: '1rem',
      lineHeight: '1.65',
      fontWeight: 400,
    },
    bodySm: {
      fontSize: '0.875rem',
      lineHeight: '1.55',
      fontWeight: 400,
    },
    kickerIndex: {
      fontSize: '0.75rem',
      lineHeight: '1.4',
      letterSpacing: '0.06em',
      fontWeight: 500,
    },
  },
} as const;

export const BYTE_SPACING = {
  baselineUnitPx: 8,
  containerMaxWidthPx: 1280,
  headerHeightPx: 68,
  scaleRem: {
    1: '0.25rem', // 4px
    2: '0.5rem',  // 8px
    3: '0.75rem', // 12px
    4: '1rem',    // 16px
    6: '1.5rem',  // 24px
    8: '2rem',    // 32px
    12: '3rem',   // 48px
    16: '4rem',   // 64px
    24: '6rem',   // 96px
    32: '8rem',   // 128px
  },
} as const;

export const BYTE_BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  desktopBaseline: 1440,
} as const;

export const BYTE_MOTION = {
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  durationMs: {
    micro: 180,
    transition: 280,
    reveal: 450,
  },
} as const;

/**
 * The 7 Official Byte Technology Services (strictly aligned with approved docs).
 */
export interface ByteServiceDefinition {
  index: string;
  id: string;
  name: string;
  pillar:
    | 'Digital Products & Experiences'
    | 'Enterprise Systems & Operations'
    | 'Intelligence & Automation'
    | 'Strategy & Cloud Infrastructure';
}

export const BYTE_OFFICIAL_SERVICES: readonly ByteServiceDefinition[] = [
  {
    index: '01',
    id: 'web-development',
    name: 'Web development',
    pillar: 'Digital Products & Experiences',
  },
  {
    index: '02',
    id: 'mobile-application-development',
    name: 'Mobile application development',
    pillar: 'Digital Products & Experiences',
  },
  {
    index: '03',
    id: 'custom-software-and-erp-systems',
    name: 'Custom software and ERP systems',
    pillar: 'Enterprise Systems & Operations',
  },
  {
    index: '04',
    id: 'it-consulting',
    name: 'IT consulting',
    pillar: 'Strategy & Cloud Infrastructure',
  },
  {
    index: '05',
    id: 'cloud-solutions',
    name: 'Cloud solutions',
    pillar: 'Strategy & Cloud Infrastructure',
  },
  {
    index: '06',
    id: 'ui-ux-design',
    name: 'UI/UX design',
    pillar: 'Digital Products & Experiences',
  },
  {
    index: '07',
    id: 'ai-and-business-automation',
    name: 'AI and business automation',
    pillar: 'Intelligence & Automation',
  },
] as const;
