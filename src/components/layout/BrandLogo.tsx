import * as React from 'react';
import { cn } from '../../lib/utils';
import { BYTE_BRAND } from '../../styles/tokens';

export interface BrandLogoProps {
  tone?: 'light' | 'dark';
  showLocation?: boolean;
  priority?: boolean;
  className?: string;
}

/**
 * Reusable Byte Technology Brand Lockup.
 * Uses responsive WebP sources (1.2 KB 1x / 1.7 KB 2x) with fallback to the official
 * logo asset (/assets/aistudio/byte_logo_2939abed.jpeg) and explicit 36x36 dimensions
 * to guarantee zero Cumulative Layout Shift (CLS = 0).
 */
export function BrandLogo({
  tone = 'light',
  showLocation = false,
  priority = false,
  className,
}: BrandLogoProps) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className={cn('inline-flex items-center gap-3 select-none', className)}>
      <div
        className={cn(
          'relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border',
          tone === 'light'
            ? 'border-[#DFDFD9] bg-[#F2F2EE]'
            : 'border-[#F2F2EE]/15 bg-[#F2F2EE]'
        )}
      >
        {!imageError ? (
          <picture className="h-full w-full">
            <source
              type="image/webp"
              srcSet="/assets/aistudio/byte_logo_72.webp 1x, /assets/aistudio/byte_logo_144.webp 2x"
            />
            <img
              src={BYTE_BRAND.logoPath}
              alt={`${BYTE_BRAND.name} — Official Modular B Brand Logo`}
              width={36}
              height={36}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : 'auto'}
              decoding="async"
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          </picture>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            className="h-6 w-6"
            fill="none"
          >
            <rect x="4" y="4" width="7" height="24" fill="#1A2130" />
            <rect x="13" y="4" width="6" height="6" fill="#FA8112" />
            <rect x="13" y="13" width="6" height="6" fill="#FA8112" />
            <rect x="13" y="22" width="6" height="6" fill="#FA8112" />
            <path d="M21 4C25.4183 4 29 7.58172 29 12H21V4Z" fill="#FDA63A" />
            <path d="M21 16H29C29 13.7909 27.2091 12 25 12H21V16Z" fill="#FA8112" />
            <path d="M21 16H25C27.2091 16 29 17.7909 29 20H21V16Z" fill="#FA8112" />
            <path d="M21 28C25.4183 28 29 24.4183 29 20H21V28Z" fill="#FDA63A" />
          </svg>
        )}
      </div>

      <div className="flex flex-col">
        <span
          className={cn(
            'font-display text-base font-bold leading-none tracking-[-0.02em]',
            tone === 'light' ? 'text-[#1A2130]' : 'text-[#F2F2EE]'
          )}
        >
          {BYTE_BRAND.name}
        </span>
        {showLocation && (
          <span
            className={cn(
              'mt-1 font-mono text-[11px] leading-none tracking-[0.04em]',
              tone === 'light' ? 'text-[#525B6C]' : 'text-[#B0B8C8]'
            )}
          >
            {BYTE_BRAND.location}
          </span>
        )}
      </div>
    </div>
  );
}

