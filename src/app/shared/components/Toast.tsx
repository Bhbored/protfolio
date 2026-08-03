import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import type { ReactNode } from "react"
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react"

type ToastVariant = "success" | "error" | "warning" | "info"

interface ToastInput {
  readonly title: string
  readonly description?: string
  readonly variant?: ToastVariant
}

interface ToastItemData extends ToastInput {
  readonly id: string
  readonly variant: ToastVariant
}

interface ToastContextValue {
  readonly toast: (input: ToastInput) => void
  readonly success: (input: Omit<ToastInput, "variant">) => void
  readonly error: (input: Omit<ToastInput, "variant">) => void
  readonly warning: (input: Omit<ToastInput, "variant">) => void
  readonly info: (input: Omit<ToastInput, "variant">) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

const toastStyles: Record<ToastVariant, { readonly accent: string; readonly Icon: typeof CheckCircle }> = {
  success: { accent: "border-primary text-primary", Icon: CheckCircle },
  error: { accent: "border-secondary text-secondary", Icon: AlertCircle },
  warning: { accent: "border-secondary text-secondary", Icon: AlertTriangle },
  info: { accent: "border-primary text-primary", Icon: Info },
}

function createToastId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
}

function ToastItem({
  toast,
  onRemove,
}: Readonly<{
  toast: ToastItemData
  onRemove: (id: string) => void
}>) {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const removalTimerRef = useRef<number | undefined>(undefined)
  const { accent, Icon } = toastStyles[toast.variant]

  const dismiss = useCallback(() => {
    if (leaving) {
      return
    }

    setLeaving(true)
    removalTimerRef.current = window.setTimeout(() => onRemove(toast.id), 200)
  }, [leaving, onRemove, toast.id])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setVisible(true))
    const autoDismissTimer = window.setTimeout(dismiss, 4_000)

    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(autoDismissTimer)
      if (removalTimerRef.current !== undefined) {
        window.clearTimeout(removalTimerRef.current)
      }
    }
  }, [dismiss])

  return (
    <div
      role={toast.variant === "error" ? "alert" : "status"}
      className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 border bg-surface-container-high px-4 py-4 shadow-glow-cyan transition-all duration-200 motion-reduce:transition-none ${accent} ${
        visible && !leaving ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
      }`}
    >
      <Icon className={`mt-0.5 size-5 shrink-0 ${accent.split(" ")[1]}`} aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="font-label text-sm font-bold text-on-surface">{toast.title}</p>
        {toast.description ? (
          <p className="mt-1 font-body text-sm leading-5 text-on-surface-variant">{toast.description}</p>
        ) : null}
      </div>
      <button
        type="button"
        onClick={dismiss}
        className="inline-flex size-9 shrink-0 cursor-pointer items-center justify-center text-on-surface-variant transition-colors hover:bg-surface-container-highest hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label={`Dismiss ${toast.title}`}
      >
        <X className="size-4" aria-hidden />
      </button>
    </div>
  )
}

export function ToastProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [toasts, setToasts] = useState<readonly ToastItemData[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
  }, [])

  const toast = useCallback((input: ToastInput) => {
    setToasts((currentToasts) => [
      ...currentToasts,
      {
        ...input,
        id: createToastId(),
        variant: input.variant ?? "info",
      },
    ])
  }, [])

  const value = useMemo<ToastContextValue>(
    () => ({
      toast,
      success: (input) => toast({ ...input, variant: "success" }),
      error: (input) => toast({ ...input, variant: "error" }),
      warning: (input) => toast({ ...input, variant: "warning" }),
      info: (input) => toast({ ...input, variant: "info" }),
    }),
    [toast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[calc(100%-2rem)] flex-col gap-3" aria-live="polite">
        {toasts.map((item) => (
          <ToastItem key={item.id} toast={item} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider.")
  }

  return context
}
