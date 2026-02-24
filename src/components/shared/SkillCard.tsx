// ============================================================
// SkillCard — Skill/service highlight card
// ============================================================

import { Lightbulb, Code2, type LucideIcon } from "lucide-react";

// Map skill id → icon
const SKILL_ICONS: Record<string, LucideIcon> = {
  creative: Lightbulb,
  technical: Code2,
};

interface SkillCardProps {
  id: string;
  title: string;
  description: string;
}

export default function SkillCard({ id, title, description }: SkillCardProps) {
  const Icon = SKILL_ICONS[id] ?? Lightbulb;

  return (
    <div className="flex flex-col gap-6 p-10 bg-background border border-border rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-500">
      {/* Icon badge */}
      <div className="w-14 h-14 bg-surface rounded-2xl flex items-center justify-center shrink-0">
        <Icon
          size={26}
          strokeWidth={1.5}
          className="text-foreground"
          aria-hidden="true"
        />
      </div>

      <h4 className="text-xl font-black tracking-tight text-foreground">
        {title}
      </h4>

      <p className="text-sm text-muted-foreground leading-relaxed font-medium">
        {description}
      </p>
    </div>
  );
}
