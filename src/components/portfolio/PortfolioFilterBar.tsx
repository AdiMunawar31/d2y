// ============================================================
// PortfolioFilterBar — Sticky category filter tabs
// ============================================================

import { cn } from "@/utils";
import { PORTFOLIO_FILTERS } from "@/data/portfolio.data";
import type { PortfolioFilter } from "@/data/portfolio.data";

interface PortfolioFilterBarProps {
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

// ─── Sub-components ───────────────────────────────────────

function FilterButton({
  filter,
  isActive,
  onClick,
}: {
  filter: PortfolioFilter;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        "cursor-pointer flex h-10 items-center justify-center rounded px-5 text-xs font-bold uppercase tracking-widest transition-all duration-200",
        isActive
          ? "bg-foreground text-background"
          : "border border-border bg-transparent text-foreground/60 hover:border-foreground/40 hover:text-foreground"
      )}
    >
      {filter.label}
    </button>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function PortfolioFilterBar({
  activeFilter,
  onFilterChange,
}: PortfolioFilterBarProps) {
  return (
    <section
      aria-label="Filter projects"
      className="sticky top-16.25 z-40 bg-background/95 backdrop-blur-md border-y border-border px-6 py-4 md:px-10"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 md:gap-4">
        {PORTFOLIO_FILTERS.map((filter) => (
          <FilterButton
            key={filter.id}
            filter={filter}
            isActive={activeFilter === filter.id}
            onClick={() => onFilterChange(filter.id)}
          />
        ))}
      </div>
    </section>
  );
}
