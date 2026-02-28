// ============================================================
// StoreProductCard — Product tile with hover overlay + cart
// ============================================================

import { ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui";
import { D2YImage } from "@/components/ui";
import { cn } from "@/utils";
import type { StoreProduct } from "@/data/store.data";

interface StoreProductCardProps {
  product: StoreProduct;
}

// ─── Sub-components ───────────────────────────────────────

function ProductBadge({ label }: { label: string }) {
  return (
    <span className="absolute top-4 left-4 z-10 bg-foreground text-background text-[9px] font-bold px-2 py-1 uppercase rounded-sm">
      {label}
    </span>
  );
}

function QuickViewOverlay({ soldOut }: { soldOut?: boolean }) {
  if (soldOut) return null;
  return (
    <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <div className="bg-background/90 backdrop-blur-sm px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-foreground">
        Quick View
      </div>
    </div>
  );
}

function ProductInfo({ product }: { product: StoreProduct }) {
  return (
    <div className="flex justify-between items-start">
      <h3 className="text-sm font-bold uppercase tracking-tight text-foreground leading-tight">
        {product.title}
      </h3>
      <span
        className={cn(
          "text-xs shrink-0 ml-2",
          product.soldOut
            ? "text-muted-foreground line-through"
            : "text-muted-foreground"
        )}
      >
        ${product.price.toFixed(2)}
      </span>
    </div>
  );
}

function AddToCartButton({ product }: { product: StoreProduct }) {
  const { success } = useToast();

  if (product.soldOut) {
    return (
      <button
        disabled
        className="w-full bg-surface text-muted-foreground text-[10px] font-bold uppercase py-3 rounded cursor-not-allowed"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <button
      onClick={() => success(`${product.title} added to cart!`)}
      className="group/btn w-full bg-foreground text-background text-[10px] font-bold uppercase py-3 rounded hover:bg-foreground/80 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
    >
      <ShoppingCart
        size={13}
        strokeWidth={2}
        className="transition-transform group-hover/btn:scale-110"
      />
      Add to Cart
    </button>
  );
}

// ─── Main export ──────────────────────────────────────────

export default function StoreProductCard({ product }: StoreProductCardProps) {
  return (
    <div className="group">
      {/* Image container */}
      <div className="relative aspect-3/4 bg-background border border-border overflow-hidden rounded">
        {product.badge && <ProductBadge label={product.badge} />}
        <D2YImage
          src={product.image.src}
          alt={product.image.alt}
          objectFit="cover"
          rounded="none"
          className={cn(
            "grayscale w-full h-full transition-transform duration-700",
            !product.soldOut && "group-hover:scale-105"
          )}
          wrapperClassName="w-full h-full"
        />
        <QuickViewOverlay soldOut={product.soldOut} />
      </div>

      {/* Info */}
      <div className="mt-6 flex flex-col gap-1">
        <ProductInfo product={product} />
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-4">
          {product.categoryLabel}
        </p>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
