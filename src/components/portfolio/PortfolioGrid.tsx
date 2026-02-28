// ============================================================
// PortfolioGrid — Filtered project grid
// ============================================================

import { useMemo } from "react";
import { PORTFOLIO_PROJECTS } from "@/data/portfolio.data";
import { D2YNoData } from "@/components/ui";
import PortfolioProjectCard from "./PortfolioProjectCard";

interface PortfolioGridProps {
  activeFilter: string;
}

export default function PortfolioGrid({ activeFilter }: PortfolioGridProps) {
  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? PORTFOLIO_PROJECTS
        : PORTFOLIO_PROJECTS.filter((p) => p.categoryId === activeFilter),
    [activeFilter]
  );

  return (
    <section
      aria-label="Project grid"
      className="mx-auto max-w-7xl px-6 py-12 md:px-10"
    >
      {filtered.length === 0 ? (
        <D2YNoData
          variant="search"
          size="md"
          title="No projects found"
          description="No projects match the selected filter."
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <div key={project.id} className="animate-fade-in">
              <PortfolioProjectCard project={project} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
