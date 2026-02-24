// ============================================================
// D2YImagePicker — File upload / image picker
// ============================================================

import {
  useState,
  useRef,
  useCallback,
  type DragEvent,
  type ChangeEvent,
} from "react";
import { Upload, X, Image, AlertCircle } from "lucide-react";
import { cn, formatFileSize } from "@/utils";
import { APP_CONFIG } from "@/config/app.config";
import D2YButton from "./D2YButton";

interface D2YImagePickerProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  label?: string;
  hint?: string;
  error?: string;
  accept?: string;
  maxSizeMB?: number;
  previewFit?: "cover" | "contain";
  className?: string;
  disabled?: boolean;
  shape?: "rect" | "circle";
}

export default function D2YImagePicker({
  value,
  onChange,
  label,
  hint,
  error,
  accept = APP_CONFIG.upload.acceptedImageTypes.join(","),
  maxSizeMB = APP_CONFIG.upload.maxFileSizeMB,
  previewFit = "cover",
  className,
  disabled = false,
  shape = "rect",
}: D2YImagePickerProps) {
  const [dragOver, setDragOver] = useState(false);
  const [internalError, setInternalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const previewUrl =
    value instanceof File ? URL.createObjectURL(value) : value ?? null;

  const validateAndSet = useCallback(
    (file: File) => {
      setInternalError(null);
      const sizeMB = file.size / 1024 / 1024;
      if (sizeMB > maxSizeMB) {
        setInternalError(`File too large. Max size: ${maxSizeMB}MB`);
        return;
      }
      const acceptedTypes = accept.split(",").map((t) => t.trim());
      if (
        !acceptedTypes.some(
          (t) => file.type === t || file.name.endsWith(t.replace("image/", "."))
        )
      ) {
        setInternalError("File type not supported");
        return;
      }
      onChange?.(file);
    },
    [accept, maxSizeMB, onChange]
  );

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file) validateAndSet(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSet(file);
    e.target.value = "";
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(null);
    setInternalError(null);
  };

  const displayError = error ?? internalError;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label className="text-sm font-medium text-[var(--color-foreground)]">
          {label}
        </label>
      )}

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload image"
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") &&
          !disabled &&
          inputRef.current?.click()
        }
        onDragOver={(e) => {
          e.preventDefault();
          !disabled && setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed transition-all duration-200 cursor-pointer overflow-hidden",
          shape === "circle"
            ? "rounded-full aspect-square w-24 h-24"
            : "rounded-[var(--radius-xl)] min-h-[140px]",
          dragOver
            ? "border-[var(--color-foreground)] bg-[var(--color-surface)]"
            : displayError
            ? "border-[var(--color-destructive)]/50 hover:border-[var(--color-destructive)]"
            : "border-[var(--color-border)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface)]",
          disabled && "opacity-50 cursor-not-allowed",
          previewUrl && "border-solid border-[var(--color-border)]"
        )}
      >
        {previewUrl ? (
          /* Preview */
          <>
            <img
              src={previewUrl}
              alt="Preview"
              className={cn("w-full h-full", `object-${previewFit}`)}
              style={{ minHeight: shape === "rect" ? "140px" : undefined }}
            />
            {!disabled && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Remove image"
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[var(--color-foreground)] text-[var(--color-background)] flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm"
              >
                <X size={12} />
              </button>
            )}
          </>
        ) : (
          /* Upload prompt */
          <div className="flex flex-col items-center justify-center gap-2 p-6 text-center h-full min-h-[140px]">
            <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-surface-elevated)] flex items-center justify-center">
              {dragOver ? (
                <Upload size={20} className="text-[var(--color-foreground)]" />
              ) : (
                <Image
                  size={20}
                  className="text-[var(--color-muted-foreground)]"
                />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-foreground)]">
                {dragOver ? "Drop to upload" : "Click or drag to upload"}
              </p>
              <p className="text-xs text-[var(--color-muted-foreground)] mt-0.5">
                Max {maxSizeMB}MB
              </p>
            </div>
            <D2YButton
              variant="outline"
              size="xs"
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              disabled={disabled}
            >
              Browse files
            </D2YButton>
          </div>
        )}
      </div>

      {/* File info */}
      {value instanceof File && !displayError && (
        <p className="text-xs text-[var(--color-muted-foreground)]">
          {value.name} ({formatFileSize(value.size)})
        </p>
      )}

      {/* Error */}
      {displayError && (
        <p className="text-xs text-[var(--color-destructive)] flex items-center gap-1">
          <AlertCircle size={12} />
          {displayError}
        </p>
      )}

      {/* Hint */}
      {hint && !displayError && (
        <p className="text-xs text-[var(--color-muted-foreground)]">{hint}</p>
      )}

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="sr-only"
        disabled={disabled}
        aria-hidden="true"
      />
    </div>
  );
}
