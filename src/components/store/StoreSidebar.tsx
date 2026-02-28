// ============================================================
// StoreSidebar — Category filter, sort options, newsletter
// ============================================================

import { useState } from "react";
import { cn } from "@/utils";
import { useToast } from "@/components/ui";
import {
  STORE_CATEGORIES,
  SORT_OPTIONS,
  STORE_NEWSLETTER,
  type SortOption,
} from "@/data/store.data";

interface StoreSidebarProps {
  activeCategory: string;
  activeSort: SortOption;
  onCategoryChange: (id: string) => void;
  onSortChange: (sort: SortOption) => void;
}

// ─── Sub-components ───────────────────────────────────────

function CategoryList({
  activeCategory,
  onChange,
}: {
  activeCategory: string;
  onChange: (id: string) => void;
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-foreground/50">
        Categories
      </h3>
      <ul className="space-y-4 text-sm font-medium">
        {STORE_CATEGORIES.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => onChange(cat.id)}
              className={cn(
                "w-full flex items-center justify-between transition-colors",
                cat.id === activeCategory
                  ? "text-foreground font-bold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] text-foreground/30">
                {cat.count}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SortGroup({
  activeSort,
  onChange,
}: {
  activeSort: SortOption;
  onChange: (s: SortOption) => void;
}) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-foreground/50">
        Sort By
      </h3>
      <div className="space-y-3">
        {SORT_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <input
              type="radio"
              name="sort"
              checked={activeSort === opt.value}
              onChange={() => onChange(opt.value)}
              className="w-4 h-4 rounded-none accent-foreground cursor-pointer"
            />
            <span className="text-sm text-foreground">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function SidebarNewsletter() {
  const [email, setEmail] = useState("");
  const { success, error } = useToast();

  function handleSubscribe() {
    if (!email.includes("@")) {
      error("Please enter a valid email.");
      return;
    }
    success("You're on the early access list!");
    setEmail("");
  }

  return (
    <div className="pt-10 border-t border-border">
      <div className="bg-foreground p-6 rounded text-background">
        <h4 className="text-sm font-bold uppercase mb-2 text-background">
          {STORE_NEWSLETTER.title}
        </h4>
        <p className="text-xs text-background/50 mb-4 font-light leading-relaxed">
          {STORE_NEWSLETTER.description}
        </p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
          placeholder={STORE_NEWSLETTER.placeholder}
          className="w-full bg-background/10 border-none rounded text-xs px-3 py-2 mb-3 focus:ring-1 focus:ring-background/50 text-background placeholder:text-background/40 focus:outline-none"
        />
        <button
          onClick={handleSubscribe}
          className="w-full bg-background text-foreground text-[10px] font-bold uppercase py-2 hover:bg-background/90 transition-colors"
        >
          {STORE_NEWSLETTER.cta}
        </button>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function StoreSidebar({
  activeCategory,
  activeSort,
  onCategoryChange,
  onSortChange,
}: StoreSidebarProps) {
  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="sticky top-32 space-y-10">
        <CategoryList
          activeCategory={activeCategory}
          onChange={onCategoryChange}
        />
        <SortGroup activeSort={activeSort} onChange={onSortChange} />
        <SidebarNewsletter />
      </div>
    </aside>
  );
}
