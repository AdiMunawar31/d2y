// ============================================================
// StoreDetailPage — Dynamic product detail via :slug param
// ============================================================

import { useParams, Navigate } from "react-router-dom";
import {
  StoreDetailBreadcrumb,
  StoreDetailImageGallery,
  StoreDetailInfo,
  StoreDetailReviews,
  StoreDetailNotFound,
} from "@/components/store/detail";
import { getProductBySlug } from "@/data/store.data";

export default function StoreDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) return <Navigate to="/shop" replace />;

  const product = getProductBySlug(slug);

  console.log("product : ", product);

  if (!product) return <StoreDetailNotFound />;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
      <StoreDetailBreadcrumb product={product} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        <StoreDetailImageGallery product={product} />
        <StoreDetailInfo product={product} />
      </div>

      <StoreDetailReviews product={product} />
    </main>
  );
}
