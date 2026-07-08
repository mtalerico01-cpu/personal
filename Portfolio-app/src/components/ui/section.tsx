import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Section Wrapper ───────────────────────────────────────────────────────────

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Wraps content in a max-width container. Default: true. */
  contained?: boolean;
  /** Adds the bg-grid utility for the grid overlay. Default: false. */
  withGrid?: boolean;
  as?: React.ElementType;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      contained = true,
      withGrid = false,
      as: Tag = "section",
      children,
      ...props
    },
    ref
  ) => (
    <Tag
      ref={ref}
      className={cn(
        "relative py-20 lg:py-28",
        withGrid && "bg-grid",
        className
      )}
      {...props}
    >
      {contained ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </Tag>
  )
);
Section.displayName = "Section";

// ─── Section Header ────────────────────────────────────────────────────────────

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 lg:mb-16",
        align === "center" && "text-center mx-auto max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-muted-foreground text-lg leading-relaxed",
            align === "left" ? "max-w-2xl" : "",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export { Section, SectionHeader };
