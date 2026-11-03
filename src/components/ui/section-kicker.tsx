import * as React from 'react';
import { cn } from '../../lib/utils';

export interface SectionKickerProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: string;
  label: string;
  tone?: 'light' | 'dark';
}

/**
 * Unboxed editorial index & metadata kicker.
 * Strictly follows Zero-Pill Discipline (no rounded pill boxes or code-comment prefixes).
 */
export function SectionKicker({
  index,
  label,
  tone = 'light',
  className,
  ...props
}: SectionKickerProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2.5 text-xs font-medium tracking-[0.04em]',
        tone === 'light' ? 'text-[#4A5365]' : 'text-[#B0B8C8]',
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="inline-block h-[1.5px] w-4 bg-[#FA8112]"
      />
      {index && (
        <>
          <span className="font-mono font-medium text-[#FA8112]">{index}</span>
          <span aria-hidden="true" className="opacity-50">
            ·
          </span>
        </>
      )}
      <span>{label}</span>
    </div>
  );
}

export interface InlineMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  items: readonly string[];
  tone?: 'light' | 'dark';
}

/**
 * Clean unboxed metadata list separated by typographic middle dots (·).
 */
export function InlineMetadata({
  items,
  tone = 'light',
  className,
  ...props
}: InlineMetaProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-2 gap-y-1 text-xs',
        tone === 'light' ? 'text-[#687285]' : 'text-[#8490A5]',
        className
      )}
      {...props}
    >
      {items.map((item, idx) => (
        <React.Fragment key={item}>
          <span>{item}</span>
          {idx < items.length - 1 && (
            <span aria-hidden="true" className="opacity-60">
              ·
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
