// ============================================================
// StoreDetailAccordion — Collapsible product info sections
// ============================================================

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils";
import type { AccordionItem } from "@/data/store.data";

interface StoreDetailAccordionProps {
  items: AccordionItem[];
}

function AccordionRow({
  item,
  defaultOpen = false,
}: {
  item: AccordionItem;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const lines = Array.isArray(item.content) ? item.content : [item.content];

  return (
    <div className="border-b border-border pb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer w-full flex justify-between items-center py-1 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-bold uppercase tracking-widest text-foreground">
          {item.title}
        </span>
        <ChevronDown
          size={16}
          strokeWidth={2}
          className={cn(
            "text-foreground/60 transition-transform duration-200 shrink-0",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="mt-4 space-y-2">
          {lines.map((line, i) => (
            <p
              key={i}
              className="text-muted-foreground text-sm leading-relaxed"
            >
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StoreDetailAccordion({
  items,
}: StoreDetailAccordionProps) {
  return (
    <div className="pt-8 border-t border-border space-y-4">
      {items.map((item, i) => (
        <AccordionRow key={item.id} item={item} defaultOpen={i === 0} />
      ))}
    </div>
  );
}
