import { Link } from "react-router-dom"
import { Check, ChevronRight } from "lucide-react"
import DashPanel, { PanelHeader } from "./DashPanel"

export interface HealthItem {
  readonly id: string
  readonly label: string
  readonly done: boolean
  readonly to: string
}

interface ContentHealthProps {
  readonly items: readonly HealthItem[]
  readonly loading: boolean
}

function Ring({ pct }: { readonly pct: number }) {
  const r = 36
  const c = 2 * Math.PI * r
  const offset = c - (pct / 100) * c

  return (
    <div className="relative mx-auto size-24 sm:size-28">
      <svg viewBox="0 0 88 88" className="size-full -rotate-90" aria-hidden>
        <circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-white/10"
        />
        <circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          stroke="url(#healthGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="motion-safe:transition-[stroke-dashoffset] motion-safe:duration-700"
        />
        <defs>
          <linearGradient id="healthGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#ff4d00" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-headline text-xl font-bold tabular-nums text-on-surface sm:text-2xl">
          {pct}%
        </span>
        <span className="font-label text-[9px] uppercase tracking-wider text-on-surface-variant">
          Ready
        </span>
      </div>
    </div>
  )
}

export default function ContentHealth({ items, loading }: ContentHealthProps) {
  const doneCount = items.filter((i) => i.done).length
  const total = items.length
  const pct = total === 0 ? 0 : Math.round((doneCount / total) * 100)
  const next = items.find((i) => !i.done)

  return (
    <DashPanel className="h-full">
      <PanelHeader
        title="Content health"
        subtitle="Portfolio completeness"
        action={
          !loading ? (
            <span className="rounded-full bg-white/5 px-2.5 py-1 font-label text-[10px] tabular-nums text-on-surface-variant">
              {doneCount}/{total}
            </span>
          ) : null
        }
      />

      {loading ? (
        <div className="flex animate-pulse flex-col items-center gap-5">
          <div className="size-24 rounded-full bg-white/10 sm:size-28" />
          <div className="w-full space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 rounded-xl bg-white/5" />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <Ring pct={pct} />

          {next ? (
            <Link
              to={next.to}
              className="flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-primary/25 bg-primary/10 px-3.5 py-3 transition-colors hover:bg-primary/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <div className="min-w-0">
                <p className="font-label text-[10px] uppercase tracking-[0.14em] text-primary">
                  Next up
                </p>
                <p className="truncate font-body text-sm text-on-surface">{next.label}</p>
              </div>
              <ChevronRight className="size-4 shrink-0 text-primary" aria-hidden />
            </Link>
          ) : (
            <div className="rounded-2xl border border-primary/20 bg-primary/10 px-3.5 py-3 text-center">
              <p className="font-body text-sm text-primary">Portfolio looks complete</p>
            </div>
          )}

          <ul className="grid grid-cols-1 gap-1.5">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.to}
                  className="flex min-h-11 items-center gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
                      item.done
                        ? "bg-primary text-background"
                        : "border border-white/15 bg-transparent text-transparent"
                    }`}
                  >
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  <span
                    className={`font-body text-sm ${
                      item.done ? "text-on-surface-variant line-through decoration-white/20" : "text-on-surface"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </DashPanel>
  )
}
