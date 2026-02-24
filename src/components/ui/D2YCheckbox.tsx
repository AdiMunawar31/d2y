// ============================================================
// D2YCheckbox — Checkbox with indeterminate support
// ============================================================

import {
  forwardRef,
  useEffect,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/utils";
import type { SizeVariant } from "@/types";

interface D2YCheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: ReactNode;
  description?: string;
  error?: string;
  indeterminate?: boolean;
  size?: Extract<SizeVariant, "sm" | "md" | "lg">;
  labelPosition?: "right" | "left";
}

const sizeConfig = {
  sm: { box: "w-3.5 h-3.5 rounded-[3px]", icon: 10, text: "text-sm" },
  md: { box: "w-4 h-4 rounded-[var(--radius-sm)]", icon: 11, text: "text-sm" },
  lg: {
    box: "w-5 h-5 rounded-[var(--radius-base)]",
    icon: 13,
    text: "text-base",
  },
};

const D2YCheckbox = forwardRef<HTMLInputElement, D2YCheckboxProps>(
  (
    {
      label,
      description,
      error,
      indeterminate = false,
      size = "md",
      labelPosition = "right",
      className,
      disabled,
      checked,
      id,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);
    const ref = (forwardedRef ??
      internalRef) as React.RefObject<HTMLInputElement>;
    const cfg = sizeConfig[size];
    const inputId = id ?? `checkbox-${Math.random().toString(36).slice(2, 7)}`;

    useEffect(() => {
      if (ref.current) {
        ref.current.indeterminate = indeterminate;
      }
    }, [indeterminate, ref]);

    const isChecked = checked || indeterminate;

    return (
      <div className={cn("flex flex-col gap-1", className)}>
        <label
          htmlFor={inputId}
          className={cn(
            "inline-flex items-start gap-2.5 cursor-pointer select-none",
            labelPosition === "left" && "flex-row-reverse justify-end",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          {/* Hidden native checkbox */}
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className="sr-only"
            aria-describedby={description ? `${inputId}-desc` : undefined}
            {...props}
          />

          {/* Custom checkbox */}
          <span
            className={cn(
              cfg.box,
              "shrink-0 mt-0.5 flex items-center justify-center border-2 transition-all duration-150",
              isChecked
                ? "bg-primary border-primary"
                : "bg-input border-(--color-border-strong) hover:border-foreground",
              error && !isChecked && "border-destructive"
            )}
            aria-hidden="true"
          >
            {indeterminate ? (
              <Minus
                size={cfg.icon}
                strokeWidth={3}
                className="text-primary-foreground"
              />
            ) : checked ? (
              <Check
                size={cfg.icon}
                strokeWidth={3}
                className="text-primary-foreground"
              />
            ) : null}
          </span>

          {/* Label text */}
          {(label || description) && (
            <span className="flex flex-col gap-0.5">
              {label && (
                <span
                  className={cn(
                    cfg.text,
                    "font-medium text-foreground leading-tight"
                  )}
                >
                  {label}
                </span>
              )}
              {description && (
                <span
                  id={`${inputId}-desc`}
                  className="text-xs text-muted-foreground leading-relaxed"
                >
                  {description}
                </span>
              )}
            </span>
          )}
        </label>

        {error && <p className="text-xs text-destructive ml-6">{error}</p>}
      </div>
    );
  }
);

D2YCheckbox.displayName = "D2YCheckbox";
export default D2YCheckbox;
