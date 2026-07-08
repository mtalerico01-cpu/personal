import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { siteConfig } from "@/data/meta";

/**
 * Full-width CTA banner at the bottom of the homepage.
 * Encourages visitors to connect or continue exploring.
 */
export function CtaBanner() {
  return (
    <section
      className="relative py-28 overflow-hidden border-t border-border"
      aria-label="Call to action"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/8" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[80px]" />
        <div className="absolute inset-0 bg-grid opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up" className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">
            Ready to Connect
          </p>

          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5 text-balance">
            Let's Build{" "}
            <GradientText variant="mixed">Something Great</GradientText>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            Looking for an analytics leader who combines product thinking, technical
            execution, and business strategy? I'd love to talk.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="group">
              <Link to="/contact">
                <Mail size={18} className="mr-1.5" aria-hidden="true" />
                Get In Touch
                <ArrowRight
                  size={16}
                  className="ml-1.5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
              </a>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
