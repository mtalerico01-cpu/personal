import { Link } from "react-router-dom";
import { ArrowUpRight, Building2 } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { caseStudies } from "@/data/case-studies";
import { cn } from "@/lib/utils";

/**
 * Case Studies index page — searchable/filterable list of all case studies.
 * Search and filter functionality to be implemented in Phase 3.
 */
export function CaseStudies() {
  const featured = caseStudies.filter((cs) => cs.featured);
  const supporting = caseStudies.filter((cs) => !cs.featured);

  return (
    <main className="pt-16" aria-label="Case Studies">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <Section withGrid className="pt-28 pb-20">
        <AnimatedSection>
          <Badge variant="outline" className="mb-6">Case Studies</Badge>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight mb-6 max-w-3xl">
            Enterprise Impact{" "}
            <GradientText>at Scale</GradientText>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Real business problems solved through strategy, analytics, and
            product thinking. Each case study emphasizes decision-making, collaboration,
            and measurable business impact — not just technology.
          </p>
        </AnimatedSection>
      </Section>

      {/* ── Featured Case Studies ────────────────────────────────────── */}
      <Section className="bg-card/30">
        <AnimatedSection>
          <SectionHeader
            eyebrow="Featured"
            title="Highlighted Work"
            description="The four case studies that best represent Michael's approach to analytics product development."
          />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-5">
          {featured.map((study, index) => (
            <AnimatedSection key={study.id} delay={index * 0.09} direction="up">
              <Card variant="interactive" className="h-full group">
                <CardContent className="p-6 flex flex-col gap-4 h-full">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Building2 size={12} aria-hidden="true" />
                    {study.organization}
                  </div>

                  {study.impact && (
                    <Badge variant="highlight" className="self-start text-xs">
                      {study.impact}
                    </Badge>
                  )}

                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                      {study.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {study.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-border">
                    {study.status === "published" ? (
                      <Link
                        to={`/case-studies/${study.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors group/link"
                      >
                        Read Case Study
                        <ArrowUpRight
                          size={14}
                          className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    ) : (
                      <span className="text-xs text-muted-foreground">Coming soon</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* ── Supporting Case Studies ─────────────────────────────────── */}
      <Section>
        <AnimatedSection>
          <SectionHeader eyebrow="Additional Work" title="Supporting Case Studies" />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {supporting.map((study, index) => (
            <AnimatedSection key={study.id} delay={index * 0.07} direction="up">
              <Card
                variant="default"
                className={cn(
                  "h-full group hover:border-primary/20 transition-colors duration-200",
                  study.status === "coming-soon" && "opacity-50"
                )}
              >
                <CardContent className="p-5 flex flex-col gap-3 h-full">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground">{study.organization}</p>
                    {study.status === "coming-soon" && (
                      <Badge variant="secondary" className="text-xs">Soon</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-2">
                    {study.summary}
                  </p>
                  <Badge variant="outline" className="self-start text-xs">
                    {study.category}
                  </Badge>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Section>
    </main>
  );
}
