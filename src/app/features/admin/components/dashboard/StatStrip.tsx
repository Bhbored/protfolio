import { Link } from "react-router-dom"
import type { LucideIcon } from "lucide-react"

export interface StatItem {
  readonly label: string
  readonly value: number
  readonly icon: LucideIcon
  readonly to: string
}

interface StatStripProps {
  readonly stats: readonly StatItem[]
  readonly loading: boolean
}

export default function StatStrip({ stats, loading }: StatStripProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[88px] animate-pulse rounded-2xl border border-white/[0.08] bg-surface-container-high sm:h-[100px]"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {stats.map(({ label, value, icon: Icon, to }, index) => (
        <Link
          key={label}
          to={to}
          className={`group relative flex min-h-[88px] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-surface-container-high p-3.5 transition-all duration-200 active:scale-[0.98] motion-safe:animate-fade-in-up motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-primary/40 motion-safe:hover:shadow-glow-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-h-[100px] sm:p-4 ${[`anim-d-0`, `anim-d-50`, `anim-d-100`, `anim-d-150`, `anim-d-200`, `anim-d-250`][index] ?? "anim-d-0"}`}
        >
          <div
            className="pointer-events-none absolute -right-6 -top-6 size-20 rounded-full bg-primary/0 transition-colors group-hover:bg-primary/10"
            aria-hidden
          />
          <div className="flex items-center justify-between gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-10">
              <Icon className="size-4 sm:size-[18px]" aria-hidden />
            </span>
            <span className="font-headline text-2xl font-bold tabular-nums leading-none text-on-surface sm:text-3xl">
              {value}
            </span>
          </div>
          <p className="font-label text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">
            {label}
          </p>
        </Link>
      ))}
    </div>
  )
}
