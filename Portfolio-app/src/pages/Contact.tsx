import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { GradientText } from "@/components/ui/gradient-text";
import { Mail, Linkedin, MapPin, Clock } from "lucide-react";
import { siteConfig } from "@/data/meta";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    description: "Best for detailed inquiries",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/michaeltalerico",
    href: siteConfig.social.linkedin,
    description: "Professional network & profile",
    external: true,
  },
  {
    icon: MapPin,
    label: "Location",
    value: siteConfig.location,
    href: undefined,
    description: "Open to remote opportunities",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 48 hours",
    href: undefined,
    description: "Typical response window",
  },
];

/**
 * Contact page shell — contact methods and outreach context.
 * Full contact form with backend integration planned for Phase 2.
 */
export function Contact() {
  return (
    <main className="pt-16" aria-label="Contact">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <Section withGrid className="pt-28 pb-20">
        <AnimatedSection>
          <Badge variant="outline" className="mb-6">Contact</Badge>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight mb-6 max-w-3xl">
            Let's Build Something{" "}
            <GradientText>Together</GradientText>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Looking for an analytics leader who combines product thinking,
            technical execution, and business strategy? Let's connect.
          </p>
        </AnimatedSection>
      </Section>

      {/* ── Contact Grid ─────────────────────────────────────────────── */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — Context */}
          <AnimatedSection direction="left">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Who Should Reach Out
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  This portfolio is primarily aimed at <strong className="text-foreground">hiring managers,
                  directors, and analytics leaders</strong> looking for senior
                  individual contributors in Product Analytics, Analytics Engineering,
                  or AI-enabled analytics software development.
                </p>
                <p>
                  If you're building a modern analytics organization and need someone
                  who can bridge strategy, design, and technical execution — Michael
                  would love to hear about it.
                </p>
                <p>
                  Potential collaborators and professional peers are also welcome
                  to connect.
                </p>
              </div>

              {/* Contact methods */}
              <div className="space-y-3 pt-2">
                {contactMethods.map(({ icon: Icon, label, value, href, description, external }) => (
                  <div key={label} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card/50">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-foreground">{value}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right — Form placeholder */}
          <AnimatedSection direction="right" delay={0.1}>
            <Card variant="default" className="h-full">
              <CardContent className="p-8 flex flex-col items-center justify-center text-center gap-6 min-h-[420px]">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Mail size={28} className="text-primary" aria-hidden="true" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">
                    Contact Form Coming Soon
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                    A full contact form with backend integration is planned for Phase 2.
                    In the meantime, reach out directly via email or LinkedIn.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                  <Button asChild className="flex-1">
                    <a href={`mailto:${siteConfig.email}`}>
                      <Mail size={15} className="mr-1.5" aria-hidden="true" />
                      Send Email
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <a
                      href={siteConfig.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </Section>
    </main>
  );
}
