// ============================================================
// StoreDetailRelated — Related products section
// ============================================================

import { Link } from "react-router-dom";
import { D2YImage } from "@/components/ui";
import { cn } from "@/utils";
import type { StoreProduct } from "@/data/store.data";

interface StoreDetailRelatedProps {
  products: StoreProduct[];
}

function RelatedCard({ product }: { product: StoreProduct }) {
  return (
    <Link to={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-3/4 bg-surface border border-border overflow-hidden rounded mb-5">
        <D2YImage
          src={product.image.src}
          alt={product.image.alt}
          objectFit="cover"
          rounded="none"
          className={cn(
            "grayscale w-full h-full transition-transform duration-700",
            "group-hover:scale-105"
          )}
          wrapperClassName="w-full h-full"
        />
        <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-background/90 backdrop-blur-sm px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-foreground">
            View Product
          </div>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-bold uppercase tracking-tight text-foreground group-hover:underline underline-offset-4 decoration-1">
          {product.title}
        </h3>
        <span className="text-xs text-muted-foreground shrink-0 ml-2">
          ${product.price.toFixed(2)}
        </span>
      </div>
      <p className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1">
        {product.categoryLabel}
      </p>
    </Link>
  );
}

export default function StoreDetailRelated({
  products,
}: StoreDetailRelatedProps) {
  if (!products.length) return null;

  return (
    <section
      className="border-t border-border pt-16 mt-20"
      aria-label="Related products"
    >
      <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-12 text-muted-foreground">
        You May Also Like
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {products.map((product) => (
          <RelatedCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
