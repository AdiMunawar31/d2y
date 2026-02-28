// ============================================================
// D2YTextField — All form input types
// ============================================================

import {
  forwardRef,
  useState,
  useId,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
} from "react";
import {
  Eye,
  EyeOff,
  X,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/utils";
import type { SizeVariant } from "@/types";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "textarea"
  | "select"
  | "date"
  | "time"
  | "datetime-local";

interface D2YTextFieldBaseProps {
  label?: string;
  hint?: string;
  error?: string;
  success?: string;
  size?: Extract<SizeVariant, "sm" | "md" | "lg">;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
  wrapperClassName?: string;
}

interface D2YInputProps
  extends D2YTextFieldBaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  type?: Exclude<InputType, "textarea" | "select">;
  options?: never;
  rows?: never;
}

interface D2YTextareaProps
  extends D2YTextFieldBaseProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  type: "textarea";
  rows?: number;
  options?: never;
}

interface D2YSelectProps
  extends D2YTextFieldBaseProps,
    Omit<InputHTMLAttributes<HTMLSelectElement>, "size"> {
  type: "select";
  options: Array<{ value: string | number; label: string; disabled?: boolean }>;
  rows?: never;
  placeholder?: string;
}

type D2YTextFieldProps = D2YInputProps | D2YTextareaProps | D2YSelectProps;

// ─── Style helpers ────────────────────────────────────────
const sizeStyles = {
  sm: "h-8 text-xs px-2.5",
  md: "h-10 text-sm px-3",
  lg: "h-11 text-base px-3.5",
};

const textareaSizeStyles = {
  sm: "text-xs px-2.5 py-1.5",
  md: "text-sm px-3 py-2",
  lg: "text-base px-3.5 py-2.5",
};

const baseInputStyles = cn(
  "w-full rounded-[var(--radius-md)] border border-[var(--color-border)]",
  "bg-[var(--color-input)] text-foreground",
  "placeholder:text-muted-foreground",
  "transition-all duration-150",
  "focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:ring-offset-0 focus:border-foreground",
  "disabled:opacity-50 disabled:cursor-not-allowed",
  "file:border-0 file:bg-transparent file:text-sm file:font-medium"
);

const errorInputStyles =
  "border-destructive focus:ring-destructive/30 focus:border-destructive";
const successInputStyles =
  "border-success focus:ring-success/30 focus:border-success";

// ─── Label ────────────────────────────────────────────────
function InputLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-foreground mb-1.5 leading-none"
    >
      {children}
      {required && (
        <span className="ml-0.5 text-destructive" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

// ─── Helper / Error text ──────────────────────────────────
function InputHint({
  error,
  success,
  hint,
}: {
  error?: string;
  success?: string;
  hint?: string;
}) {
  if (error) {
    return (
      <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
        <AlertCircle size={12} />
        {error}
      </p>
    );
  }
  if (success) {
    return (
      <p className="mt-1.5 text-xs text-success flex items-center gap-1">
        <CheckCircle2 size={12} />
        {success}
      </p>
    );
  }
  if (hint) {
    return <p className="mt-1.5 text-xs text-foreground">{hint}</p>;
  }
  return null;
}

// ─── Main Component ───────────────────────────────────────
const D2YTextField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  D2YTextFieldProps
>((props, ref) => {
  const {
    label,
    hint,
    error,
    success,
    size = "md",
    leftIcon,
    rightIcon,
    clearable,
    onClear,
    required,
    fullWidth = true,
    className,
    wrapperClassName,
    type = "text",
    ...rest
  } = props;

  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const hasError = !!error;
  const hasSuccess = !!success && !error;
  const hasLeftIcon = !!leftIcon;

  const stateStyle = hasError
    ? errorInputStyles
    : hasSuccess
    ? successInputStyles
    : "";

  // ─── Textarea ──────────────────────────────────────────
  if (type === "textarea") {
    const { rows = 4, ...textareaRest } = rest as D2YTextareaProps;
    return (
      <div className={cn(fullWidth && "w-full", wrapperClassName)}>
        {label && (
          <InputLabel htmlFor={id} required={required}>
            {label}
          </InputLabel>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-3 text-foreground">
              {leftIcon}
            </div>
          )}
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={id}
            rows={rows}
            required={required}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${id}-error` : hint ? `${id}-hint` : undefined
            }
            className={cn(
              baseInputStyles,
              textareaSizeStyles[size],
              stateStyle,
              hasLeftIcon && "pl-9",
              "resize-y",
              className
            )}
            {...(textareaRest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        </div>
        <InputHint error={error} success={success} hint={hint} />
      </div>
    );
  }

  // ─── Select ────────────────────────────────────────────
  if (type === "select") {
    const { options, placeholder, ...selectRest } = rest as D2YSelectProps;
    return (
      <div className={cn(fullWidth && "w-full", wrapperClassName)}>
        {label && (
          <InputLabel htmlFor={id} required={required}>
            {label}
          </InputLabel>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground">
              {leftIcon}
            </div>
          )}
          <select
            ref={ref as React.Ref<HTMLSelectElement>}
            id={id}
            required={required}
            aria-invalid={hasError}
            className={cn(
              baseInputStyles,
              sizeStyles[size],
              stateStyle,
              hasLeftIcon && "pl-9",
              "pr-9 appearance-none cursor-pointer",
              className
            )}
            {...(selectRest as InputHTMLAttributes<HTMLSelectElement>)}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-foreground">
            <ChevronDown size={14} />
          </div>
        </div>
        <InputHint error={error} success={success} hint={hint} />
      </div>
    );
  }

  // ─── Standard Input ────────────────────────────────────
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  const { value, onChange, ...inputRest } = rest as D2YInputProps;
  const hasRightContent = rightIcon || clearable || isPassword;
  const hasValue = value !== undefined && value !== "";

  return (
    <div className={cn(fullWidth && "w-full", wrapperClassName)}>
      {label && (
        <InputLabel htmlFor={id} required={required}>
          {label}
        </InputLabel>
      )}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref as React.Ref<HTMLInputElement>}
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          required={required}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          className={cn(
            baseInputStyles,
            sizeStyles[size],
            stateStyle,
            hasLeftIcon && "pl-9",
            !!hasRightContent && "pr-9",
            className
          )}
          {...(inputRest as InputHTMLAttributes<HTMLInputElement>)}
        />

        {/* Right content */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {/* Clear button */}
          {clearable && hasValue && onClear && (
            <button
              type="button"
              onClick={onClear}
              className="text-foreground hover:text-foreground transition-colors"
              aria-label="Clear"
              tabIndex={-1}
            >
              <X size={14} />
            </button>
          )}
          {/* Status icons */}
          {hasError && !isPassword && (
            <AlertCircle size={14} className="text-destructive" />
          )}
          {hasSuccess && !isPassword && (
            <CheckCircle2 size={14} className="text-success" />
          )}
          {/* Password toggle */}
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
          {/* Custom right icon */}
          {rightIcon && !isPassword && (
            <span className="text-foreground">{rightIcon}</span>
          )}
        </div>
      </div>

      <InputHint error={error} success={success} hint={hint} />
    </div>
  );
});

D2YTextField.displayName = "D2YTextField";
export default D2YTextField;
