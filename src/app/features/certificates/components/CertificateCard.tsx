import { BadgeCheck, ExternalLink } from "lucide-react"
import type { Certificate } from "../../../shared/types"

interface CertificateCardProps {
  readonly certificate: Certificate
  readonly index: number
}

export default function CertificateCard({ certificate, index }: CertificateCardProps) {
  const shadowOpacity = index % 2 === 0 ? "0.3" : "0.1"

  return (
    <div
      className="group relative bg-linear-to-br from-surface-container-low via-surface-container to-surface-container-high border-l-[3px] border-primary-container p-6 md:p-8 flex flex-col justify-between h-90 w-fit max-w-[420px] transition-all duration-500 hover:translate-x-2 hover:shadow-glow-cyan hover:border-l-4 animate-fade-in-up overflow-hidden"
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: "both", opacity: 0 }}
    >
      {/* Gradient sweep */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Right edge glow */}
      <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-primary/0 group-hover:bg-primary/30 transition-colors duration-500" />

      <div className="flex justify-between items-start mb-4 relative z-10">
        <BadgeCheck className="text-primary-container text-3xl md:text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse" />
        <span className="font-label text-[12px] text-slate-600 tracking-widest">REF: {index + 1}</span>
      </div>

      <div className="space-y-1 mb-6 relative z-10">
        <h3 className="font-headline text-lg md:text-xl font-bold uppercase tracking-tight text-white mb-1 group-hover:text-gradient transition-all duration-500">
          {certificate.Title}
        </h3>
        <p className="font-body text-xs md:text-sm text-slate-400">
          {certificate.Issuer} &bull; {certificate.Year}
        </p>
      </div>

      {/* Top 3 Skills */}
      {certificate.TopSKills.length > 0 && (
        <div className="space-y-3 mt-auto relative z-10">
          {certificate.TopSKills.map((skill) => (
            <div key={skill.Id}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[12px] font-label tracking-widest text-slate-500 uppercase group-hover:text-slate-400 transition-colors duration-500">
                  {skill.Title}
                </span>
                <span className="text-[12px] font-label text-slate-400 group-hover:text-primary/80 transition-colors duration-500">
                  {skill.MasteryLevel}%
                </span>
              </div>
              <div className="h-0.5 bg-surface-container-highest w-full relative overflow-hidden">
                <div
                  className="absolute h-full bg-primary"
                  style={{ width: `${skill.MasteryLevel}%`, boxShadow: `0 0 8px rgba(0, 240, 255, ${shadowOpacity})` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dots */}
      <div className="absolute bottom-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="w-1 h-1 rounded-full bg-primary/60" />
        <span className="w-1 h-1 rounded-full bg-primary/40" />
        <span className="w-1 h-1 rounded-full bg-primary/20" />
      </div>

      {/* Credential Link */}
      {certificate.Link && (
        <div className="mt-4 pt-3 border-t border-white/5 relative z-10">
          <a
            href={certificate.Link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] font-label text-primary/60 hover:text-primary transition-colors tracking-widest uppercase"
          >
            <span>Verify Credential</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  )
}
