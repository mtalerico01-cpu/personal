import { AnimatedSection } from "@/components/ui/animated-section";
import { heroStats } from "@/data/case-studies";

/**
 * Horizontal stats bar beneath the hero.
 * Communicates scope and impact at a glance without deep reading.
 */
export function StatsBar() {
  return (
    <section
      className="relative border-y border-border bg-card/50 py-12"
      aria-label="Career highlights"
    >
      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {heroStats.map((stat, index) => (
            <AnimatedSection
              key={stat.label}
              delay={index * 0.08}
              direction="up"
              className="text-center md:text-left"
            >
              <div className="space-y-1">
                <p className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-foreground/80">
                  {stat.label}
                </p>
                {stat.description && (
                  <p className="text-xs text-muted-foreground leading-snug hidden sm:block">
                    {stat.description}
                  </p>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
