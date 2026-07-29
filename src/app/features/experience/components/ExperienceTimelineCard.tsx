import { Briefcase } from "lucide-react"
import type { Experience } from "../../../shared/types"

interface ExperienceTimelineCardProps {
  readonly experience: Experience
  readonly isLeft: boolean
  readonly index: number
  readonly isActive: boolean
}

export default function ExperienceTimelineCard({ experience, isLeft, index, isActive }: ExperienceTimelineCardProps) {
  const layerLabel = isActive ? "Current_Execution" : "Archive_Log"

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 items-center w-full relative animate-fade-in-up"
      style={{ animationDelay: `${index * 200 + 400}ms`, animationFillMode: "both", opacity: 0 }}
    >
      {/* Left-aligned card */}
      {isLeft ? (
        <>
          <div className="pr-0 md:pr-24 order-2 md:order-1">
            <div className="group relative bg-linear-to-br from-surface-container-high via-surface-container to-surface-container-low border border-outline-variant/20 p-6 md:p-8 rounded-xl shadow-2xl transition-all duration-500 hover:border-primary/40 hover:shadow-glow-cyan hover:scale-[1.02] hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute -top-6 left-0 font-label text-[10px] text-slate-500 tracking-widest uppercase z-10">
                Layer_{(index + 1).toString().padStart(2, "0")} // {layerLabel}
              </span>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <h3 className="font-headline text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-gradient transition-all duration-500">
                    {experience.Company}
                  </h3>
                  <p className="text-primary font-label tracking-wide text-xs md:text-sm font-semibold">
                    {experience.Title.toUpperCase()}
                  </p>
                </div>
                <Briefcase className="text-primary/30 group-hover:text-primary/80 group-hover:animate-pulse transition-all duration-300 text-3xl" />
              </div>
              <ul className="space-y-3 md:space-y-4 text-slate-400 text-xs md:text-sm leading-relaxed relative z-10">
                {experience.Description.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="absolute bottom-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="w-1 h-1 rounded-full bg-primary/60" />
                <span className="w-1 h-1 rounded-full bg-primary/40" />
                <span className="w-1 h-1 rounded-full bg-primary/20" />
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-10">
            <div className={`w-4 h-4 bg-primary rounded-full shadow-glow-cyan ${isActive ? "animate-pulse" : ""}`} />
          </div>
          <div className="hidden md:flex justify-start pl-24 order-3">
            <div className="rotate-90 origin-left flex items-center gap-4">
              <span className="font-headline font-bold text-xl lg:text-2xl text-primary/40 tracking-tighter whitespace-nowrap">
                {experience.Period}
              </span>
              <div className="w-12 h-0.5 bg-primary/20" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="hidden md:flex justify-end pr-24 order-1">
            <div className="-rotate-90 origin-right flex items-center gap-4">
              <div className="w-12 h-0.5 bg-primary/20" />
              <span className="font-headline font-bold text-xl lg:text-2xl text-primary/40 tracking-tighter whitespace-nowrap uppercase">
                {experience.Period}
              </span>
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-10">
            <div className="w-4 h-4 bg-white/20 border-2 border-white/40 rounded-full" />
          </div>
          <div className="pl-0 md:pl-24 order-2">
            <div className="group relative bg-linear-to-br from-surface-container-high via-surface-container to-surface-container-low border border-outline-variant/20 p-6 md:p-8 rounded-xl shadow-2xl transition-all duration-500 hover:border-primary/40 hover:shadow-glow-cyan hover:scale-[1.02] hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute -top-6 left-0 font-label text-[10px] text-slate-500 tracking-widest uppercase z-10">
                Layer_{(index + 1).toString().padStart(2, "0")} // {layerLabel}
              </span>
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  <h3 className="font-headline text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-gradient transition-all duration-500">
                    {experience.Company}
                  </h3>
                  <p className="text-primary font-label tracking-wide text-xs md:text-sm font-semibold">
                    {experience.Title.toUpperCase()}
                  </p>
                </div>
                <Briefcase className="text-primary/30 group-hover:text-primary/80 group-hover:animate-pulse transition-all duration-300 text-3xl" />
              </div>
              <ul className="space-y-3 md:space-y-4 text-slate-400 text-xs md:text-sm leading-relaxed relative z-10">
                {experience.Description.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="absolute bottom-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="w-1 h-1 rounded-full bg-primary/60" />
                <span className="w-1 h-1 rounded-full bg-primary/40" />
                <span className="w-1 h-1 rounded-full bg-primary/20" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
