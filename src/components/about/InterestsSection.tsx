// ============================================================
// InterestsSection — Interest tiles with Lucide icons
// ============================================================

import { INTERESTS } from "@/data/about.data";
import SectionLayout from "@/components/shared/SectionLayout";
import type { Interest } from "@/data/about.data";

// ─── Sub-components ───────────────────────────────────────

function InterestTile({ label, icon: Icon }: Omit<Interest, "id">) {
  return (
    <div className="group bg-[var(--color-surface)] p-8 rounded-sm hover:bg-[var(--color-foreground)] hover:text-[var(--color-background)] transition-all duration-300 cursor-default select-none">
      <Icon
        size={28}
        strokeWidth={1.5}
        className="mb-4 text-[var(--color-foreground)] group-hover:text-[var(--color-background)] transition-colors duration-300"
        aria-hidden="true"
      />
      <p className="text-xs font-bold uppercase tracking-widest leading-snug">
        {label}
      </p>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function InterestsSection() {
  return (
    <SectionLayout label="Interests">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {INTERESTS.map((interest) => (
          <InterestTile
            key={interest.id}
            label={interest.label}
            icon={interest.icon}
          />
        ))}
      </div>
    </SectionLayout>
  );
}
