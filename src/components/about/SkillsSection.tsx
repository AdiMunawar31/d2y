// ============================================================
// SkillsSection — Skills matrix grouped by category
// ============================================================

import { SKILLS } from "@/data/about.data";
import SectionLayout from "@/components/shared/SectionLayout";
import type { SkillGroup } from "@/data/about.data";

// ─── Sub-components ───────────────────────────────────────

function SkillGroupBlock({ category, items }: Omit<SkillGroup, "id">) {
  return (
    <div className="space-y-6">
      {/* Category heading */}
      <h5 className="text-xs font-black uppercase tracking-widest text-[var(--color-muted-foreground)] border-b border-[var(--color-border)] pb-2">
        {category}
      </h5>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-x-6 gap-y-3">
        {items.map((skill) => (
          <span
            key={skill}
            className="text-sm font-bold uppercase tracking-widest text-[var(--color-foreground)]"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function SkillsSection() {
  return (
    <SectionLayout label="Expertise">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {SKILLS.map((group) => (
          <SkillGroupBlock
            key={group.id}
            category={group.category}
            items={group.items}
          />
        ))}
      </div>
    </SectionLayout>
  );
}
