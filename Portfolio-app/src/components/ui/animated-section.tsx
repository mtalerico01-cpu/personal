import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before animation starts (seconds). Default: 0. */
  delay?: number;
  /** Direction the element enters from. Default: "up". */
  direction?: Direction;
  /** Viewport margin before triggering. Default: "-80px". */
  margin?: string;
  /** Custom duration in seconds. Default: 0.6. */
  duration?: number;
}

function getVariants(direction: Direction): Variants {
  const offsets: Record<Direction, { x: number; y: number }> = {
    up:    { x: 0,   y: 28  },
    down:  { x: 0,   y: -28 },
    left:  { x: 28,  y: 0   },
    right: { x: -28, y: 0   },
    none:  { x: 0,   y: 0   },
  };

  const { x, y } = offsets[direction];

  return {
    hidden: { opacity: 0, x, y },
    visible: { opacity: 1, x: 0, y: 0 },
  };
}

/**
 * Wraps children in a Framer Motion div that animates into view once
 * the element enters the viewport. Fires only once per mount.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
  margin = "-80px",
  duration = 0.6,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: margin as `${number}px` });

  return (
    <motion.div
      ref={ref}
      variants={getVariants(direction)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: [0.22, 0.61, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
