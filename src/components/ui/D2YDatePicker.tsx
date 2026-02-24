// ============================================================
// D2YDatePicker — Simple date picker
// ============================================================

import { useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/utils";
import D2YButton from "./D2YButton";

interface D2YDatePickerProps {
  value?: string; // ISO: YYYY-MM-DD
  onChange?: (value: string | null) => void;
  label?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  clearable?: boolean;
  className?: string;
  range?: false;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatDisplay(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

function toIso(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function D2YDatePicker({
  value,
  onChange,
  label,
  placeholder = "Select date",
  hint,
  error,
  min,
  max,
  disabled = false,
  clearable = true,
  className,
}: D2YDatePickerProps) {
  const [open, setOpen] = useState(false);
  const today = new Date();
  const [viewDate, setViewDate] = useState(() => {
    return value ? new Date(value + "T00:00:00") : today;
  });

  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleSelect = (day: number) => {
    const selected = new Date(year, month, day);
    const iso = toIso(selected);
    onChange?.(iso);
    setOpen(false);
  };

  const isDisabled = (day: number) => {
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    if (min && iso < min) return true;
    if (max && iso > max) return true;
    return false;
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    const iso = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    return iso === value;
  };

  const isToday = (day: number) => {
    return (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    );
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground mb-1.5">
          {label}
        </label>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => !disabled && setOpen((v) => !v)}
        disabled={disabled}
        className={cn(
          "w-full h-10 px-3 flex items-center gap-2 text-sm text-left rounded-md border",
          "bg-input transition-all duration-150",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:border-foreground",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error
            ? "border-destructive"
            : open
            ? "border-foreground ring-2 ring-ring"
            : "border-border hover:border-(--color-border-strong)"
        )}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Calendar size={16} className="text-muted-foreground shrink-0" />
        <span
          className={cn("flex-1 truncate", !value && "text-muted-foreground")}
        >
          {value ? formatDisplay(value) : placeholder}
        </span>
        {clearable && value && (
          <span
            role="button"
            aria-label="Clear date"
            onClick={(e) => {
              e.stopPropagation();
              onChange?.(null);
            }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={14} />
          </span>
        )}
      </button>

      {/* Calendar popover */}
      {open && (
        <div
          role="dialog"
          aria-label="Date picker"
          className="absolute top-full mt-2 left-0 z-(--z-dropdown) bg-background border border-border rounded-xl shadow-xl p-4 w-64 animate-fade-in-scale"
        >
          {/* Month nav */}
          <div className="flex items-center justify-between mb-3">
            <D2YButton
              variant="ghost"
              size="xs"
              leftIcon={<ChevronLeft size={16} />}
              onClick={() => setViewDate(new Date(year, month - 1))}
              aria-label="Previous month"
            />
            <p className="text-sm font-semibold text-foreground">
              {MONTHS[month]} {year}
            </p>
            <D2YButton
              variant="ghost"
              size="xs"
              leftIcon={<ChevronRight size={16} />}
              onClick={() => setViewDate(new Date(year, month + 1))}
              aria-label="Next month"
            />
          </div>

          {/* Day labels */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map((d) => (
              <div
                key={d}
                className="text-center text-[10px] font-semibold uppercase text-muted-foreground py-1"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-0.5">
            {/* Empty cells */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {/* Day cells */}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const sel = isSelected(day);
              const tod = isToday(day);
              const dis = isDisabled(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => !dis && handleSelect(day)}
                  disabled={dis}
                  className={cn(
                    "w-8 h-8 mx-auto text-xs rounded-full transition-all duration-100 flex items-center justify-center font-medium",
                    sel
                      ? "bg-primary text-primary-foreground"
                      : tod
                      ? "border border-foreground text-foreground"
                      : "text-foreground hover:bg-surface",
                    dis && "opacity-30 cursor-not-allowed hover:bg-transparent"
                  )}
                  aria-label={`${MONTHS[month]} ${day}, ${year}`}
                  aria-pressed={sel}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Today shortcut */}
          <div className="mt-3 pt-3 border-t border-border">
            <button
              type="button"
              onClick={() => {
                onChange?.(toIso(today));
                setOpen(false);
              }}
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Today
            </button>
          </div>
        </div>
      )}

      {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}
