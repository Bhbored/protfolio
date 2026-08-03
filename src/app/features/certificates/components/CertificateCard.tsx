import { BadgeCheck, ExternalLink } from "lucide-react"
import type { Certificate } from "../../../shared/types"
import { animStagger } from "../../../../lib/anim-delay"

interface CertificateCardProps {
  readonly certificate: Certificate
  readonly index: number
}

export default function CertificateCard({ certificate, index }: CertificateCardProps) {
  return (
    <div
      className={`group relative flex h-full min-h-80 w-full flex-col justify-between overflow-hidden border-l-[3px] border-primary-container bg-linear-to-br from-surface-container-low via-surface-container to-surface-container-high p-5 transition-all duration-500 hover:border-l-4 hover:shadow-glow-cyan motion-safe:hover:translate-x-1 animate-fade-in-up sm:p-6 md:min-h-90 md:p-8 ${animStagger(index)}`}
    >
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-primary/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-y-0 right-0 w-0.5 bg-primary/0 transition-colors duration-500 group-hover:bg-primary/30" />

      <div className="relative z-10 mb-4 flex items-start justify-between">
        <BadgeCheck className="text-3xl text-primary-container transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse md:text-4xl" />
        <span className="font-label text-[12px] tracking-widest text-slate-600">REF: {index + 1}</span>
      </div>

      <div className="relative z-10 mb-6 space-y-1">
        <h3 className="mb-1 font-headline text-lg font-bold uppercase tracking-tight text-white transition-all duration-500 group-hover:text-gradient md:text-xl">
          {certificate.title}
        </h3>
        <p className="font-body text-xs text-slate-400 md:text-sm">
          {certificate.issuer} &bull; {certificate.year}
        </p>
      </div>

      {certificate.top_skills.length > 0 && (
        <div className="relative z-10 mt-auto space-y-3">
          {certificate.top_skills.map((skill) => (
            <div key={skill.id}>
              <div className="mb-1 flex items-center justify-between">
                <span className="font-label text-[12px] uppercase tracking-widest text-slate-500 transition-colors duration-500 group-hover:text-slate-400">
                  {skill.title}
                </span>
                <span className="font-label text-[12px] text-slate-400 transition-colors duration-500 group-hover:text-primary/80">
                  {skill.mastery_level}%
                </span>
              </div>
              <div className="relative h-0.5 w-full overflow-hidden bg-surface-container-highest">
                <div
                  className="absolute h-full bg-primary shadow-glow-cyan"
                  style={{ width: `${skill.mastery_level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="absolute bottom-3 right-3 flex gap-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="size-1 rounded-full bg-primary/60" />
        <span className="size-1 rounded-full bg-primary/40" />
        <span className="size-1 rounded-full bg-primary/20" />
      </div>

      {certificate.link && (
        <div className="relative z-10 mt-4 border-t border-white/5 pt-3">
          <a
            href={certificate.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-label text-[10px] uppercase tracking-widest text-primary/60 transition-colors hover:text-primary"
          >
            <span>Verify Credential</span>
            <ExternalLink className="size-3" />
          </a>
        </div>
      )}
    </div>
  )
}
