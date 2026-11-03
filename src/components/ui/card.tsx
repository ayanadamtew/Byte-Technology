import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const cardVariants = cva(
  'relative transition-colors duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
  {
    variants: {
      surface: {
        light:
          'bg-[#FAF9F6] text-[#1A2130] border border-[#DFDFD9]',
        pure:
          'bg-[#FFFFFF] text-[#1A2130] border border-[#DFDFD9]',
        dark:
          'bg-[#232C3F] text-[#F2F2EE] border border-[#F2F2EE]/11',
        gridCellLight:
          'bg-[#FAF9F6] text-[#1A2130] border-[#DFDFD9]',
        gridCellDark:
          'bg-[#1A2130] text-[#F2F2EE] border-[#F2F2EE]/11',
      },
      interactive: {
        true: 'hover:border-[#FA8112]/65 hover:bg-[#FFFFFF]',
        darkInteractive: 'hover:border-[#FDA63A]/60 hover:bg-[#283248]',
        false: '',
      },
      radius: {
        none: 'rounded-none',
        md: 'rounded-md',
        lg: 'rounded-lg',
      },
      padding: {
        none: 'p-0',
        sm: 'p-5',
        default: 'p-6 sm:p-8',
        lg: 'p-8 sm:p-10',
      },
    },
    defaultVariants: {
      surface: 'light',
      interactive: false,
      radius: 'lg',
      padding: 'default',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, surface, interactive, radius, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ surface, interactive, radius, padding, className }))}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-2', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'font-display text-xl font-semibold leading-snug tracking-[-0.015em]',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm leading-relaxed text-[#4A5365]', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-4', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center pt-6 mt-auto', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
};
