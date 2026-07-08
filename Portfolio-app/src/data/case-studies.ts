import type { CaseStudy, StatItem } from "@/types";

export const caseStudies: CaseStudy[] = [
  {
    id: "dashboard-design-transformation",
    slug: "dashboard-design-transformation",
    title: "Dashboard Design Transformation",
    organization: "Insight Global",
    organizationRole: "Senior BI Developer",
    category: "Design Systems & BI",
    tags: ["Dashboard Design", "UX", "Design Systems", "Analytics Governance", "Business Intelligence"],
    summary:
      "Led a multi-year initiative to modernize enterprise analytics by establishing standardized dashboard templates, visualization standards, QA processes, Figma design systems, and a centralized analytics portal—creating a scalable framework for consistent, high-quality business intelligence.",
    featured: true,
    status: "published",
  },
  {
    id: "non-stock-quoting-agent",
    slug: "non-stock-quoting-agent-analytics",
    title: "Non-Stock Quoting Agent Analytics Platform",
    organization: "The Home Depot",
    organizationRole: "Senior Data Analyst",
    category: "AI Measurement & Analytics Applications",
    tags: ["Product Analytics", "AI Measurement", "Customer Experience", "Experimentation", "Analytics Applications"],
    summary:
      "Served as analytics lead for a B2B non-stock quoting AI agent embedded within Product Information Pages. Designed the measurement strategy and developed a cloud-hosted analytics application combining transcript analytics, customer behavior, conversation flow, and executive reporting.",
    featured: true,
    status: "published",
  },
  {
    id: "b2b-target-customer-placemat",
    slug: "b2b-target-customer-placemat",
    title: "B2B Target Customer Placemat",
    organization: "The Home Depot",
    organizationRole: "Senior Data Analyst",
    category: "Strategic Analytics & Product",
    tags: ["Product Analytics", "Customer Segmentation", "Strategic Analytics", "B2B", "KPI Frameworks"],
    summary:
      "Led delivery of a strategic analytics platform enabling Product, UX, Engineering, and B2B leadership to better understand The Home Depot's highest-value professional customers through validated enterprise data and an interactive decision-support dashboard.",
    featured: true,
    status: "published",
  },
  {
    id: "predictive-hiring-analytics",
    slug: "predictive-hiring-analytics-platform",
    title: "Predictive Hiring Analytics Platform",
    organization: "Insight Global",
    organizationRole: "Senior BI Developer",
    category: "Predictive Analytics",
    tags: ["Predictive Analytics", "Data Science", "Executive Reporting", "Product Thinking", "Revenue Impact"],
    summary:
      "Partnered with Data Science to operationalize a predictive model identifying high-quality job requisitions. Designed executive-facing measurement dashboards supporting a pilot that generated approximately $5 million in incremental revenue within one sales organization over eight weeks.",
    impact: "$5M+ Revenue Impact",
    featured: true,
    status: "published",
  },
  {
    id: "hd-supply-competitive-analysis",
    slug: "hd-supply-competitive-analysis",
    title: "HD Supply Competitive Analysis",
    organization: "The Home Depot",
    organizationRole: "Senior Data Analyst",
    category: "Strategic Analytics",
    tags: ["Competitive Intelligence", "Strategic Analytics", "Pricing", "Margin Analysis"],
    summary:
      "Led a strategic analysis evaluating pricing behavior, markdown patterns, and competitive overlap between The Home Depot and HD Supply—delivering executive insights that clarified competitive dynamics and identified opportunities to improve pricing strategy.",
    featured: false,
    status: "coming-soon",
  },
  {
    id: "executive-okr-reporting",
    slug: "executive-okr-reporting",
    title: "Executive OKR Reporting",
    organization: "The Home Depot",
    organizationRole: "Senior Data Analyst",
    category: "Executive Reporting",
    tags: ["Executive Reporting", "KPI Governance", "Product Measurement", "Decision Support"],
    summary:
      "Led executive KPI reporting across multiple Pro Product initiatives, establishing governance around metric definitions, targets, reporting cadence, and executive visibility to help leadership monitor strategic objectives.",
    featured: false,
    status: "coming-soon",
  },
  {
    id: "modern-analytics-web-applications",
    slug: "modern-analytics-web-applications",
    title: "Modern Analytics Web Applications",
    organization: "Personal Technical Development",
    organizationRole: "Independent",
    category: "Software Engineering",
    tags: ["React", "Python", "AI-Assisted Development", "Analytics Engineering"],
    summary:
      "Transitioned beyond traditional BI by building modern analytics web applications using React, Python, and cloud technologies—demonstrating a shift toward custom software experiences that provide greater flexibility than conventional dashboards.",
    featured: false,
    status: "published",
  },
  {
    id: "quickfix-delivery",
    slug: "quickfix-delivery",
    title: "QuickFix Delivery",
    organization: "QuickFix Delivery LLC",
    organizationRole: "Co-Founder",
    category: "Entrepreneurship",
    tags: ["Entrepreneurship", "Operations", "Customer Experience", "Business Strategy"],
    summary:
      "Co-founded and operated a local food delivery business while attending Troy University—launching, growing, and successfully selling the company after two years of operations, hiring delivery drivers, and building restaurant partnerships.",
    featured: false,
    status: "published",
  },
];

export const featuredCaseStudies = caseStudies.filter((cs) => cs.featured);

export const heroStats: StatItem[] = [
  {
    value: "6+",
    label: "Years in Analytics",
    description: "Building enterprise analytics products",
  },
  {
    value: "2",
    label: "Major Organizations",
    description: "Insight Global & The Home Depot",
  },
  {
    value: "$5M+",
    label: "Measured Impact",
    description: "Predictive analytics pilot revenue",
  },
  {
    value: "8",
    label: "Case Studies",
    description: "Cross-industry business impact",
  },
];
