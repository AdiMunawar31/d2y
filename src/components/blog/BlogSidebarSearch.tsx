// ============================================================
// BlogSidebarSearch — Keyword search with underline input
// ============================================================

import { useState } from "react";
import { Search } from "lucide-react";

export default function BlogSidebarSearch() {
  const [query, setQuery] = useState("");

  return (
    <section aria-label="Search">
      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-foreground/40">
        Search
      </h4>
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type keywords..."
          className="w-full border-0 border-b border-border bg-transparent px-0 pb-2 pr-6 text-sm text-foreground focus:border-foreground focus:outline-none placeholder:text-foreground/20 transition-colors"
          aria-label="Search articles"
        />
        <Search
          size={16}
          strokeWidth={1.75}
          className="absolute right-0 top-0 text-foreground/40"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
