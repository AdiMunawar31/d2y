// ============================================================
// StoreGrid — Filtered, sorted, searched product grid
// ============================================================

import { useState, useMemo } from "react";
import { D2YNoData } from "@/components/ui";
import { STORE_PRODUCTS } from "@/data/store.data";
import type { SortOption } from "@/data/store.data";
import StoreProductCard from "./StoreProductCard";
import StoreSearchBar from "./StoreSearchBar";

interface StoreGridProps {
  activeCategory: string;
  activeSort: SortOption;
}

const PAGE_SIZE = 6;

export default function StoreGrid({
  activeCategory,
  activeSort,
}: StoreGridProps) {
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // 1. Filter by category
  const byCat = useMemo(
    () =>
      activeCategory === "all"
        ? STORE_PRODUCTS
        : STORE_PRODUCTS.filter((p) => p.categoryId === activeCategory),
    [activeCategory]
  );

  // 2. Filter by search query
  const searched = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return byCat;
    return byCat.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q)
    );
  }, [byCat, query]);

  // 3. Sort
  const sorted = useMemo(() => {
    const arr = [...searched];
    if (activeSort === "price-asc") arr.sort((a, b) => a.price - b.price);
    if (activeSort === "price-desc") arr.sort((a, b) => b.price - a.price);
    // 'newest' = default order (id ascending)
    return arr;
  }, [searched, activeSort]);

  // Reset visible count when filters change
  const visibleProducts = sorted.slice(0, visibleCount);
  const hasMore = visibleCount < sorted.length;

  function handleCategoryOrSortChange() {
    setVisibleCount(PAGE_SIZE);
  }

  // Sync reset when parent filters change (via key trick in parent)
  return (
    <div className="flex-1" onChange={handleCategoryOrSortChange}>
      {/* Search bar */}
      <StoreSearchBar
        value={query}
        onChange={(q) => {
          setQuery(q);
          setVisibleCount(PAGE_SIZE);
        }}
        resultCount={sorted.length}
        totalCount={byCat.length}
      />

      {/* Empty state */}
      {sorted.length === 0 && (
        <D2YNoData
          variant="search"
          size="md"
          title="No products found"
          description={
            query
              ? `No products match "${query}". Try a different search.`
              : "No products in this category yet."
          }
          action={
            query
              ? { label: "Clear search", onClick: () => setQuery("") }
              : undefined
          }
        />
      )}

      {/* Grid */}
      {sorted.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {visibleProducts.map((product) => (
              <div key={product.id} className="animate-fade-in">
                <StoreProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="mt-20 flex justify-center">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                className="text-xs font-bold uppercase tracking-[0.3em] py-4 px-12 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Load More Products
              </button>
            </div>
          )}

          {/* End of results */}
          {!hasMore && sorted.length > PAGE_SIZE && (
            <p className="mt-16 text-center text-xs text-muted-foreground uppercase tracking-widest">
              All {sorted.length} products shown
            </p>
          )}
        </>
      )}
    </div>
  );
}
