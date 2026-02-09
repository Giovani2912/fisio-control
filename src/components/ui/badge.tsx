import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-0.5 text-[14px] font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary/10 text-primary dark:bg-primary/20',
        secondary:
          'border-transparent bg-muted text-muted-foreground dark:bg-muted/60',
        success:
          'border-transparent bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
        warning:
          'border-transparent bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
        destructive:
          'border-transparent bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300',
        outline:
          'border-border/60 bg-background/60 text-foreground dark:bg-background/40',
      },
      tone: {
        solid: '',
        subtle: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      tone: 'subtle',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, tone, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, tone }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

