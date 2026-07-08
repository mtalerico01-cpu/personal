import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
        secondary:
          "bg-secondary text-secondary-foreground border-border hover:bg-secondary/80",
        outline:
          "bg-transparent text-muted-foreground border-border hover:border-primary/30 hover:text-foreground",
        accent:
          "bg-accent/10 text-accent border-accent/20 hover:bg-accent/20",
        highlight:
          "bg-highlight/10 text-highlight border-highlight/20",
        success:
          "bg-green-500/10 text-green-400 border-green-500/20",
        warning:
          "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        destructive:
          "bg-destructive/10 text-destructive border-destructive/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
