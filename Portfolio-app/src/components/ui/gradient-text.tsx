import { cn } from "@/lib/utils";

type GradientVariant = "primary" | "accent" | "mixed" | "warm";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: GradientVariant;
  animated?: boolean;
}

const gradients: Record<GradientVariant, string> = {
  primary: "from-blue-400 to-cyan-400",
  accent:  "from-violet-400 to-purple-400",
  mixed:   "from-blue-400 via-violet-400 to-cyan-400",
  warm:    "from-orange-400 via-rose-400 to-violet-400",
};

/**
 * Renders children with an animated gradient fill.
 * Works on inline elements — wrap in a <span> or keep as children of a heading.
 */
export function GradientText({
  children,
  className,
  variant = "mixed",
  animated = true,
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r bg-clip-text text-transparent",
        gradients[variant],
        animated && "animate-gradient-x bg-[length:200%_auto]",
        className
      )}
    >
      {children}
    </span>
  );
}
