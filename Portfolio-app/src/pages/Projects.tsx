import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { ExternalLink, GitBranch, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Project {
  title: string;
  description: string;
  tags: string[];
  status: "live" | "in-progress" | "planned";
  href?: string;
  highlight?: string;
}

const projects: Project[] = [
  {
    title: "Analytics Portfolio Application",
    description:
      "This portfolio — built as a modern analytics product demonstrating React, TypeScript, Vite, Framer Motion, and Tailwind CSS. The application itself is a case study in product thinking, design systems, and modern frontend development.",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
    status: "in-progress",
    highlight: "You're looking at it",
  },
  {
    title: "Analytics Web Applications (Personal)",
    description:
      "A collection of internal analytics applications built with React and Python/FastAPI, demonstrating a shift beyond traditional BI dashboards into custom software experiences with richer decision-support capabilities.",
    tags: ["React", "Python", "FastAPI", "REST API", "Analytics Engineering"],
    status: "in-progress",
  },
  {
    title: "Form Theory (Concept)",
    description:
      "A personal project exploring modern form and survey design as a software product — combining clean UX, analytics instrumentation, and responsive design.",
    tags: ["Product Design", "UX", "Analytics"],
    status: "planned",
  },
];

const statusConfig = {
  live: { label: "Live", variant: "success" as const, icon: ExternalLink },
  "in-progress": { label: "In Progress", variant: "warning" as const, icon: GitBranch },
  planned: { label: "Planned", variant: "secondary" as const, icon: Clock },
};

/**
 * Projects page shell — technical project highlights.
 * Full content and live demos in Phase 4.
 */
export function Projects() {
  return (
    <main className="pt-16" aria-label="Projects">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <Section withGrid className="pt-28 pb-20">
        <AnimatedSection>
          <Badge variant="outline" className="mb-6">Projects</Badge>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight mb-6 max-w-3xl">
            Technical Work &{" "}
            <GradientText>Personal Projects</GradientText>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Exploring what's possible beyond traditional BI — modern analytics
            applications, open-source tools, and software experiments that
            demonstrate the future of analytics products.
          </p>
        </AnimatedSection>
      </Section>

      {/* ── Projects Grid ────────────────────────────────────────────── */}
      <Section>
        <AnimatedSection>
          <SectionHeader eyebrow="Work" title="Current Projects" />
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => {
            const { label, variant, icon: Icon } = statusConfig[project.status];
            return (
              <AnimatedSection key={project.title} delay={index * 0.09} direction="up">
                <Card
                  variant={project.highlight ? "featured" : "default"}
                  className="h-full flex flex-col group hover:border-primary/25 transition-colors duration-200"
                >
                  <CardContent className="p-6 flex flex-col gap-4 h-full">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant={variant} className="text-xs">
                        <Icon size={10} aria-hidden="true" />
                        {label}
                      </Badge>
                      {project.highlight && (
                        <span className="text-xs text-primary/70 font-medium">
                          {project.highlight}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 space-y-3">
                      <h2 className="font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {project.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.href && (
                      <div className="pt-2 border-t border-border">
                        <Button asChild variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary/80">
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn("inline-flex items-center gap-1.5 text-sm font-medium")}
                          >
                            View Project
                            <ExternalLink size={13} aria-hidden="true" />
                          </a>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </Section>

      {/* ── Coming Soon ──────────────────────────────────────────────── */}
      <Section className="bg-card/30">
        <AnimatedSection direction="up" className="text-center max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            More Coming Soon
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Live analytics demos, interactive architecture diagrams, and
            open-source tools are planned for Phase 4 of the portfolio roadmap.
          </p>
        </AnimatedSection>
      </Section>
    </main>
  );
}
