import { GraduationCap } from "lucide-react"
import type { Education } from "../../../shared/types"
import { animStagger } from "../../../../lib/anim-delay"

interface EducationCardProps {
  readonly education: Education
  readonly index: number
}

export default function EducationCard({ education, index }: EducationCardProps) {
  return (
    <div
      className={`group relative overflow-hidden border border-outline-variant/20 bg-linear-to-br from-surface-container-high via-surface-container to-surface-container-low p-6 transition-all duration-500 hover:scale-[1.02] hover:border-primary/40 hover:shadow-glow-cyan animate-fade-in-up md:p-8 ${animStagger(index)}`}
    >
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-primary/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute top-0 right-0 size-0 border-t-[3px] border-r-[3px] border-transparent transition-all duration-500 group-hover:border-primary/50" />

      <div className="relative z-10 mb-4 inline-flex items-center gap-2">
        <span className="border border-primary/20 bg-primary/10 px-3 py-1 font-label text-[10px] tracking-widest text-primary">
          {education.year}
        </span>
        <div className="h-px flex-1 bg-linear-to-r from-primary/20 to-transparent" />
      </div>

      <div className="relative z-10 space-y-3">
        <div className="flex items-start gap-3">
          <GraduationCap className="mt-0.5 shrink-0 text-xl text-primary/80 group-hover:animate-pulse" />
          <h3 className="font-headline text-lg font-bold uppercase leading-tight tracking-tight text-white group-hover:text-gradient md:text-xl">
            {education.title}
          </h3>
        </div>
        <p className="pl-9 font-body text-xs text-slate-400 md:text-sm">{education.issuer}</p>
      </div>

      <div className="absolute bottom-3 right-3 flex gap-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="size-1 rounded-full bg-primary/60" />
        <span className="size-1 rounded-full bg-primary/40" />
        <span className="size-1 rounded-full bg-primary/20" />
      </div>
    </div>
  )
}
