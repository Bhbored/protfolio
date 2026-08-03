import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import type { Education, Experience } from "../../../../shared/types"
import DashPanel, { PanelHeader } from "./DashPanel"

interface CareerTimelineProps {
  readonly experiences: readonly Experience[]
  readonly educations: readonly Education[]
  readonly loading: boolean
}

function Empty({ label, to }: { readonly label: string; readonly to: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-white/12 px-3 py-10 text-center">
      <p className="font-body text-xs text-on-surface-variant">{label}</p>
      <Link
        to={to}
        className="inline-flex min-h-10 items-center font-label text-[10px] uppercase tracking-widest text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Add entry
      </Link>
    </div>
  )
}

export default function CareerTimeline({
  experiences,
  educations,
  loading,
}: CareerTimelineProps) {
  const recentExp = experiences.slice(0, 4)
  const recentEdu = educations.slice(0, 4)

  return (
    <DashPanel>
      <PanelHeader
        title="Career"
        subtitle="Experience & education"
      />

      {loading ? (
        <div className="grid grid-cols-1 gap-6 animate-pulse md:grid-cols-2">
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 rounded-2xl bg-white/5" />
            ))}
          </div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 rounded-2xl bg-white/5" />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-6">
          
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-label text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
                Experience
              </h3>
              <Link
                to="/admin/experiences"
                className="inline-flex min-h-9 items-center gap-1 font-label text-[10px] uppercase tracking-widest text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Manage
                <ArrowUpRight className="size-3" aria-hidden />
              </Link>
            </div>
            {recentExp.length === 0 ? (
              <Empty label="No experience yet" to="/admin/experiences" />
            ) : (
              <ul className="space-y-3">
                {recentExp.map((item) => (
                  <li
                    key={item.id ?? `${item.company}-${item.title}`}
                    className="relative rounded-2xl border border-white/[0.06] bg-black/20 p-4 pl-5"
                  >
                    <span
                      className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-primary"
                      aria-hidden
                    />
                    <p className="font-headline text-sm font-bold text-on-surface">
                      {item.title}
                    </p>
                    <p className="mt-0.5 font-body text-xs text-on-surface-variant">
                      {item.company}
                    </p>
                    <p className="mt-2 font-label text-[10px] uppercase tracking-wider text-primary">
                      {item.period}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-label text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
                Education
              </h3>
              <Link
                to="/admin/educations"
                className="inline-flex min-h-9 items-center gap-1 font-label text-[10px] uppercase tracking-widest text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Manage
                <ArrowUpRight className="size-3" aria-hidden />
              </Link>
            </div>
            {recentEdu.length === 0 ? (
              <Empty label="No education yet" to="/admin/educations" />
            ) : (
              <ul className="space-y-3">
                {recentEdu.map((item) => (
                  <li
                    key={item.id}
                    className="relative rounded-2xl border border-white/[0.06] bg-black/20 p-4 pl-5"
                  >
                    <span
                      className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-secondary"
                      aria-hidden
                    />
                    <p className="font-headline text-sm font-bold text-on-surface">
                      {item.title}
                    </p>
                    <p className="mt-0.5 font-body text-xs text-on-surface-variant">
                      {item.issuer}
                    </p>
                    <p className="mt-2 font-label text-[10px] uppercase tracking-wider text-secondary">
                      {item.year}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </DashPanel>
  )
}
