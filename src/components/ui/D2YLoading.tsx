// ============================================================
// D2YLoading — Spinner & Loading states
// ============================================================

import { cn } from "@/utils";
import type { SizeVariant } from "@/types";

interface D2YLoadingProps {
  size?: SizeVariant;
  label?: string;
  overlay?: boolean;
  fullScreen?: boolean;
  className?: string;
  variant?: "spinner" | "dots" | "bar";
}

const sizeMap = {
  xs: { spinner: "w-3 h-3", text: "text-xs" },
  sm: { spinner: "w-4 h-4", text: "text-xs" },
  md: { spinner: "w-6 h-6", text: "text-sm" },
  lg: { spinner: "w-8 h-8", text: "text-base" },
  xl: { spinner: "w-12 h-12", text: "text-lg" },
};

// ─── Spinner Variant ──────────────────────────────────────
function Spinner({ size }: { size: SizeVariant }) {
  return (
    <svg
      className={cn(sizeMap[size].spinner, "animate-spin")}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-20"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-80"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─── Dots Variant ─────────────────────────────────────────
function Dots({ size }: { size: SizeVariant }) {
  const dotSize = {
    xs: "w-1 h-1",
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-2.5 h-2.5",
    xl: "w-3 h-3",
  }[size];

  return (
    <div className="flex gap-1 items-center" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(dotSize, "rounded-full bg-current animate-bounce")}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

// ─── Bar Variant ──────────────────────────────────────────
function Bar() {
  return (
    <div
      className="w-32 h-1 bg-current/20 rounded-full overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="h-full bg-current rounded-full"
        style={{
          animation: "barSlide 1.2s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes barSlide {
          0% { width: 0; margin-left: 0; }
          50% { width: 60%; margin-left: 20%; }
          100% { width: 0; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────
export default function D2YLoading({
  size = "md",
  label,
  overlay = false,
  fullScreen = false,
  className,
  variant = "spinner",
}: D2YLoadingProps) {
  const content = (
    <div
      role="status"
      aria-label={label ?? "Loading"}
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        !overlay && !fullScreen && className
      )}
    >
      <div className="text-foreground">
        {variant === "spinner" && <Spinner size={size} />}
        {variant === "dots" && <Dots size={size} />}
        {variant === "bar" && <Bar />}
      </div>
      {label && (
        <p className={cn(sizeMap[size].text, "text-muted-foreground")}>
          {label}
        </p>
      )}
      <span className="sr-only">{label ?? "Loading..."}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className={cn(
          "fixed inset-0 z-(--z-overlay) flex items-center justify-center bg-background/90 backdrop-blur-sm",
          className
        )}
      >
        {content}
      </div>
    );
  }

  if (overlay) {
    return (
      <div
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-[inherit]",
          className
        )}
      >
        {content}
      </div>
    );
  }

  return content;
}
