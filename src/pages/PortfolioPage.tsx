// ============================================================
// PortfolioPage — Portfolio listing with filter state
// State lives here so FilterBar & Grid stay stateless/reusable
// ============================================================

import { useState } from "react";
import {
  PortfolioHeroSection,
  PortfolioFilterBar,
  PortfolioGrid,
  PortfolioCTASection,
} from "@/components/portfolio";

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <main className="flex-1">
      <PortfolioHeroSection />
      <PortfolioFilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <PortfolioGrid activeFilter={activeFilter} />
      <PortfolioCTASection />
    </main>
  );
}
