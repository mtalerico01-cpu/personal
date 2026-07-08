export const siteConfig = {
  name: "Michael Talerico",
  shortName: "MT",
  title: "Analytics Product Builder",
  tagline: "Turning Data Into Intelligent Decisions",
  description:
    "Senior Data Analyst and analytics product builder specializing in product analytics, AI measurement, and analytics application development. Building modern software that helps business, product, and executive teams make better decisions.",
  url: "https://michaeltalerico.com",
  email: "hello@michaeltalerico.com",
  location: "Atlanta, GA",
  currentRole: "Senior Data Analyst",
  currentOrg: "The Home Depot",
  currentOrgUrl: "https://homedepot.com",
  social: {
    linkedin: "https://linkedin.com/in/michaeltalerico",
    github: "https://github.com/michaeltalerico",
  },
  openToWork: true,
  resumeUrl: "/resume.pdf",
} as const;

export type SiteConfig = typeof siteConfig;
