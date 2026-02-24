// ============================================================
// D2YShimmer — Skeleton loading placeholder
// ============================================================

import { cn } from "@/utils";

interface D2YShimmerProps {
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  /** Animate or static */
  animate?: boolean;
}

const roundedMap = {
  none: "rounded-none",
  sm: "rounded-[var(--radius-sm)]",
  md: "rounded-[var(--radius-md)]",
  lg: "rounded-[var(--radius-lg)]",
  xl: "rounded-[var(--radius-xl)]",
  full: "rounded-full",
};

export default function D2YShimmer({
  width,
  height = "1rem",
  rounded = "md",
  className,
  animate = true,
}: D2YShimmerProps) {
  return (
    <div
      className={cn(
        roundedMap[rounded],
        animate ? "shimmer" : "bg-(--shimmer-base)",
        className
      )}
      style={{
        width: width ?? "100%",
        height,
      }}
      aria-hidden="true"
    />
  );
}

// ─── Preset Composites ────────────────────────────────────

/** Text block shimmer */
export function D2YShimmerText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <D2YShimmer
          key={i}
          height="0.875rem"
          width={i === lines - 1 ? "70%" : "100%"}
        />
      ))}
    </div>
  );
}

/** Card shimmer preset */
export function D2YShimmerCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "border border-border rounded-xl p-4 flex flex-col gap-3",
        className
      )}
    >
      <D2YShimmer height="12rem" rounded="lg" />
      <D2YShimmer height="1.25rem" width="70%" />
      <D2YShimmerText lines={2} />
      <div className="flex gap-2 mt-1">
        <D2YShimmer height="2rem" width="5rem" rounded="md" />
        <D2YShimmer height="2rem" width="5rem" rounded="md" />
      </div>
    </div>
  );
}

/** Table row shimmer preset */
export function D2YShimmerTableRow({
  cols = 5,
  className,
}: {
  cols?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 py-3 border-b border-border",
        className
      )}
    >
      <D2YShimmer width={32} height={32} rounded="full" />
      {Array.from({ length: cols - 1 }).map((_, i) => (
        <D2YShimmer
          key={i}
          height="0.875rem"
          className="flex-1"
          width={`${60 + (i % 3) * 15}%`}
        />
      ))}
    </div>
  );
}

/** Avatar + text shimmer */
export function D2YShimmerProfile({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <D2YShimmer width={40} height={40} rounded="full" />
      <div className="flex flex-col gap-1.5 flex-1">
        <D2YShimmer height="0.875rem" width="50%" />
        <D2YShimmer height="0.75rem" width="70%" />
      </div>
    </div>
  );
}
