import type { ReactNode } from "react"

interface DashPanelProps {
  readonly children: ReactNode
  readonly className?: string
  readonly padded?: boolean
}

export default function DashPanel({
  children,
  className = "",
  padded = true,
}: DashPanelProps) {
  return (
    <section
      className={[
        "relative overflow-hidden rounded-3xl border border-white/[0.08]",
        "bg-surface-container-high/80 backdrop-blur-sm",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]",
        padded ? "p-4 sm:p-5 md:p-6" : "",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  )
}

export function PanelHeader({
  title,
  subtitle,
  action,
}: {
  readonly title: string
  readonly subtitle?: string
  readonly action?: ReactNode
}) {
  return (
    <header className="mb-4 flex items-start justify-between gap-3 sm:mb-5">
      <div className="min-w-0">
        <h2 className="font-headline text-base font-bold tracking-tight text-on-surface sm:text-lg">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-0.5 font-body text-xs text-on-surface-variant sm:text-sm">
            {subtitle}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  )
}
