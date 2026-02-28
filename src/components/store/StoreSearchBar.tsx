// ============================================================
// StoreSearchBar — Product search with live result count
// ============================================================

import { Search, X } from "lucide-react";
import { cn } from "@/utils";

interface StoreSearchBarProps {
  value: string;
  onChange: (q: string) => void;
  resultCount: number;
  totalCount: number;
}

export default function StoreSearchBar({
  value,
  onChange,
  resultCount,
  totalCount,
}: StoreSearchBarProps) {
  const isFiltered = value.length > 0;

  return (
    <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      {/* Input */}
      <div className="relative flex-1 max-w-sm">
        <Search
          size={15}
          strokeWidth={1.75}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search products..."
          className={cn(
            "w-full pl-9 pr-8 py-2.5 text-sm border bg-background text-foreground rounded",
            "placeholder:text-foreground/30 focus:outline-none transition-colors",
            isFiltered
              ? "border-foreground"
              : "border-border focus:border-foreground"
          )}
          aria-label="Search products"
        />
        {isFiltered && (
          <button
            onClick={() => onChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X size={14} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* Result count */}
      <p className="text-xs text-muted-foreground shrink-0">
        {isFiltered ? (
          <span>
            <span className="font-bold text-foreground">{resultCount}</span> of{" "}
            {totalCount} products
          </span>
        ) : (
          <span>
            <span className="font-bold text-foreground">{totalCount}</span>{" "}
            products
          </span>
        )}
      </p>
    </div>
  );
}
