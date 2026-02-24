// ============================================================
// D2YToast — Toast notification system
// ============================================================

import {
  createContext,
  useContext,
  useCallback,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  X,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  Bell,
} from "lucide-react";
import { cn, generateId } from "@/utils";
import type { ToastItem, ToastType } from "@/types";
import { APP_CONFIG } from "@/config/app.config";

// ─── State Management ─────────────────────────────────────
type ToastAction =
  | { type: "ADD"; toast: ToastItem }
  | { type: "REMOVE"; id: string }
  | { type: "CLEAR" };

function toastReducer(state: ToastItem[], action: ToastAction): ToastItem[] {
  switch (action.type) {
    case "ADD":
      return [...state.slice(-(APP_CONFIG.toast.maxVisible - 1)), action.toast];
    case "REMOVE":
      return state.filter((t) => t.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────
interface ToastContextValue {
  toasts: ToastItem[];
  toast: (
    message: string,
    type?: ToastType,
    options?: Partial<ToastItem>
  ) => string;
  success: (message: string, options?: Partial<ToastItem>) => string;
  error: (message: string, options?: Partial<ToastItem>) => string;
  warning: (message: string, options?: Partial<ToastItem>) => string;
  info: (message: string, options?: Partial<ToastItem>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────
export function D2YToastProvider({ children }: { children: ReactNode }) {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const toast = useCallback(
    (
      message: string,
      type: ToastType = "default",
      options?: Partial<ToastItem>
    ): string => {
      const id = generateId("toast");
      dispatch({
        type: "ADD",
        toast: {
          id,
          type,
          message,
          duration: APP_CONFIG.toast.duration,
          ...options,
        },
      });
      return id;
    },
    []
  );

  const success = useCallback(
    (message: string, options?: Partial<ToastItem>) =>
      toast(message, "success", options),
    [toast]
  );
  const error = useCallback(
    (message: string, options?: Partial<ToastItem>) =>
      toast(message, "error", options),
    [toast]
  );
  const warning = useCallback(
    (message: string, options?: Partial<ToastItem>) =>
      toast(message, "warning", options),
    [toast]
  );
  const info = useCallback(
    (message: string, options?: Partial<ToastItem>) =>
      toast(message, "info", options),
    [toast]
  );
  const dismiss = useCallback(
    (id: string) => dispatch({ type: "REMOVE", id }),
    []
  );
  const dismissAll = useCallback(() => dispatch({ type: "CLEAR" }), []);

  return (
    <ToastContext.Provider
      value={{
        toasts,
        toast,
        success,
        error,
        warning,
        info,
        dismiss,
        dismissAll,
      }}
    >
      {children}
      {createPortal(<D2YToastViewport />, document.body)}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <D2YToastProvider>");
  return ctx;
}

// ─── Toast Item ───────────────────────────────────────────
const toastIcons: Record<ToastType, ReactNode> = {
  success: <CheckCircle2 size={16} />,
  error: <AlertCircle size={16} />,
  warning: <AlertTriangle size={16} />,
  info: <Info size={16} />,
  default: <Bell size={16} />,
};

const toastStyles: Record<ToastType, string> = {
  success: "border-[var(--color-success)]/30 bg-[var(--color-background)]",
  error: "border-[var(--color-destructive)]/30 bg-[var(--color-background)]",
  warning: "border-[var(--color-warning)]/30 bg-[var(--color-background)]",
  info: "border-[var(--color-info)]/30 bg-[var(--color-background)]",
  default: "border-[var(--color-border)] bg-[var(--color-background)]",
};

const iconStyles: Record<ToastType, string> = {
  success: "text-[var(--color-success)]",
  error: "text-[var(--color-destructive)]",
  warning: "text-[var(--color-warning)]",
  info: "text-[var(--color-info)]",
  default: "text-[var(--color-muted)]",
};

function D2YToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  useEffect(() => {
    if (!toast.duration) return;
    const timer = setTimeout(() => onDismiss(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "flex items-start gap-3 w-full max-w-sm p-4 rounded-xl border shadow-lg animate-slide-in-right",
        toastStyles[toast.type]
      )}
    >
      {/* Icon */}
      <span className={cn("shrink-0 mt-0.5", iconStyles[toast.type])}>
        {toastIcons[toast.type]}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="text-sm font-semibold text-foreground leading-tight">
            {toast.title}
          </p>
        )}
        <p
          className={cn(
            "text-sm text-muted-foreground",
            toast.title && "mt-0.5"
          )}
        >
          {toast.message}
        </p>
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="mt-2 text-xs font-semibold text-foreground underline underline-offset-2 hover:no-underline"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      {/* Dismiss */}
      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}

// ─── Viewport ─────────────────────────────────────────────
function D2YToastViewport() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      className="fixed bottom-4 right-4 flex flex-col gap-2 items-end"
      style={{ zIndex: "var(--z-toast)" }}
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <D2YToastItem key={t.id} toast={t} onDismiss={dismiss} />
      ))}
    </div>
  );
}
