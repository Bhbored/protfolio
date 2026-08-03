import { Briefcase } from "lucide-react"
import type { Experience } from "../../../shared/types"
import { animStagger } from "../../../../lib/anim-delay"

interface ExperienceTimelineCardProps {
  readonly experience: Experience
  readonly isLeft: boolean
  readonly index: number
  readonly isActive: boolean
}

export default function ExperienceTimelineCard({
  experience,
  isLeft,
  index,
  isActive,
}: ExperienceTimelineCardProps) {
  const layerLabel = isActive ? "Current_Execution" : "Archive_Log"

  const card = (
    <div className="group relative overflow-hidden rounded-xl border border-outline-variant/20 bg-linear-to-br from-surface-container-high via-surface-container to-surface-container-low p-5 shadow-2xl transition-all duration-500 hover:border-primary/40 hover:shadow-glow-cyan sm:p-6 md:p-8 motion-safe:hover:scale-[1.01]">
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-primary/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10 mb-4 flex flex-wrap items-center gap-2 sm:mb-6">
        <span className="font-label text-[10px] uppercase tracking-widest text-slate-500">
          Layer_{(index + 1).toString().padStart(2, "0")} // {layerLabel}
        </span>
        <span className="rounded-md bg-primary/10 px-2 py-0.5 font-label text-[10px] uppercase tracking-wider text-primary md:hidden">
          {experience.period}
        </span>
      </div>

      <div className="relative z-10 mb-5 flex items-start justify-between gap-3 sm:mb-6">
        <div className="min-w-0">
          <h3 className="font-headline text-lg font-bold text-white transition-all duration-500 group-hover:text-gradient sm:text-xl md:text-2xl">
            {experience.company}
          </h3>
          <p className="mt-1 font-label text-xs font-semibold tracking-wide text-primary sm:text-sm">
            {experience.title.toUpperCase()}
          </p>
        </div>
        <Briefcase className="size-7 shrink-0 text-primary/30 transition-all duration-300 group-hover:text-primary/80 sm:size-8" aria-hidden />
      </div>

      <ul className="relative z-10 space-y-3 text-xs leading-relaxed text-slate-400 sm:space-y-4 sm:text-sm">
        {experience.description.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  const periodDesktop = (
    <div
      className={`hidden items-center gap-4 md:flex ${isLeft ? "justify-start pl-16 lg:pl-24" : "justify-end pr-16 lg:pr-24"}`}
    >
      <div className={`flex items-center gap-4 ${isLeft ? "origin-left rotate-90" : "origin-right -rotate-90"}`}>
        {!isLeft && <div className="h-0.5 w-12 bg-primary/20" />}
        <span className="whitespace-nowrap font-headline text-xl font-bold tracking-tighter text-primary/40 lg:text-2xl">
          {experience.period}
        </span>
        {isLeft && <div className="h-0.5 w-12 bg-primary/20" />}
      </div>
    </div>
  )

  return (
    <div
      className={`relative w-full animate-fade-in-up md:grid md:grid-cols-2 md:items-center ${animStagger(index, 200, 400)}`}
    >
      <div className="absolute bottom-0 left-3 top-0 w-px bg-linear-to-b from-primary to-accent-orange/60 md:hidden" aria-hidden />
      <div
        className={`absolute left-[7px] top-6 z-10 size-2.5 -translate-x-1/2 rounded-full border-2 md:hidden ${
          isActive ? "border-primary bg-primary shadow-glow-cyan animate-pulse" : "border-white/40 bg-white/20"
        }`}
        aria-hidden
      />

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:flex">
        <div
          className={`size-4 rounded-full ${
            isActive ? "bg-primary shadow-glow-cyan animate-pulse" : "border-2 border-white/40 bg-white/20"
          }`}
        />
      </div>

      {isLeft ? (
        <>
          <div className="pl-8 md:order-1 md:pl-0 md:pr-16 lg:pr-24">{card}</div>
          <div className="md:order-2">{periodDesktop}</div>
        </>
      ) : (
        <>
          <div className="md:order-1">{periodDesktop}</div>
          <div className="pl-8 md:order-2 md:pl-16 md:pr-0 lg:pl-24">{card}</div>
        </>
      )}
    </div>
  )
}
