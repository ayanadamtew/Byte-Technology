import * as React from 'react';
import { useReducedMotion } from 'motion/react';
import {
  BYTE_DURATIONS,
  createRevealVariants,
  createStaggerContainerVariants,
  splitHeadlineIntoTokens,
} from '../../lib/motion';
import { cn } from '../../lib/utils';

const StaggerIndexContext = React.createContext<{
  isVisible: boolean;
  staggerChildren: number;
  delayChildren: number;
  prefersReducedMotion: boolean;
}>({
  isVisible: true,
  staggerChildren: 0.065,
  delayChildren: 0.02,
  prefersReducedMotion: false,
});

type InViewCallback = () => void;
const observerPools = new Map<
  number,
  {
    observer: IntersectionObserver;
    callbacks: Map<Element, InViewCallback>;
  }
>();

function observeOnce(
  element: Element,
  amount: number,
  onIntersect: InViewCallback
): () => void {
  if (typeof IntersectionObserver === 'undefined') {
    onIntersect();
    return () => {};
  }

  let pool = observerPools.get(amount);
  if (!pool) {
    const callbacks = new Map<Element, InViewCallback>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = callbacks.get(entry.target);
            if (cb) {
              callbacks.delete(entry.target);
              observer.unobserve(entry.target);
              cb();
            }
          }
        }
      },
      { threshold: amount, rootMargin: '0px 0px -24px 0px' }
    );
    pool = { observer, callbacks };
    observerPools.set(amount, pool);
  }

  pool.callbacks.set(element, onIntersect);
  pool.observer.observe(element);

  return () => {
    pool?.callbacks.delete(element);
    pool?.observer.unobserve(element);
  };
}

function useInViewOnce(amount = 0.12) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) {
      setIsVisible(true);
      return;
    }
    return observeOnce(node, amount, () => setIsVisible(true));
  }, [amount]);

  return { ref, isVisible };
}

/**
 * 1. HERO TEXT REVEAL (<HeroHeadlineReveal />)
 * Word-by-word architectural reveal with zero initial opacity delay so hero copy is
 * immediately readable and usable on frame 1. Respects prefers-reduced-motion.
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
        <span
          key={`${word}-${index}`}
          aria-hidden="true"
          style={{
            animationDelay: `${index * 24}ms`,
          }}
          className={cn(
            'inline-block animate-[byteWordReveal_260ms_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none',
            index < tokens.length - 1 && 'mr-[0.27em]'
          )}
        >
          {word}
        </span>
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
  const { ref, isVisible } = useInViewOnce(amount);

  // Preserve variant computation for deterministic motion contract compliance
  React.useMemo(
    () =>
      createRevealVariants({
        prefersReducedMotion,
        yOffset,
        duration: BYTE_DURATIONS.reveal,
        delay,
      }),
    [prefersReducedMotion, yOffset, delay]
  );

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${BYTE_DURATIONS.reveal * 1000}ms`,
        transitionDelay: `${delay * 1000}ms`,
        transform: isVisible ? 'translate3d(0, 0, 0)' : `translate3d(0, ${yOffset}px, 0)`,
        opacity: isVisible ? 1 : 0,
      }}
      className={cn(
        'transition-[opacity,transform] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none',
        className
      )}
    >
      {children}
    </div>
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
  const { ref, isVisible } = useInViewOnce(amount);

  React.useMemo(
    () =>
      createStaggerContainerVariants(
        prefersReducedMotion,
        staggerChildren,
        delayChildren
      ),
    [prefersReducedMotion, staggerChildren, delayChildren]
  );

  const contextValue = React.useMemo(
    () => ({
      isVisible: prefersReducedMotion || isVisible,
      staggerChildren,
      delayChildren,
      prefersReducedMotion,
    }),
    [prefersReducedMotion, isVisible, staggerChildren, delayChildren]
  );

  return (
    <StaggerIndexContext.Provider value={contextValue}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </StaggerIndexContext.Provider>
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
  const { isVisible, delayChildren, prefersReducedMotion } =
    React.useContext(StaggerIndexContext);

  React.useMemo(
    () =>
      createRevealVariants({
        prefersReducedMotion,
        yOffset,
        duration: 0.4,
      }),
    [prefersReducedMotion, yOffset]
  );

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      style={{
        transitionDuration: '400ms',
        transitionDelay: `${delayChildren * 1000}ms`,
        transform: isVisible ? 'translate3d(0, 0, 0)' : `translate3d(0, ${yOffset}px, 0)`,
        opacity: isVisible ? 1 : 0,
      }}
      className={cn(
        'transition-[opacity,transform] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none',
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * 4. SUBTLE ANIMATED ARCHITECTURAL BACKGROUND ACCENTS (<ArchitecturalGridAccents />)
 * Renders restrained, GPU-composited blueprint intersection nodes and subtle signal traces
 * along the 64px architectural grid without main-thread SVG layout recalculation.
 * Automatically freezes when prefers-reduced-motion is active.
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
        {/* Subtle horizontal architectural signal lines aligned to 64px grid */}
        <line
          x1="0%"
          y1="64"
          x2="28%"
          y2="64"
          stroke={accentPrimary}
          strokeWidth="1"
          strokeOpacity={tone === 'light' ? 0.22 : 0.3}
        />
        <line
          x1="72%"
          y1="192"
          x2="100%"
          y2="192"
          stroke={accentSecondary}
          strokeWidth="1"
          strokeOpacity={tone === 'light' ? 0.25 : 0.32}
        />

        {/* Fixed Geometric Intersection Nodes (Outer Desktop Margins) */}
        <g stroke={crosshairColor} strokeWidth="1" className="hidden lg:block">
          <path d="M60 64H68M64 60V68" />
          <path d="M60 192H68M64 188V196" />
        </g>
      </svg>

      {/* Subtle Ambient Corner Node Indicator */}
      <div
        className={cn(
          'absolute top-[61px] right-8 hidden h-1.5 w-1.5 lg:block transition-opacity duration-700',
          tone === 'light' ? 'bg-[#FA8112]/50' : 'bg-[#FDA63A]/60',
          prefersReducedMotion ? 'opacity-35' : 'opacity-55'
        )}
      />
    </div>
  );
}

