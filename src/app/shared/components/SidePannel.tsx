import { useEffect, useRef } from "react"
import type { ReactNode } from "react"
import { X } from "lucide-react"

interface SidePannelProps {
  readonly open: boolean
  readonly onClose: () => void
  readonly title: string
  readonly description?: string
  readonly children: ReactNode
  readonly footer?: ReactNode
  readonly widthClassName?: string
}

export default function SidePannel({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  widthClassName = "w-full max-w-lg",
}: SidePannelProps) {
  const panelRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleKeyDown)
    panelRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose, open])

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={`absolute inset-0 cursor-pointer bg-black/70 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none ${
          open ? "opacity-100" : "opacity-0"
        }`}
        aria-label={`Close ${title}`}
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="side-pannel-title"
        aria-describedby={description ? "side-pannel-description" : undefined}
        tabIndex={-1}
        className={`fixed inset-y-0 right-0 flex ${widthClassName} flex-col border-l border-white/10 bg-surface-container-high shadow-glow-cyan outline-none transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div className="min-w-0">
            <h2 id="side-pannel-title" className="font-headline text-xl font-bold text-on-surface">
              {title}
            </h2>
            {description ? (
              <p id="side-pannel-description" className="mt-1 font-body text-sm leading-6 text-on-surface-variant">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center text-on-surface-variant transition-colors hover:bg-surface-container-highest hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={`Close ${title}`}
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">{children}</div>

        {footer ? (
          <footer className="sticky bottom-0 border-t border-white/10 bg-surface-container-high px-6 py-4">
            {footer}
          </footer>
        ) : null}
      </aside>
    </div>
  )
}
