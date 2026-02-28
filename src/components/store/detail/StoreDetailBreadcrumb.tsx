// ============================================================
// StoreDetailBreadcrumb — Navigation breadcrumb trail
// ============================================================

import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProductDetail } from "@/data/store.data";

interface StoreDetailBreadcrumbProps {
  product: ProductDetail;
}

export default function StoreDetailBreadcrumb({
  product,
}: StoreDetailBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground mb-8 flex-wrap"
    >
      <Link to="/" className="hover:text-foreground transition-colors">
        Home
      </Link>
      <ChevronRight size={12} strokeWidth={2} aria-hidden="true" />
      <Link to="/shop" className="hover:text-foreground transition-colors">
        Shop
      </Link>
      <ChevronRight size={12} strokeWidth={2} aria-hidden="true" />
      <Link
        to={`/shop?category=${product.categoryId}`}
        className="hover:text-foreground transition-colors"
      >
        {product.categoryLabel}
      </Link>
      <ChevronRight size={12} strokeWidth={2} aria-hidden="true" />
      <span className="text-foreground font-bold">{product.title}</span>
    </nav>
  );
}
