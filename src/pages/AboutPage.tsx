// ============================================================
// AboutPage — Orchestrates all about page sections
// Single responsibility: composition only, no UI logic here
// ============================================================

import {
  AboutHeroSection,
  NarrativeSection,
  EducationSection,
  ExperienceSection,
  SkillsSection,
  InterestsSection,
} from "@/components/about";

export default function AboutPage() {
  return (
    <div className="flex-1 max-w-7xl mx-auto px-6 md:px-16 w-full py-16 lg:py-24">
      <AboutHeroSection />
      <NarrativeSection />
      <EducationSection />
      <ExperienceSection />
      <SkillsSection />
      <InterestsSection />
    </div>
  );
}
