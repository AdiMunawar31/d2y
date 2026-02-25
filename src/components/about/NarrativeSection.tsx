// ============================================================
// NarrativeSection — Professional bio with lead text + columns
// ============================================================

import { NARRATIVE } from "@/data/about.data";
import SectionLayout from "@/components/shared/SectionLayout";

// ─── Sub-components ───────────────────────────────────────

function NarrativeLead() {
  return (
    <p className="text-2xl md:text-3xl font-medium leading-tight text-[var(--color-foreground)]/80">
      {NARRATIVE.lead}
    </p>
  );
}

function NarrativeColumns() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base leading-relaxed text-[var(--color-muted-foreground)]">
      {NARRATIVE.columns.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function NarrativeSection() {
  return (
    <SectionLayout label={NARRATIVE.sectionLabel}>
      <div className="space-y-8">
        <NarrativeLead />
        <NarrativeColumns />
      </div>
    </SectionLayout>
  );
}
