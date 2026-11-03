import * as React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  BYTE_EASE,
  BYTE_DURATIONS,
  createRevealVariants,
  createStaggerContainerVariants,
  splitHeadlineIntoTokens,
} from '../../lib/motion';
import { cn } from '../../lib/utils';

/**
 * 1. HERO TEXT REVEAL (<HeroHeadlineReveal />)
 * Word-by-word architectural reveal with zero initial delay so hero copy is
 * immediately readable and usable. Respects prefers-reduced-motion.
 */
export interface HeroHeadlineRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2';
}

export function HeroHeadlineReveal({
  text,
  className,
  as: Tag = 'h1',
}: HeroHeadlineRevealProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const tokens = React.useMemo(() => splitHeadlineIntoTokens(text), [text]);

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      {tokens.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.38,
            delay: index * 0.032,
            ease: BYTE_EASE,
          }}
          className={cn(
            'inline-block will-change-transform',
            index < tokens.length - 1 && 'mr-[0.27em]'
          )}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

/**
 * 2. SCROLL-TRIGGERED SECTION REVEAL (<ScrollReveal />)
 * High-damping viewport reveal (y: 12px -> 0, opacity: 0 -> 1) that triggers once
 * as the user scrolls and respects prefers-reduced-motion.
 */
export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  amount?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  yOffset = 12,
  amount = 0.12,
}: ScrollRevealProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const variants = React.useMemo(
    () =>
      createRevealVariants({
        prefersReducedMotion,
        yOffset,
        duration: BYTE_DURATIONS.reveal,
        delay,
      }),
    [prefersReducedMotion, yOffset, delay]
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: '0px 0px -32px 0px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * 3. STAGGERED CONTAINER & ITEM (<StaggerContainer /> & <StaggerItem />)
 * Orchestrates staggered entrance of service cards, target customer profiles,
 * and engineering lifecycle phases.
 */
export interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  amount?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerChildren = 0.065,
  delayChildren = 0.02,
  amount = 0.08,
}: StaggerContainerProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const variants = React.useMemo(
    () =>
      createStaggerContainerVariants(
        prefersReducedMotion,
        staggerChildren,
        delayChildren
      ),
    [prefersReducedMotion, staggerChildren, delayChildren]
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount, margin: '0px 0px -24px 0px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}

export function StaggerItem({
  children,
  className,
  yOffset = 14,
}: StaggerItemProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const variants = React.useMemo(
    () =>
      createRevealVariants({
        prefersReducedMotion,
        yOffset,
        duration: 0.4,
      }),
    [prefersReducedMotion, yOffset]
  );

  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * 4. SUBTLE ANIMATED ARCHITECTURAL BACKGROUND ACCENTS (<ArchitecturalGridAccents />)
 * Renders restrained, GPU-accelerated blueprint intersection nodes and subtle signal traces
 * along the 64px architectural grid. Automatically freezes when prefers-reduced-motion is active.
 */
export function ArchitecturalGridAccents({
  tone = 'light',
}: {
  tone?: 'light' | 'dark';
}) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const accentPrimary = '#FA8112';
  const accentSecondary = '#FDA63A';
  const crosshairColor =
    tone === 'light' ? 'rgba(26, 33, 48, 0.22)' : 'rgba(242, 242, 238, 0.22)';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Top-Left & Bottom-Right Structural Blueprint Crosshairs */}
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        {/* Subtle horizontal architectural signal line aligned to 64px grid */}
        {!prefersReducedMotion && (
          <>
            <motion.line
              x1="0%"
              y1="64"
              x2="28%"
              y2="64"
              stroke={accentPrimary}
              strokeWidth="1"
              strokeOpacity={tone === 'light' ? 0.22 : 0.3}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 0.65, 0] }}
              transition={{
                duration: 6.5,
                repeat: Infinity,
                repeatDelay: 2.5,
                ease: 'easeInOut',
              }}
            />
            <motion.line
              x1="72%"
              y1="192"
              x2="100%"
              y2="192"
              stroke={accentSecondary}
              strokeWidth="1"
              strokeOpacity={tone === 'light' ? 0.25 : 0.32}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1], opacity: [0, 0.6, 0] }}
              transition={{
                duration: 7.2,
                delay: 1.8,
                repeat: Infinity,
                repeatDelay: 3,
                ease: 'easeInOut',
              }}
            />
          </>
        )}

        {/* Fixed Geometric Intersection Nodes (Outer Desktop Margins) */}
        <g stroke={crosshairColor} strokeWidth="1" className="hidden lg:block">
          <path d="M60 64H68M64 60V68" />
          <path d="M60 192H68M64 188V196" />
        </g>
      </svg>

      {/* Subtle Ambient Corner Node Indicator */}
      <motion.div
        animate={
          prefersReducedMotion
            ? { opacity: 0.35 }
            : { opacity: [0.2, 0.55, 0.2] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 4.8, repeat: Infinity, ease: 'easeInOut' }
        }
        className={cn(
          'absolute top-[61px] right-8 hidden h-1.5 w-1.5 lg:block',
          tone === 'light' ? 'bg-[#FA8112]/50' : 'bg-[#FDA63A]/60'
        )}
      />
    </div>
  );
}
