/**
 * BYTE TECHNOLOGY — ARCHITECTURAL MOTION TOKENS & VARIANTS
 * Follows docs/DESIGN_SYSTEM.md Section 12 (Animation & Motion Principles):
 * - Signature Easing Curve: cubic-bezier(0.22, 1, 0.36, 1)
 * - Micro-interactions: 180ms (0.18s)
 * - Module/Tab transitions: 280ms (0.28s)
 * - Viewport entrance reveals: 450ms (0.45s)
 * - Respects prefers-reduced-motion across all animations
 */

export const BYTE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const BYTE_DURATIONS = {
  micro: 0.18,
  page: 0.22,
  module: 0.28,
  reveal: 0.45,
} as const;

export interface RevealVariantConfig {
  prefersReducedMotion: boolean;
  yOffset?: number;
  duration?: number;
  delay?: number;
}

/**
 * Computes scroll-triggered or entrance reveal variants that immediately
 * collapse vertical movement when `prefersReducedMotion` is active.
 */
export function createRevealVariants({
  prefersReducedMotion,
  yOffset = 12,
  duration = BYTE_DURATIONS.reveal,
  delay = 0,
}: RevealVariantConfig) {
  return {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: BYTE_EASE,
      },
    },
  };
}

/**
 * Computes staggered container variants for service cards, process steps,
 * and architectural pillars.
 */
export function createStaggerContainerVariants(
  prefersReducedMotion: boolean,
  staggerChildren = 0.065,
  delayChildren = 0.02
) {
  return {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerChildren,
        delayChildren: prefersReducedMotion ? 0 : delayChildren,
      },
    },
  };
}

/**
 * Splits a headline string into words/phrases for staggered hero text reveal
 * while preserving exact whitespace and punctuation.
 */
export function splitHeadlineIntoTokens(headline: string): string[] {
  return headline
    .trim()
    .split(/\s+/)
    .filter((token) => token.length > 0);
}

/**
 * Computes subtle route transition variants for page navigation.
 * Keeps opacity readable and never blocks user interaction.
 */
export function createPageTransitionVariants(prefersReducedMotion: boolean) {
  return {
    initial: {
      opacity: 1,
      y: prefersReducedMotion ? 0 : 6,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : BYTE_DURATIONS.page,
        ease: BYTE_EASE,
      },
    },
    exit: {
      opacity: 1,
      y: prefersReducedMotion ? 0 : -4,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.14,
        ease: BYTE_EASE,
      },
    },
  };
}
