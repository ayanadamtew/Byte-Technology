import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  tone?: 'light' | 'ivory' | 'dark';
  withGridBg?: boolean;
  withTopRule?: boolean;
  withBottomRule?: boolean;
  as?: 'section' | 'div' | 'header' | 'footer';
}

/**
 * Architectural section wrapper enforcing Byte Technology's 1280px container bounds,
 * rhythmic light/dark surface cadence, and exposed 1px structural hairlines.
 */
export function ArchitecturalSection({
  tone = 'light',
  withGridBg = false,
  withTopRule = false,
  withBottomRule = true,
  as: Component = 'section',
  className,
  children,
  ...props
}: SectionContainerProps) {
  const toneClasses = {
    light: 'bg-[#F2F2EE] text-[#1A2130] border-[#DFDFD9]',
    ivory: 'bg-[#FAF9F6] text-[#1A2130] border-[#DFDFD9]',
    dark: 'dark-section bg-[#1A2130] text-[#F2F2EE] border-[#F2F2EE]/11',
  }[tone];

  const gridClass = withGridBg
    ? tone === 'dark'
      ? 'byte-grid-bg-dark'
      : 'byte-grid-bg-light'
    : '';

  return (
    <Component
      className={cn(
        'relative w-full py-16 md:py-24',
        toneClasses,
        gridClass,
        withTopRule && 'border-t',
        withBottomRule && 'border-b',
        className
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </Component>
  );
}

/**
 * Subtle 9x9px structural blueprint crosshair marker (+) for major grid intersections.
 */
export function GridCrosshair({
  className,
  tone = 'light',
}: {
  className?: string;
  tone?: 'light' | 'dark';
}) {
  const strokeColor = tone === 'light' ? '#9BA3B4' : 'rgba(242, 242, 238, 0.28)';
  return (
    <svg
      aria-hidden="true"
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      className={cn('pointer-events-none select-none', className)}
    >
      <path d="M4.5 0V9M0 4.5H9" stroke={strokeColor} strokeWidth="1" />
    </svg>
  );
}
