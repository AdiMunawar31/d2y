// ============================================================
// ABOUT PAGE — Static data & content
// (Will be replaced by CMS data in production)
// ============================================================

import {
  Camera,
  Building2,
  Mountain,
  Coffee,
  BookOpen,
  Globe,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Hero ─────────────────────────────────────────────────

export const ABOUT_HERO = {
  eyebrow: "Introduction",
  headline: ["Product", "Designer", "&", "Strategist."],
  image: {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85",
    alt: "Professional portrait",
  },
} as const;

// ─── Narrative ────────────────────────────────────────────

export const NARRATIVE = {
  sectionLabel: "Professional Narrative",
  lead: "With over a decade of experience in the digital space, I specialize in crafting high-impact user experiences that bridge the gap between human needs and business goals.",
  columns: [
    "My journey began in architectural studies, which instilled a deep appreciation for structure, grid systems, and minimalist aesthetics. This foundation allows me to view digital interfaces not just as screens, but as living environments where users interact and achieve their objectives.",
    "Today, I lead design teams to solve complex problems through iterative prototyping and data-driven insights. I believe that good design is invisible—it should empower the user without drawing unnecessary attention to itself. My work focuses on clarity, accessibility, and emotional resonance.",
  ],
} as const;

// ─── Education ────────────────────────────────────────────

export interface TimelineEntry {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
}

export const EDUCATION: TimelineEntry[] = [
  {
    id: "mhci",
    title: "Masters in Human-Computer Interaction",
    subtitle: "Carnegie Mellon University",
    period: "2014 — 2016",
    description:
      "Focused on cognitive psychology and advanced prototyping methods for immersive environments.",
  },
  {
    id: "barch",
    title: "Bachelor of Architecture",
    subtitle: "Pratt Institute",
    period: "2009 — 2013",
    description:
      "Studied spatial design, formal theory, and computational design systems.",
  },
];

// ─── Experience ───────────────────────────────────────────

export const EXPERIENCE: TimelineEntry[] = [
  {
    id: "ecommerce",
    title: "Global E-commerce Overhaul",
    subtitle: "Lead Product Designer",
    period: "2022 — 2023",
    description:
      "Led the end-to-end redesign of a multi-billion dollar platform, focusing on checkout optimization and personalized discovery features. Achieved a 15% increase in conversion rates.",
  },
  {
    id: "fintech",
    title: "FinTech Dashboard Alpha",
    subtitle: "Design Strategist",
    period: "2021",
    description:
      "Defined the MVP strategy and visual language for a high-frequency trading dashboard. Conducted intensive user testing with professional traders to streamline complex data visualization.",
  },
];

// ─── Skills ───────────────────────────────────────────────

export interface SkillGroup {
  id: string;
  category: string;
  items: string[];
}

export const SKILLS: SkillGroup[] = [
  {
    id: "design",
    category: "Design",
    items: [
      "Product Strategy",
      "UI/UX Design",
      "Visual Identity",
      "User Research",
      "Design Systems",
    ],
  },
  {
    id: "technical",
    category: "Technical",
    items: [
      "React / Tailwind",
      "Rapid Prototyping",
      "Data Analysis",
      "Figma Expert",
      "A/B Testing",
    ],
  },
];

// ─── Interests ────────────────────────────────────────────

export interface Interest {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const INTERESTS: Interest[] = [
  { id: "photography", label: "Analog Photography", icon: Camera },
  { id: "brutalism", label: "Brutalist Design", icon: Building2 },
  { id: "hiking", label: "Alpine Hiking", icon: Mountain },
  { id: "coffee", label: "Specialty Coffee", icon: Coffee },
  { id: "philosophy", label: "Philosophy", icon: BookOpen },
  { id: "sustainability", label: "Sustainability", icon: Globe },
];
