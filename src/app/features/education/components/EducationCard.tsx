import { GraduationCap } from "lucide-react"
import type { Education } from "../../../shared/types"

interface EducationCardProps {
  readonly education: Education
  readonly index: number
}

export default function EducationCard({ education, index }: EducationCardProps) {
  return (
    <div
      className="group relative bg-linear-to-br from-surface-container-high via-surface-container to-surface-container-low border border-outline-variant/20 p-6 md:p-8 transition-all duration-500 hover:border-primary/40 hover:shadow-glow-cyan hover:scale-[1.02] animate-fade-in-up overflow-hidden"
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: "both", opacity: 0 }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[3px] border-r-[3px] border-transparent group-hover:border-primary/50 transition-all duration-500" />

      <div className="inline-flex items-center gap-2 mb-4 relative z-10">
        <span className="font-label text-[10px] tracking-widest text-primary bg-primary/10 border border-primary/20 px-3 py-1">
          {education.Year}
        </span>
        <div className="flex-1 h-[1px] bg-linear-to-r from-primary/20 to-transparent" />
      </div>

      <div className="space-y-3 relative z-10">
        <div className="flex items-start gap-3">
          <GraduationCap className="text-primary/80 text-xl mt-0.5 group-hover:animate-pulse shrink-0" />
          <h3 className="font-headline text-lg md:text-xl font-bold uppercase tracking-tight text-white leading-tight group-hover:text-gradient">
            {education.Title}
          </h3>
        </div>
        <p className="font-body text-xs md:text-sm text-slate-400 pl-9">{education.Issuer}</p>
      </div>

      <div className="absolute bottom-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="w-1 h-1 rounded-full bg-primary/60" />
        <span className="w-1 h-1 rounded-full bg-primary/40" />
        <span className="w-1 h-1 rounded-full bg-primary/20" />
      </div>
    </div>
  )
}
