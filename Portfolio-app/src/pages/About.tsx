import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import {
  Briefcase,
  GraduationCap,
  Rocket,
  Heart,
  Award,
} from "lucide-react";

interface TimelineEntry {
  period: string;
  org: string;
  role: string;
  type: "work" | "education" | "entrepreneurship";
  description: string;
}

const timeline: TimelineEntry[] = [
  {
    period: "2025 – Present",
    org: "The Home Depot",
    role: "Senior Data Analyst, CX Data Science & Analytics",
    type: "work",
    description:
      "Serving as analytics lead for Pro Product initiatives. Designing measurement frameworks for AI-enabled B2B products, delivering executive OKR reporting, and building cloud-hosted analytics applications.",
  },
  {
    period: "2022 – 2025",
    org: "Insight Global",
    role: "Senior BI Developer, Data Insights & Analytics",
    type: "work",
    description:
      "Insight Global's first Senior BI Developer. Led enterprise dashboard transformation, partnered with Data Science to operationalize predictive models, and helped mature the analytics organization from ~10 to 80+ professionals.",
  },
  {
    period: "2021 – 2022",
    org: "Insight Global",
    role: "Tableau Developer, Business Analytics",
    type: "work",
    description:
      "Insight Global's first Tableau Developer. Established dashboard design standards, visualization governance, QA processes, and training programs that scaled across the analytics organization.",
  },
  {
    period: "2019 – 2021",
    org: "Insight Global",
    role: "Sales Analyst",
    type: "work",
    description:
      "Transitioned from recruiting into analytics, supporting business intelligence, reporting, and data-driven decision making as the analytics function grew.",
  },
  {
    period: "2018 – 2019",
    org: "Insight Global",
    role: "IT Recruiter",
    type: "work",
    description:
      "Joined Insight Global in a recruiting and sales role. Quickly realized long-term interest aligned with solving business problems, which led to the intentional pivot into analytics.",
  },
  {
    period: "2016 – 2018",
    org: "QuickFix Delivery LLC",
    role: "Co-Founder & Owner",
    type: "entrepreneurship",
    description:
      "Co-founded a local food delivery business in Troy, Alabama while attending university. Hired drivers, managed operations, and built restaurant partnerships before successfully selling the company after graduation.",
  },
  {
    period: "2013 – 2018",
    org: "Troy University",
    role: "B.S.B.A. in Global Business & Marketing",
    type: "education",
    description:
      "Earned degree with honors. VP of the Marketing Club, 1st Place Undergraduate Research Showcase, Sorrell College of Business Student Excellence Award, Chancellor's List.",
  },
];

const typeIcons = {
  work: Briefcase,
  education: GraduationCap,
  entrepreneurship: Rocket,
};

const principles = [
  {
    title: "Solve Business Problems First",
    description: "Technology is never the objective. Business outcomes are. Every recommendation starts with understanding the problem.",
  },
  {
    title: "Design Is Part of the Product",
    description: "Design is not decoration. Every interface communicates professionalism, trust, and clarity.",
  },
  {
    title: "Simplicity Wins",
    description: "Complexity creates friction. Great products remove friction. Simplicity reduces cognitive load.",
  },
  {
    title: "Think in Systems",
    description: "Avoid solving isolated problems. The best solutions improve the overall system, not just one component.",
  },
];

/**
 * About page — career story, professional philosophy, and timeline.
 * Shell with structured content. Full visual treatment in Phase 2.
 */
export function About() {
  return (
    <main className="pt-16" aria-label="About Michael Talerico">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <Section withGrid className="pt-28 pb-20">
        <AnimatedSection>
          <Badge variant="outline" className="mb-6">About</Badge>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight mb-6 max-w-3xl">
            The Story Behind{" "}
            <GradientText>the Work</GradientText>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            A career built on intentional evolution — from entrepreneurship to
            sales to analytics to product analytics and modern software
            development. The consistent thread: solving real business problems.
          </p>
        </AnimatedSection>
      </Section>

      {/* ── Professional Summary ────────────────────────────────────── */}
      <Section className="bg-card/30">
        <AnimatedSection>
          <SectionHeader
            eyebrow="Professional Identity"
            title="More Than a Dashboard Developer"
          />
        </AnimatedSection>
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatedSection direction="left" delay={0.1}>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Michael Talerico is a Senior Data Analyst within The Home Depot's
              Customer Experience Data Science & Analytics organization, supporting
              the Pro Product business.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              His work spans Product Analytics, Customer Experience, Business
              Intelligence, Executive Reporting, AI Measurement, Experimentation,
              and analytics application development.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Unlike many analytics professionals, his greatest strength is not a
              specific technology — it's connecting business strategy with
              technical execution.
            </p>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.15}>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Throughout his career, Michael has partnered closely with Product
              Management, UX, Software Engineering, Data Science, Analytics
              Engineering, and Executive Leadership.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This broad exposure allows him to think beyond individual reports
              and design complete analytics solutions — products that help
              organizations make better decisions.
            </p>
          </AnimatedSection>
        </div>
      </Section>

      {/* ── Core Principles ─────────────────────────────────────────── */}
      <Section>
        <AnimatedSection>
          <SectionHeader
            eyebrow="Philosophy"
            title="Principles That Guide the Work"
            description="These values influence every product decision, design choice, and technical implementation."
          />
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 gap-4">
          {principles.map((principle, index) => (
            <AnimatedSection key={principle.title} delay={index * 0.08} direction="up">
              <Card variant="default" className="h-full">
                <CardContent className="p-6 flex gap-4">
                  <Heart
                    size={18}
                    className="text-primary mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* ── Career Timeline ──────────────────────────────────────────── */}
      <Section className="bg-card/30">
        <AnimatedSection>
          <SectionHeader
            eyebrow="Career"
            title="Professional Timeline"
            description="A chronological view of the professional journey that shaped Michael's approach to analytics and product development."
          />
        </AnimatedSection>

        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {timeline.map((entry, index) => {
              const Icon = typeIcons[entry.type];
              return (
                <AnimatedSection key={entry.period + entry.org} delay={index * 0.06} direction="left">
                  <div className="relative flex gap-8 md:gap-12 pl-14 md:pl-24">
                    {/* Icon */}
                    <div
                      className="absolute left-0 md:left-4 w-8 h-8 rounded-full border border-border bg-card flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Icon size={14} className="text-primary" />
                    </div>

                    <div className="flex-1 pb-2">
                      <p className="text-xs text-muted-foreground font-mono mb-1.5">
                        {entry.period}
                      </p>
                      <h3 className="font-semibold text-foreground mb-0.5">
                        {entry.role}
                      </h3>
                      <p className="text-sm text-primary mb-3">{entry.org}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {entry.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ── Awards ───────────────────────────────────────────────────── */}
      <Section>
        <AnimatedSection>
          <SectionHeader eyebrow="Recognition" title="Awards & Honors" />
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Sorrell College of Business Student Excellence Award",
            "First Place Undergraduate Research Showcase — Empirical Paper",
            "Troy University Chancellor's List (multiple semesters)",
            "Vice President, Troy University Marketing Club",
          ].map((award, index) => (
            <AnimatedSection key={award} delay={index * 0.07} direction="up">
              <Card variant="default">
                <CardContent className="p-5 flex items-start gap-3">
                  <Award size={16} className="text-amber-400 mt-0.5 shrink-0" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground leading-snug">{award}</p>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Section>
    </main>
  );
}
