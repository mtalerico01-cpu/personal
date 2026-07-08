import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { BarChart3, Code2, BrainCircuit, Users, Database, Cloud } from "lucide-react";

interface SkillItem {
  name: string;
  context?: string;
}

interface SkillCategory {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  skills: SkillItem[];
}

const categories: SkillCategory[] = [
  {
    icon: BarChart3,
    title: "Analytics & Business Intelligence",
    description:
      "Designing analytics products that help organizations make better decisions — from dashboard architecture to KPI governance.",
    color: "text-blue-400 bg-blue-400/10",
    skills: [
      { name: "Product Analytics", context: "KPI definition, funnel analysis, retention" },
      { name: "Executive Reporting", context: "OKR dashboards, leadership visibility" },
      { name: "Dashboard Design", context: "Visualization standards, design systems" },
      { name: "Tableau", context: "6+ years, Insight Global's first Tableau Developer" },
      { name: "Power BI", context: "Enterprise templates and governance" },
      { name: "SQL", context: "BigQuery, complex analysis queries" },
      { name: "Analytics Governance", context: "QA processes, documentation, training" },
    ],
  },
  {
    icon: Code2,
    title: "Software & Frontend Engineering",
    description:
      "Building modern analytics applications that go beyond traditional dashboards into interactive, data-driven software.",
    color: "text-violet-400 bg-violet-400/10",
    skills: [
      { name: "React", context: "Component-driven UIs, hooks, routing" },
      { name: "TypeScript", context: "Strongly typed, scalable codebases" },
      { name: "Vite", context: "Modern build tooling" },
      { name: "Tailwind CSS", context: "Design tokens, responsive systems" },
      { name: "Framer Motion", context: "Interaction design, animations" },
      { name: "Python", context: "Data analysis, backend services" },
      { name: "FastAPI", context: "REST API development" },
    ],
  },
  {
    icon: Database,
    title: "Data & Analytics Engineering",
    description:
      "Working across the data stack to ensure analytics is built on reliable, well-governed foundations.",
    color: "text-cyan-400 bg-cyan-400/10",
    skills: [
      { name: "BigQuery", context: "Enterprise data warehouse at The Home Depot" },
      { name: "dbt (Exposure)", context: "Analytics engineering collaboration" },
      { name: "Data Modeling", context: "Dimensional, semantic layer design" },
      { name: "ETL Collaboration", context: "Data engineering partnerships" },
      { name: "Data Governance", context: "Metric definitions, documentation" },
    ],
  },
  {
    icon: BrainCircuit,
    title: "AI & Measurement",
    description:
      "Designing measurement strategies for AI-enabled products and partnering with Data Science to operationalize models.",
    color: "text-green-400 bg-green-400/10",
    skills: [
      { name: "AI Product Measurement", context: "Non-stock quoting agent analytics" },
      { name: "Experimentation & A/B Testing", context: "Pilot design, significance" },
      { name: "Predictive Analytics", context: "$5M+ revenue impact pilot" },
      { name: "Transcript Analytics", context: "Conversation flow, topic analysis" },
      { name: "AI-Assisted Development", context: "Copilot, Claude, ChatGPT" },
      { name: "Model Evaluation", context: "Performance monitoring dashboards" },
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    description:
      "Deploying and managing analytics applications in cloud environments.",
    color: "text-sky-400 bg-sky-400/10",
    skills: [
      { name: "Microsoft Azure", context: "Preferred cloud platform" },
      { name: "Google Cloud Platform", context: "BigQuery, Data Studio" },
      { name: "Cloud Hosting", context: "Internal analytics app deployments" },
      { name: "GitHub", context: "Version control, collaboration" },
      { name: "Figma", context: "Design collaboration, prototyping" },
    ],
  },
  {
    icon: Users,
    title: "Strategy & Leadership",
    description:
      "Cross-functional leadership that bridges business strategy, analytics, design, and engineering.",
    color: "text-amber-400 bg-amber-400/10",
    skills: [
      { name: "Product Strategy", context: "Roadmapping, prioritization, stakeholders" },
      { name: "Cross-functional Leadership", context: "Product, UX, DS, Eng partnerships" },
      { name: "Executive Communication", context: "C-suite reporting and presentations" },
      { name: "UX Collaboration", context: "Design reviews, user research partnership" },
      { name: "Analytics Roadmapping", context: "Phased delivery, governance" },
      { name: "Consulting Management", context: "Third-party vendor oversight" },
    ],
  },
];

/**
 * Skills page shell — categorized capabilities with context.
 * Visual skill bars and proficiency indicators planned for Phase 2.
 */
export function SkillsPage() {
  return (
    <main className="pt-16" aria-label="Skills">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <Section withGrid className="pt-28 pb-20">
        <AnimatedSection>
          <Badge variant="outline" className="mb-6">Skills</Badge>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight mb-6 max-w-3xl">
            Capabilities Across{" "}
            <GradientText>the Full Stack</GradientText>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Analytics isn't one discipline. These skills represent a rare combination
            of business strategy, product thinking, design, and technical execution
            built across 6+ years of enterprise work.
          </p>
        </AnimatedSection>
      </Section>

      {/* ── Skill Categories ─────────────────────────────────────────── */}
      <Section>
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category, catIndex) => {
            const Icon = category.icon;
            return (
              <AnimatedSection key={category.title} delay={catIndex * 0.08} direction="up">
                <Card variant="default" className="h-full">
                  <CardContent className="p-6 flex flex-col gap-5 h-full">
                    {/* Category header */}
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${category.color}`}
                        aria-hidden="true"
                      >
                        <Icon size={22} />
                      </div>
                      <div>
                        <h2 className="font-semibold text-foreground leading-snug mb-1.5">
                          {category.title}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Skills list */}
                    <div className="space-y-2.5">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-start justify-between gap-3"
                        >
                          <span className="text-sm font-medium text-foreground shrink-0">
                            {skill.name}
                          </span>
                          {skill.context && (
                            <span className="text-xs text-muted-foreground text-right leading-snug">
                              {skill.context}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            );
          })}
        </div>
      </Section>

      {/* ── Philosophy note ──────────────────────────────────────────── */}
      <Section className="bg-card/30">
        <AnimatedSection direction="up" className="max-w-2xl">
          <SectionHeader
            eyebrow="Perspective"
            title="Tools Support the Mission"
          />
          <p className="text-muted-foreground leading-relaxed mb-4">
            Tableau, Power BI, SQL, Python, React, BigQuery, Figma, and
            AI-assisted development are tools that support a larger mission:
            helping organizations make better decisions through thoughtful
            analytics products.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The goal has never been mastery of a single technology. It has
            always been understanding how strategy, design, data, and engineering
            work together to solve real business problems.
          </p>
        </AnimatedSection>
      </Section>
    </main>
  );
}
