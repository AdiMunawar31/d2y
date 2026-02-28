// ============================================================
// PortfolioDetailMeta — Sidebar: project meta + tech stack
// ============================================================

import type { ProjectDetail } from "@/data/portfolio.data";

interface PortfolioDetailMetaProps {
  project: ProjectDetail;
}

// ─── Sub-components ───────────────────────────────────────

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border pb-4">
      <span className="block text-xs uppercase tracking-widest text-foreground/40 mb-1">
        {label}
      </span>
      <span className="text-lg font-medium text-foreground">{value}</span>
    </div>
  );
}

function TechStackBadge({
  label,
  featured,
}: {
  label: string;
  featured?: boolean;
}) {
  return (
    <span
      className={
        featured
          ? "px-3 py-1 bg-foreground text-background text-xs font-semibold rounded"
          : "px-3 py-1 bg-foreground/10 text-foreground text-xs font-semibold rounded"
      }
    >
      {label}
    </span>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function PortfolioDetailMeta({
  project,
}: PortfolioDetailMetaProps) {
  return (
    <aside className="lg:col-span-4 space-y-10">
      <div className="space-y-6">
        {project.meta.map((item) => (
          <MetaItem key={item.label} label={item.label} value={item.value} />
        ))}
      </div>

      <div>
        <span className="block text-xs uppercase tracking-widest text-foreground/40 mb-4">
          Technical Stack
        </span>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <TechStackBadge
              key={tech.label}
              label={tech.label}
              featured={tech.featured}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
