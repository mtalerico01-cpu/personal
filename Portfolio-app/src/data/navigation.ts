import type { NavLink } from "@/types";

export const navLinks: NavLink[] = [
  {
    label: "About",
    href: "/about",
    description: "Professional story and philosophy",
  },
  {
    label: "Work",
    href: "/case-studies",
    description: "Enterprise case studies and impact",
  },
  {
    label: "Projects",
    href: "/projects",
    description: "Technical projects and applications",
  },
  {
    label: "Skills",
    href: "/skills",
    description: "Capabilities and expertise",
  },
  {
    label: "Resume",
    href: "/resume",
    description: "Career timeline and experience",
  },
];

export const footerLinks = {
  navigation: navLinks,
  connect: [
    { label: "LinkedIn", href: "https://linkedin.com/in/michaeltalerico" },
    { label: "GitHub", href: "https://github.com/michaeltalerico" },
    { label: "Contact", href: "/contact" },
  ],
};
