import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../lib/utils';

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  tone?: 'light' | 'dark';
  asChild?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, tone = 'light', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'label';
    return (
      <Comp
        ref={ref}
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          tone === 'light' ? 'text-[#1A2130]' : 'text-[#F2F2EE]',
          className
        )}
        {...props}
      />
    );
  }
);
Label.displayName = 'Label';

export { Label };
