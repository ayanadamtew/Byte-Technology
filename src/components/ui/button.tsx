import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FA8112] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none active:scale-[0.985] [&_svg]:transition-transform [&_svg]:duration-[180ms] [&_svg]:ease-[cubic-bezier(0.22,1,0.36,1)] hover:[&_svg:last-child]:translate-x-0.5',
  {
    variants: {
      variant: {
        primary:
          'bg-[#FA8112] text-[#111622] hover:bg-[#E06D05] active:translate-y-0 hover:-translate-y-[1.5px] shadow-[0_1px_2px_rgba(26,33,48,0.08)] hover:shadow-[0_6px_16px_-4px_rgba(250,129,18,0.32)]',
        navy:
          'bg-[#1A2130] text-[#F2F2EE] hover:bg-[#FA8112] hover:text-[#111622] active:translate-y-0 hover:-translate-y-[1.5px] shadow-[0_1px_2px_rgba(26,33,48,0.12)] hover:shadow-[0_6px_16px_-4px_rgba(26,33,48,0.22)]',
        outline:
          'border border-[#1A2130]/25 bg-transparent text-[#1A2130] hover:border-[#1A2130] hover:bg-[#1A2130]/[0.04] active:translate-y-0 hover:-translate-y-[1px]',
        outlineDark:
          'border border-[#F2F2EE]/25 bg-transparent text-[#F2F2EE] hover:border-[#FDA63A] hover:bg-[#F2F2EE]/[0.06] active:translate-y-0 hover:-translate-y-[1px]',
        ghost:
          'bg-transparent text-[#1A2130] hover:bg-[#1A2130]/[0.05]',
        link:
          'bg-transparent p-0 h-auto font-medium text-[#1A2130] hover:text-[#FA8112] underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 py-2 text-xs',
        default: 'h-11 px-6 py-2.5 text-sm',
        lg: 'h-12 px-7 py-3 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
