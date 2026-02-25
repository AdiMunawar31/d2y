// ============================================================
// BackgroundSection — Education & Experience timeline sections
// Exports two named components from a single file (shared layout)
// ============================================================

import { EDUCATION, EXPERIENCE } from "@/data/about.data";
import SectionLayout from "@/components/shared/SectionLayout";
import TimelineItem from "@/components/shared/TimelineItem";

// ─── Education ────────────────────────────────────────────

export function EducationSection() {
  return (
    <SectionLayout label="Background">
      <div className="space-y-12">
        {EDUCATION.map((entry) => (
          <TimelineItem key={entry.id} {...entry} />
        ))}
      </div>
    </SectionLayout>
  );
}

// ─── Experience ───────────────────────────────────────────

export function ExperienceSection() {
  return (
    <SectionLayout label="Project Experience">
      <div className="space-y-12">
        {EXPERIENCE.map((entry) => (
          <TimelineItem key={entry.id} {...entry} />
        ))}
      </div>
    </SectionLayout>
  );
}
