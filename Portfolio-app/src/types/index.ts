// ─── Navigation ────────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

// ─── Case Studies ──────────────────────────────────────────────────────────────

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  organization: string;
  organizationRole: string;
  category: string;
  tags: string[];
  summary: string;
  impact?: string;
  featured: boolean;
  status: "published" | "coming-soon";
}

// ─── Skills ────────────────────────────────────────────────────────────────────

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level?: "expert" | "proficient" | "familiar";
  context?: string;
}

// ─── Stats ─────────────────────────────────────────────────────────────────────

export interface StatItem {
  value: string;
  label: string;
  description?: string;
}

// ─── Projects ──────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
  status: "live" | "in-progress" | "planned";
}

// ─── Career Timeline ───────────────────────────────────────────────────────────

export interface CareerEntry {
  id: string;
  period: string;
  organization: string;
  role: string;
  location?: string;
  description: string;
  highlights: string[];
  type: "work" | "education" | "entrepreneurship";
}
