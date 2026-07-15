import { Link } from "react-router-dom";
import { Linkedin, Github, ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/data/meta";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

const socialLinks = [
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: siteConfig.social.github,
    icon: Github,
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
];

/**
 * Site-wide footer.
 * - Logo + tagline on the left.
 * - Navigation and social links in columns.
 * - Copyright bar at the bottom.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "relative border-t border-border",
        "bg-gradient-to-b from-background to-card"
      )}
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">

          {/* ── Brand Column ────────────────────────────────────── */}
          <div className="md:col-span-1">
            <Link
              to="/"
              className="inline-flex items-center gap-3 mb-4 group"
              aria-label="Home"
            >
              <span className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm ring-2 ring-transparent group-hover:ring-primary/30 transition-all">
                MT
              </span>
              <span className="font-semibold text-foreground">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Senior Data Analyst & Analytics Product Builder.
              Turning data into intelligent decisions for enterprise teams.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center",
                    "text-muted-foreground hover:text-foreground",
                    "bg-secondary hover:bg-secondary/80 border border-border hover:border-primary/30",
                    "transition-all duration-200"
                  )}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Navigation Column ───────────────────────────────── */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Connect Column ───────────────────────────────────── */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Connect
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Get In Touch
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  LinkedIn
                  <ArrowUpRight size={12} className="opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  GitHub
                  <ArrowUpRight size={12} className="opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  View Resume
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Copyright Bar ─────────────────────────────────────── */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
