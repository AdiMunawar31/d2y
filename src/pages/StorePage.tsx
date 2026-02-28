// ============================================================
// StorePage — Store listing page
// Owns: activeCategory + activeSort state
// Single responsibility: state + composition, no UI logic
// ============================================================

import { useState } from "react";
import { StoreHeroSection, StoreSidebar, StoreGrid } from "@/components/store";
import type { SortOption } from "@/data/store.data";

export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSort, setActiveSort] = useState<SortOption>("newest");

  return (
    <main className="max-w-7xl mx-auto px-6 py-20 mb-16">
      <StoreHeroSection />

      <div className="flex flex-col md:flex-row gap-12">
        <StoreSidebar
          activeCategory={activeCategory}
          activeSort={activeSort}
          onCategoryChange={setActiveCategory}
          onSortChange={setActiveSort}
        />

        {/* Key forces StoreGrid to remount (reset search) on filter change */}
        <StoreGrid
          key={`${activeCategory}-${activeSort}`}
          activeCategory={activeCategory}
          activeSort={activeSort}
        />
      </div>
    </main>
  );
}
