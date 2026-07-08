import { Link } from "react-router-dom";
import { BarChart3, Code2, BrainCircuit, Users } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ArrowRight } from "lucide-react";

interface SkillGroup {
  icon: React.ElementType;
  title: string;
  description: string;
  items: string[];
  color: string;
}

const skillGroups: SkillGroup[] = [
  {
    icon: BarChart3,
    title: "Analytics & BI",
    description: "Translating data into decisions for product and executive stakeholders.",
    items: ["Product Analytics", "Executive Reporting", "Dashboard Design", "KPI Frameworks", "Tableau", "Power BI", "SQL", "BigQuery"],
    color: "text-blue-400",
  },
  {
    icon: Code2,
    title: "Software & Engineering",
    description: "Building modern analytics applications that go beyond dashboards.",
    items: ["React", "TypeScript", "Python", "FastAPI", "Vite", "Tailwind CSS", "Cloud Hosting", "REST APIs"],
    color: "text-violet-400",
  },
  {
    icon: BrainCircuit,
    title: "AI & Data Science",
    description: "Measuring AI product performance and partnering with data science teams.",
    items: ["AI Measurement", "Experimentation", "Predictive Analytics", "AI-Assisted Development", "Transcript Analytics", "Model Evaluation"],
    color: "text-cyan-400",
  },
  {
    icon: Users,
    title: "Strategy & Leadership",
    description: "Cross-functional leadership across product, engineering, UX, and analytics.",
    items: ["Product Strategy", "Analytics Governance", "Design Systems", "Executive Communication", "Cross-functional Leadership", "Roadmapping"],
    color: "text-amber-400",
  },
];

/**
 * Capability preview on the homepage — four skill pillars at a glance.
 * Links to the full skills page for deeper context.
 */
export function SkillsPreview() {
  return (
    <Section className="bg-card/30">
      <SectionHeader
        eyebrow="Capabilities"
        title="Analytics Across the Full Stack"
        description="From strategy and measurement to software development — a rare combination of business thinking and technical execution."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {skillGroups.map((group, index) => {
          const Icon = group.icon;
          return (
            <AnimatedSection key={group.title} delay={index * 0.09} direction="up">
              <Card variant="default" className="h-full group hover:border-primary/20 transition-colors duration-200">
                <CardContent className="p-6 flex flex-col gap-4 h-full">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-lg bg-secondary flex items-center justify-center ${group.color} transition-transform group-hover:scale-110 duration-200`}
                    aria-hidden="true"
                  >
                    <Icon size={20} />
                  </div>

                  {/* Content */}
                  <div className="space-y-2 flex-1">
                    <h3 className="font-semibold text-foreground">{group.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {group.description}
                    </p>
                  </div>

                  {/* Skill pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.slice(0, 4).map((item) => (
                      <span
                        key={item}
                        className="text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border"
                      >
                        {item}
                      </span>
                    ))}
                    {group.items.length > 4 && (
                      <span className="text-xs text-muted-foreground self-center">
                        +{group.items.length - 4} more
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          );
        })}
      </div>

      <AnimatedSection direction="up" delay={0.4}>
        <div className="text-center">
          <Button asChild variant="outline">
            <Link to="/skills" className="group">
              View All Skills
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
