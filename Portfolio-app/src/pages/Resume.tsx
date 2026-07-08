import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Download, Printer, GraduationCap, Briefcase, Award } from "lucide-react";
import { siteConfig } from "@/data/meta";

const experience = [
  {
    period: "2025 – Present",
    org: "The Home Depot",
    role: "Senior Data Analyst, CX Data Science & Analytics",
    highlights: [
      "Analytics lead for AI-enabled B2B non-stock quoting agent (Product Information Pages)",
      "Designed measurement strategy across multiple pilot phases and experimentation cycles",
      "Built cloud-hosted internal analytics application with transcript, behavior, and executive reporting",
      "Led B2B Target Customer Placemat — strategic analytics for Pro Product leadership",
      "Delivered executive OKR reporting across multiple Pro Product initiatives",
    ],
  },
  {
    period: "2022 – 2025",
    org: "Insight Global",
    role: "Senior BI Developer, Data Insights & Analytics",
    highlights: [
      "Insight Global's first Senior Business Intelligence Developer",
      "Partnered with Data Science to operationalize predictive hiring model (~$5M pilot revenue impact)",
      "Led enterprise dashboard transformation — templates, standards, QA processes, Figma design systems",
      "Helped scale analytics org from ~10 to 80+ professionals over 6 years",
      "Established dashboard governance, visualization standards, and analytics training programs",
    ],
  },
  {
    period: "2021 – 2022",
    org: "Insight Global",
    role: "Tableau Developer, Business Analytics",
    highlights: [
      "Insight Global's first Tableau Developer",
      "Created enterprise Tableau design system and visualization standards",
      "Built centralized analytics portal and dashboard QA processes",
      "Partnered with UX, Data Science, Analytics Engineering, and QA",
    ],
  },
  {
    period: "2019 – 2021",
    org: "Insight Global",
    role: "Sales Analyst",
    highlights: [
      "Transitioned from recruiting into analytics during org's early growth phase",
      "Supported business intelligence, reporting, and data-driven decisions",
    ],
  },
  {
    period: "2018 – 2019",
    org: "Insight Global",
    role: "IT Recruiter",
    highlights: [
      "Talent acquisition and business development in IT staffing",
      "Identified long-term alignment with analytics — initiated career pivot",
    ],
  },
];

/**
 * Resume page — interactive career timeline with download and print options.
 * Full interactive visual and PDF generation planned for Phase 2.
 */
export function Resume() {
  return (
    <main className="pt-16" aria-label="Resume">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <Section withGrid className="pt-28 pb-16">
        <AnimatedSection>
          <Badge variant="outline" className="mb-6">Resume</Badge>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight mb-4">
                {siteConfig.name}
              </h1>
              <p className="text-xl text-primary font-medium mb-2">
                Senior Data Analyst & Analytics Product Builder
              </p>
              <p className="text-muted-foreground">
                {siteConfig.location} · {siteConfig.email}
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Button asChild variant="outline" size="sm">
                <a href="/resume.pdf" download>
                  <Download size={15} aria-hidden="true" />
                  PDF
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
              >
                <Printer size={15} aria-hidden="true" />
                Print
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      {/* ── Summary ────────────────────────────────────────────────── */}
      <Section className="bg-card/30 py-12">
        <AnimatedSection>
          <Card variant="featured">
            <CardContent className="p-6">
              <p className="text-foreground/90 leading-relaxed">
                Senior analytics professional specializing in Product Analytics, AI
                Measurement, Business Intelligence, and Analytics Application Development.
                Combines product thinking, design sensibility, and technical execution to
                build modern analytics products that help business, product, and executive
                teams make better decisions. 6+ years of enterprise analytics experience
                across staffing and retail industries.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>
      </Section>

      {/* ── Experience ─────────────────────────────────────────────── */}
      <Section>
        <AnimatedSection>
          <SectionHeader eyebrow="Experience" title="Work History" />
        </AnimatedSection>

        <div className="space-y-8">
          {experience.map((job, index) => (
            <AnimatedSection key={job.period + job.org} delay={index * 0.07} direction="up">
              <Card variant="default">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase size={14} className="text-primary" aria-hidden="true" />
                        <h2 className="font-semibold text-foreground">{job.role}</h2>
                      </div>
                      <p className="text-primary text-sm font-medium">{job.org}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 self-start font-mono text-xs">
                      {job.period}
                    </Badge>
                  </div>
                  <ul className="space-y-2">
                    {job.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-sm text-muted-foreground leading-relaxed flex gap-2.5"
                      >
                        <span className="text-primary mt-1.5 shrink-0">·</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* ── Education ──────────────────────────────────────────────── */}
      <Section className="bg-card/30">
        <AnimatedSection>
          <SectionHeader eyebrow="Education" title="Academic Background" />
        </AnimatedSection>

        <AnimatedSection delay={0.1} direction="up">
          <Card variant="default">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <GraduationCap size={20} className="text-primary mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <h2 className="font-semibold text-foreground mb-1">
                    Troy University — Sorrell College of Business
                  </h2>
                  <p className="text-primary text-sm font-medium mb-1">
                    B.S.B.A., Global Business & Marketing
                  </p>
                  <p className="text-xs text-muted-foreground font-mono mb-4">2013 – 2018</p>
                  <ul className="space-y-1.5">
                    {[
                      "Sorrell College of Business Student Excellence Award in Marketing",
                      "First Place Undergraduate Research Showcase — Empirical Paper",
                      "Troy University Chancellor's List (multiple semesters)",
                      "Vice President, Troy University Marketing Club",
                    ].map((award) => (
                      <li key={award} className="text-sm text-muted-foreground flex gap-2">
                        <Award size={13} className="text-amber-400 mt-0.5 shrink-0" aria-hidden="true" />
                        {award}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      </Section>

      {/* ── Skills Summary ─────────────────────────────────────────── */}
      <Section>
        <AnimatedSection>
          <SectionHeader eyebrow="Skills" title="Core Competencies" />
        </AnimatedSection>

        <AnimatedSection delay={0.1} direction="up">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { category: "Analytics Tools", items: "Tableau · Power BI · BigQuery · SQL · Looker" },
              { category: "Development", items: "React · TypeScript · Python · FastAPI · Vite" },
              { category: "Cloud & Data", items: "Azure · GCP · GitHub · dbt (exposure)" },
              { category: "Design", items: "Figma · Tailwind CSS · Design Systems · UX" },
              { category: "AI & ML", items: "AI Measurement · Experimentation · Predictive Analytics" },
              { category: "Leadership", items: "Product Strategy · Executive Reporting · Cross-functional Teams" },
            ].map(({ category, items }) => (
              <div key={category} className="p-4 rounded-xl border border-border bg-card">
                <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                  {category}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{items}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Section>
    </main>
  );
}
