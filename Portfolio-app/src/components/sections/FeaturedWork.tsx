import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { featuredCaseStudies } from "@/data/case-studies";
import type { CaseStudy } from "@/types";
import { cn } from "@/lib/utils";

// ─── Individual Case Study Card ────────────────────────────────────────────────

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  const isComingSoon = study.status === "coming-soon";

  return (
    <AnimatedSection delay={index * 0.1} direction="up" className="h-full">
      <Card
        variant="interactive"
        className={cn(
          "h-full flex flex-col group",
          isComingSoon && "opacity-60 pointer-events-none"
        )}
      >
        <CardContent className="p-6 flex flex-col h-full gap-4">
          {/* ── Header row ─────────────────────────────────────── */}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5 flex-1">
              <p className="text-xs text-muted-foreground font-medium tracking-wide">
                {study.organization}
              </p>
              <Badge variant="outline" className="text-xs">
                {study.category}
              </Badge>
            </div>
            {study.impact && (
              <Badge variant="highlight" className="shrink-0 text-xs">
                {study.impact}
              </Badge>
            )}
          </div>

          {/* ── Title ──────────────────────────────────────────── */}
          <h3 className="text-lg font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
            {study.title}
          </h3>

          {/* ── Summary ────────────────────────────────────────── */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {study.summary}
          </p>

          {/* ── Tags ───────────────────────────────────────────── */}
          <div className="flex flex-wrap gap-1.5">
            {study.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-2xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border text-xs"
              >
                {tag}
              </span>
            ))}
            {study.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{study.tags.length - 3}
              </span>
            )}
          </div>

          {/* ── Footer link ────────────────────────────────────── */}
          <div className="pt-2 border-t border-border">
            {isComingSoon ? (
              <span className="text-xs text-muted-foreground">
                Coming soon
              </span>
            ) : (
              <Link
                to={`/case-studies/${study.slug}`}
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors group/link"
              >
                View Case Study
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}

// ─── Featured Work Section ─────────────────────────────────────────────────────

/**
 * Displays the four featured case studies in a 2×2 grid.
 * Links to the full case studies page for additional work.
 */
export function FeaturedWork() {
  return (
    <Section className="bg-background">
      <SectionHeader
        eyebrow="Featured Work"
        title="Enterprise Impact at Scale"
        description="Real business problems solved through strategy, analytics, and thoughtful product design. Each case study emphasizes decision-making over technology."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
        {featuredCaseStudies.map((study, index) => (
          <CaseStudyCard key={study.id} study={study} index={index} />
        ))}
      </div>

      <AnimatedSection direction="up" delay={0.4}>
        <div className="flex items-center justify-between border-t border-border pt-8">
          <p className="text-sm text-muted-foreground">
            Showing 4 of 8 case studies
          </p>
          <Button asChild variant="outline">
            <Link to="/case-studies" className="group">
              View All Work
              <ArrowRight
                size={16}
                className="ml-1.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Button>
        </div>
      </AnimatedSection>
    </Section>
  );
}
