// ============================================================
// D2YSwitch — iOS style toggle switch
// ============================================================

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils";

interface D2YSwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: ReactNode;
  description?: string;
  onCheckedChange?: (checked: boolean) => void;
}

const D2YSwitch = forwardRef<HTMLInputElement, D2YSwitchProps>(
  (
    {
      label,
      description,
      checked,
      disabled,
      onChange,
      onCheckedChange,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? `switch-${Math.random().toString(36).slice(2, 7)}`;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "flex items-center gap-3 cursor-pointer select-none",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {/* Hidden checkbox */}
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="sr-only"
          onChange={(e) => {
            onChange?.(e);
            onCheckedChange?.(e.target.checked);
          }}
          {...props}
        />

        {/* Switch track */}
        <span
          className={cn(
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200",
            checked ? "bg-primary" : "bg-(--color-border-strong)"
          )}
        >
          {/* Thumb */}
          <span
            className={cn(
              "inline-block h-5 w-5 transform rounded-full bg-white dark:bg-slate-700 shadow transition-transform duration-200",
              checked ? "translate-x-5" : "translate-x-1"
            )}
          />
        </span>

        {/* Text */}
        {(label || description) && (
          <span className="flex flex-col leading-tight">
            {label && (
              <span className="text-sm font-medium text-foreground">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-muted-foreground">
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  }
);

D2YSwitch.displayName = "D2YSwitch";
export default D2YSwitch;
