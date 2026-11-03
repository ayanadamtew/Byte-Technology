import * as React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  tone?: 'light' | 'dark';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', tone = 'light', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-md px-3.5 py-2.5 text-sm transition-colors duration-[180ms] file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:border-[#FA8112] focus-visible:ring-2 focus-visible:ring-[#FA8112]/20 disabled:cursor-not-allowed disabled:opacity-50',
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
Input.displayName = 'Input';

export { Input };
