// ============================================================
// D2YTabs — Accessible tab navigation
// ============================================================

import { useState, useRef, type ReactNode, type KeyboardEvent } from "react";
import { cn } from "@/utils";
import type { TabItem } from "@/types";

type TabVariant = "underline" | "pills" | "boxed" | "soft";

interface D2YTabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (id: string) => void;
  variant?: TabVariant;
  className?: string;
  contentClassName?: string;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: "text-xs py-1.5 px-3",
  md: "text-sm py-2 px-4",
  lg: "text-base py-2.5 px-5",
};

export default function D2YTabs({
  tabs,
  defaultTab,
  activeTab: controlledActive,
  onChange,
  variant = "underline",
  className,
  contentClassName,
  fullWidth = false,
  size = "md",
}: D2YTabsProps) {
  const [internalActive, setInternalActive] = useState(
    defaultTab ?? tabs[0]?.id ?? ""
  );
  const tabListRef = useRef<HTMLDivElement>(null);

  const activeId = controlledActive ?? internalActive;

  const handleSelect = (id: string) => {
    if (!controlledActive) setInternalActive(id);
    onChange?.(id);
  };

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent, currentIndex: number) => {
    const enabledTabs = tabs.filter((t) => !t.disabled);
    const currentEnabled = enabledTabs.findIndex(
      (t) => t.id === tabs[currentIndex].id
    );

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = enabledTabs[(currentEnabled + 1) % enabledTabs.length];
      handleSelect(next.id);
      tabListRef.current
        ?.querySelector<HTMLButtonElement>(`[data-tab="${next.id}"]`)
        ?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev =
        enabledTabs[
          (currentEnabled - 1 + enabledTabs.length) % enabledTabs.length
        ];
      handleSelect(prev.id);
      tabListRef.current
        ?.querySelector<HTMLButtonElement>(`[data-tab="${prev.id}"]`)
        ?.focus();
    }
  };

  const activeTab = tabs.find((t) => t.id === activeId);

  // ─── Variant Styles ──────────────────────────────────────
  const listStyles: Record<TabVariant, string> = {
    underline: "border-b border-[var(--color-border)] gap-0",
    pills: "gap-1",
    boxed: "bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-1 gap-0.5",
    soft: "gap-1",
  };

  const tabActiveStyles: Record<TabVariant, string> = {
    underline:
      "border-b-2 border-[var(--color-foreground)] text-[var(--color-foreground)] -mb-px",
    pills:
      "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-full shadow-sm",
    boxed:
      "bg-[var(--color-background)] text-[var(--color-foreground)] shadow-sm rounded-[var(--radius-md)]",
    soft: "bg-[var(--color-surface)] text-[var(--color-foreground)] rounded-[var(--radius-md)]",
  };

  const tabInactiveStyles: Record<TabVariant, string> = {
    underline:
      "border-b-2 border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:border-[var(--color-border-strong)] -mb-px",
    pills:
      "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface)] rounded-full",
    boxed:
      "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] rounded-[var(--radius-md)]",
    soft: "text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-surface)] rounded-[var(--radius-md)]",
  };

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Tab list */}
      <div
        ref={tabListRef}
        role="tablist"
        className={cn(
          "flex items-center",
          listStyles[variant],
          fullWidth && "[&>button]:flex-1 [&>button]:justify-center"
        )}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              role="tab"
              data-tab={tab.id}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              disabled={tab.disabled}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleSelect(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={cn(
                "inline-flex items-center gap-2 font-medium transition-all duration-150 whitespace-nowrap",
                "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                sizeConfig[size],
                isActive ? tabActiveStyles[variant] : tabInactiveStyles[variant]
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className={cn(
                    "inline-flex items-center justify-center text-xs font-semibold rounded-full min-w-4.5 h-4.5 px-1",
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-(--color-surface-elevated) text-muted-foreground"
                  )}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab panels */}
      <div className={cn("mt-4", contentClassName)}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`tabpanel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={tab.id !== activeId}
            className={tab.id === activeId ? "animate-fade-in" : ""}
          >
            {tab.id === activeId && tab.content}
          </div>
        ))}
        {/* Render children if content not in tab items */}
        {!activeTab?.content && null}
      </div>
    </div>
  );
}

// ─── Controlled version ───────────────────────────────────
export function D2YTabPanel({
  id,
  active,
  children,
  className,
}: {
  id: string;
  active: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="tabpanel"
      id={`tabpanel-${id}`}
      hidden={!active}
      className={cn(active && "animate-fade-in", className)}
    >
      {active && children}
    </div>
  );
}
