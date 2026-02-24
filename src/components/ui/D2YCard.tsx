// ============================================================
// D2YCard — Flexible card container
// ============================================================

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils";

interface D2YCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Remove default padding */
  noPadding?: boolean;
  /** Add hover effect */
  hoverable?: boolean;
  /** Clickable style */
  clickable?: boolean;
  /** Show shadow */
  shadow?: "none" | "sm" | "md" | "lg";
  /** Border variant */
  bordered?: boolean;
  /** Compact padding */
  compact?: boolean;
}

const shadowMap = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
};

const D2YCard = forwardRef<HTMLDivElement, D2YCardProps>(
  (
    {
      noPadding = false,
      hoverable = false,
      clickable = false,
      shadow = "sm",
      bordered = true,
      compact = false,
      className,
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "bg-background rounded-xl",
        !noPadding && (compact ? "p-3" : "p-5"),
        bordered && "border border-border",
        shadowMap[shadow],
        hoverable && "transition-shadow duration-200 hover:shadow-md",
        clickable &&
          "cursor-pointer transition-all duration-150 hover:shadow-md active:scale-[0.99]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
D2YCard.displayName = "D2YCard";

// ─── Sub-components ───────────────────────────────────────

interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function D2YCardHeader({
  className,
  children,
  ...props
}: CardSectionProps) {
  return (
    <div
      className={cn("flex items-start justify-between gap-3 mb-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function D2YCardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-base font-semibold text-foreground", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function D2YCardDescription({
  className,
  children,
  ...props
}: CardSectionProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}

export function D2YCardContent({
  className,
  children,
  ...props
}: CardSectionProps) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}

export function D2YCardFooter({
  className,
  children,
  ...props
}: CardSectionProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 mt-4 pt-4 border-t border-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function D2YCardDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-px bg-border my-4 -mx-5", className)}
      aria-hidden="true"
    />
  );
}

export default D2YCard;
