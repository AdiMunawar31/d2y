// ============================================================
// AboutSection — About snippet on home page
// ============================================================

import { D2YAvatar } from "@/components/ui";
import { ABOUT_DATA } from "@/data/home.data";
import SkillCard from "@/components/shared/SkillCard";

// ─── Sub-components ───────────────────────────────────────

function AboutCopy() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-black tracking-tight text-[var(--color-foreground)]">
        {ABOUT_DATA.title}
      </h2>

      {ABOUT_DATA.paragraphs.map((para, i) => (
        <p
          key={i}
          className={
            i === 0
              ? "text-xl leading-relaxed text-[var(--color-foreground)]/70 font-medium"
              : "text-[var(--color-muted-foreground)] leading-relaxed"
          }
        >
          {para}
        </p>
      ))}

      {/* Signature */}
      <div className="pt-4 italic font-medium text-[var(--color-foreground)] flex items-center gap-4">
        <D2YAvatar
          src={ABOUT_DATA.avatar.src}
          name={ABOUT_DATA.avatar.name}
          size="md"
          shape="circle"
          className="grayscale"
        />
        <span className="text-sm">{ABOUT_DATA.signature}</span>
      </div>
    </div>
  );
}

function SkillsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {ABOUT_DATA.skills.map((skill) => (
        <SkillCard
          key={skill.id}
          id={skill.id}
          title={skill.title}
          description={skill.description}
        />
      ))}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function AboutSection() {
  return (
    <section
      aria-label="About"
      className="border-t border-[var(--color-border)] py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <AboutCopy />
        <SkillsGrid />
      </div>
    </section>
  );
}
