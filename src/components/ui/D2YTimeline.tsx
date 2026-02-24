// ============================================================
// D2YTimeline — Progress timeline
// ============================================================

import { Check, Clock, AlertCircle, type LucideIcon } from "lucide-react";
import { cn } from "@/utils";
import type { TimelineStep, TimelineStatus } from "@/types";

interface D2YTimelineProps {
  steps: TimelineStep[];
  orientation?: "horizontal" | "vertical";
  className?: string;
  compact?: boolean;
}

const statusConfig: Record<
  TimelineStatus,
  { icon: LucideIcon; iconClass: string; dotClass: string; lineClass: string }
> = {
  completed: {
    icon: Check,
    iconClass: "text-[var(--color-primary-foreground)]",
    dotClass: "bg-[var(--color-primary)] border-[var(--color-primary)]",
    lineClass: "bg-[var(--color-primary)]",
  },
  active: {
    icon: Clock,
    iconClass: "text-[var(--color-primary-foreground)]",
    dotClass:
      "bg-[var(--color-foreground)] border-[var(--color-foreground)] ring-4 ring-[var(--color-foreground)]/20",
    lineClass: "bg-[var(--color-border)]",
  },
  pending: {
    icon: Clock,
    iconClass: "text-muted-foreground",
    dotClass: "bg-transparent border-[var(--color-border-strong)]",
    lineClass: "bg-[var(--color-border)]",
  },
  error: {
    icon: AlertCircle,
    iconClass: "text-[var(--color-destructive-foreground)]",
    dotClass: "bg-[var(--color-destructive)] border-[var(--color-destructive)]",
    lineClass: "bg-[var(--color-border)]",
  },
};

// ─── Horizontal ───────────────────────────────────────────
function HorizontalTimeline({
  steps,
  compact,
}: {
  steps: TimelineStep[];
  compact?: boolean;
}) {
  return (
    <div className="flex items-start w-full">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const cfg = statusConfig[step.status];
        const Icon = step.icon ? undefined : cfg.icon;
        const showContent =
          step.status === "completed" || step.status === "active";

        return (
          <div
            key={step.id}
            className={cn(
              "flex flex-col items-center",
              isLast ? "flex-none" : "flex-1"
            )}
          >
            <div className="flex items-center w-full">
              {/* Dot */}
              <div
                className={cn(
                  "w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300",
                  cfg.dotClass
                )}
                aria-label={`${step.label}: ${step.status}`}
              >
                {step.icon ? (
                  <span className={cfg.iconClass}>{step.icon}</span>
                ) : Icon ? (
                  <Icon
                    size={16}
                    strokeWidth={step.status === "completed" ? 3 : 1.5}
                    className={cfg.iconClass}
                  />
                ) : null}
              </div>

              {/* Line */}
              {!isLast && (
                <div
                  className={cn(
                    "flex-1 h-0.5 transition-all duration-500",
                    cfg.lineClass
                  )}
                />
              )}
            </div>

            {/* Label */}
            {!compact && (
              <div className="mt-2 text-center max-w-25">
                <p
                  className={cn(
                    "text-sm font-medium leading-tight",
                    showContent ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
                {step.date && (
                  <p className="text-[11px] text-muted-foreground mt-0.5 uppercase tracking-wide">
                    {step.date}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Vertical ─────────────────────────────────────────────
function VerticalTimeline({
  steps,
  compact,
}: {
  steps: TimelineStep[];
  compact?: boolean;
}) {
  return (
    <div className="flex flex-col">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const cfg = statusConfig[step.status];
        const Icon = step.icon ? undefined : cfg.icon;

        return (
          <div key={step.id} className="flex gap-3">
            {/* Left: dot + line */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300",
                  cfg.dotClass
                )}
                aria-label={`${step.label}: ${step.status}`}
              >
                {step.icon ? (
                  <span className={cfg.iconClass}>{step.icon}</span>
                ) : Icon ? (
                  <Icon
                    size={14}
                    strokeWidth={step.status === "completed" ? 3 : 1.5}
                    className={cfg.iconClass}
                  />
                ) : null}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "w-0.5 flex-1 my-1 min-h-6 transition-all duration-500",
                    cfg.lineClass
                  )}
                />
              )}
            </div>

            {/* Right: content */}
            <div className={cn("flex-1", !isLast && "pb-5")}>
              <div className="flex items-start justify-between gap-2">
                <p
                  className={cn(
                    "text-sm font-medium",
                    step.status !== "pending"
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
                {step.date && (
                  <span className="text-xs text-muted-foreground shrink-0">
                    {step.date}
                  </span>
                )}
              </div>
              {!compact && step.description && (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────
export default function D2YTimeline({
  steps,
  orientation = "horizontal",
  className,
  compact = false,
}: D2YTimelineProps) {
  return (
    <div className={className} role="list" aria-label="Timeline">
      {orientation === "horizontal" ? (
        <HorizontalTimeline steps={steps} compact={compact} />
      ) : (
        <VerticalTimeline steps={steps} compact={compact} />
      )}
    </div>
  );
}
