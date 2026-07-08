import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";

/**
 * 404 Not Found page.
 */
export function NotFound() {
  return (
    <main className="pt-16" aria-label="Page not found">
      <Section withGrid className="min-h-[80vh] flex items-center">
        <AnimatedSection
          direction="up"
          className="text-center mx-auto max-w-md"
        >
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-8">
            <AlertTriangle size={28} className="text-destructive" aria-hidden="true" />
          </div>

          <p className="text-sm font-mono text-muted-foreground mb-4">404</p>

          <h1 className="text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-8">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link to="/">
                <ArrowLeft size={16} className="mr-1.5" aria-hidden="true" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/case-studies">View My Work</Link>
            </Button>
          </div>
        </AnimatedSection>
      </Section>
    </main>
  );
}
