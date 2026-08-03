import { useEffect, useRef } from "react"
import type { ReactNode } from "react"
import { AlertTriangle, X } from "lucide-react"

interface DialogProps {
  readonly open: boolean
  readonly onClose: () => void
  readonly title: string
  readonly description?: string
  readonly children?: ReactNode
  readonly variant?: "default" | "danger"
  readonly confirmLabel?: string
  readonly cancelLabel?: string
  readonly onConfirm?: () => void
  readonly confirming?: boolean
}

export default function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  variant = "default",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  confirming = false,
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const isDanger = variant === "danger"

  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !confirming) {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleKeyDown)
    dialogRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [confirming, onClose, open])

  if (!open) {
    return null
  }

  const handleBackdropClick = () => {
    if (!confirming) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <button
        type="button"
        className="absolute inset-0 cursor-pointer bg-black/70 backdrop-blur-sm"
        aria-label={`Close ${title}`}
        onClick={handleBackdropClick}
        disabled={confirming}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby={description ? "dialog-description" : undefined}
        tabIndex={-1}
        className="relative z-10 w-full max-w-md border border-white/10 bg-surface-container-high shadow-glow-cyan outline-none"
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              {isDanger ? <AlertTriangle className="size-5 shrink-0 text-secondary" aria-hidden /> : null}
              <h2 id="dialog-title" className="font-headline text-xl font-bold text-on-surface">
                {title}
              </h2>
            </div>
            {description ? (
              <p id="dialog-description" className="mt-2 font-body text-sm leading-6 text-on-surface-variant">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={confirming}
            className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center text-on-surface-variant transition-colors hover:bg-surface-container-highest hover:text-primary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={`Close ${title}`}
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        {children ? <div className="px-6 py-5 font-body text-sm leading-6 text-on-surface-variant">{children}</div> : null}

        <div className="flex flex-col-reverse gap-3 border-t border-white/10 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={confirming}
            className="min-h-11 cursor-pointer border border-outline-variant bg-surface-container-highest px-4 font-label text-xs font-bold uppercase tracking-wider text-on-surface transition-colors hover:border-white/10 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!onConfirm || confirming}
            className={`min-h-11 cursor-pointer px-4 font-label text-xs font-bold uppercase tracking-wider text-on-surface transition-opacity disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isDanger
                ? "bg-secondary shadow-glow-cyan focus-visible:outline-secondary"
                : "bg-linear-to-r from-primary to-secondary shadow-glow-cyan focus-visible:outline-primary"
            }`}
          >
            {confirming ? "Confirming…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
