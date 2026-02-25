// ============================================================
// TimelineItem — Left-bordered timeline entry with dot
// Used in Education, Experience, and similar sections
// ============================================================

import { cn } from "@/utils";
import type { TimelineEntry } from "@/data/about.data";

interface TimelineItemProps extends TimelineEntry {
  className?: string;
}

export default function TimelineItem({
  title,
  subtitle,
  period,
  description,
  className,
}: TimelineItemProps) {
  return (
    <div
      className={cn(
        "group relative pl-8 border-l-2 border-[var(--color-border)] hover:border-[var(--color-foreground)] transition-colors duration-300",
        className
      )}
    >
      {/* Dot indicator */}
      <span
        className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-[var(--color-foreground)] rounded-full"
        aria-hidden="true"
      />

      {/* Header row */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2 gap-1">
        <h4 className="text-xl font-bold uppercase tracking-tight text-[var(--color-foreground)] leading-tight">
          {title}
        </h4>
        <span className="text-xs font-bold text-[var(--color-muted-foreground)] uppercase tracking-widest shrink-0">
          {period}
        </span>
      </div>

      {/* Subtitle */}
      <p className="text-sm font-medium uppercase tracking-tight text-[var(--color-foreground)]/70 mb-4">
        {subtitle}
      </p>

      {/* Description */}
      <p className="text-[var(--color-muted-foreground)] leading-relaxed max-w-xl">
        {description}
      </p>
    </div>
  );
}
