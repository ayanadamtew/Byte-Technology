import * as React from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  tone?: 'light' | 'dark';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, tone = 'light', ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[120px] w-full rounded-md px-3.5 py-3 text-sm leading-relaxed transition-colors duration-[180ms] focus-visible:outline-none focus-visible:border-[#FA8112] focus-visible:ring-2 focus-visible:ring-[#FA8112]/20 disabled:cursor-not-allowed disabled:opacity-50',
          tone === 'light'
            ? 'bg-[#FFFFFF] border border-[#C8C8C0] text-[#1A2130] placeholder:text-[#687285]'
            : 'bg-[#111622] border border-[#F2F2EE]/18 text-[#F2F2EE] placeholder:text-[#8490A5]',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
