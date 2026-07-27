import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useLanding } from "../../providers/LandingProvider"
import { useIsMobile } from "../../../hooks/use-mobile"
import CertificateCard from "./components/CertificateCard"

const pageSize = 4

export default function CertificatesSection() {
  const { certificates } = useLanding()
  const isMobile = useIsMobile()
  const [page, setPage] = useState(0)

  const pages: typeof certificates[] = []
  for (let i = 0; i < certificates.length; i += isMobile ? 2 : pageSize) {
    pages.push(certificates.slice(i, i + (isMobile ? 2 : pageSize)))
  }

  const totalPages = pages.length
  const next = () => setPage((p) => Math.min(p + 1, totalPages - 1))
  const prev = () => setPage((p) => Math.max(p - 1, 0))

  return (
    <section id="certificates" className="min-h-screen pt-16 md:pt-24 pb-20 md:pb-24 px-6 relative">
      {/* Background Mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20 -z-10 mesh-gradient">
        <div className="absolute top-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-80 md:w-[500px] h-80 md:h-[500px] bg-accent-orange/5 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <header className="mb-16 md:mb-24 relative max-w-384 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="inline-block relative">
            <span
              className="absolute -top-4 md:-top-6 left-0 font-label text-[8px] md:text-[10px] tracking-[0.4em] text-primary/40 uppercase animate-fade-in-up"
              style={{ animationDelay: "200ms", animationFillMode: "both", opacity: 0 }}
            >
              // VERIFIED_CREDENTIALS
            </span>
            <h1
              className="font-headline text-[48px] md:text-[80px] lg:text-[96px] font-black tracking-tighter uppercase leading-none animate-fade-in-left"
              style={{ animationDelay: "400ms", animationFillMode: "both", opacity: 0 }}
            >
              CERTIFIED<br /><span className="text-primary">COMPETENCE</span>
            </h1>
          </div>
          <div className="max-w-xs md:text-right border-r-2 md:border-r-0 md:border-l-2 border-primary/20 md:pl-6 pr-4 md:pr-0">
            <p
              className="text-slate-400 text-xs md:text-sm leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "600ms", animationFillMode: "both", opacity: 0 }}
            >
              Professional certifications and technical achievements.
            </p>
          </div>
        </div>
        <div
          className="mt-4 flex items-center gap-2 animate-fade-in-up"
          style={{ animationDelay: "800ms", animationFillMode: "both", opacity: 0 }}
        >
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="font-label text-[10px] tracking-[0.3em] uppercase text-slate-500">
            {certificates.length} Credentials Verified
          </span>
        </div>
      </header>

      {/* Track */}
      <div className="max-w-384 mx-auto relative">
        <div className="overflow-hidden max-md:overflow-x-auto max-md:scrollbar-none">
          <div
            className="flex gap-12 transition-transform duration-500 ease-in-out"
            style={!isMobile ? { transform: `translateX(-${page * 100}%)` } : undefined}
          >
            {pages.map((pageCerts, pi) => (
              <div key={pi} className="flex gap-12 shrink-0 w-full">
                {pageCerts.map((cert) => {
                  const realIndex = certificates.indexOf(cert)
                  return (
                    <div
                      key={cert.Id}
                      className="shrink-0 w-[calc(50vw-48px)] md:w-[calc(25vw-48px)] min-w-[240px] md:min-w-[280px] md:max-w-[360px]"
                    >
                      <CertificateCard certificate={cert} index={realIndex} />
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Nav */}
        <div className="flex justify-between items-center mt-12 hidden md:flex">
          <button
            onClick={prev}
            disabled={page === 0}
            className="flex items-center gap-2 px-6 py-3 bg-surface-container-high border border-outline-variant/30 text-primary font-label text-xs tracking-widest uppercase hover:border-primary/50 hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Previous
          </button>
          <span className="text-on-surface-variant font-label text-xs tracking-widest">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={next}
            disabled={page + 1 >= totalPages}
            className="flex items-center gap-2 px-6 py-3 bg-surface-container-high border border-outline-variant/30 text-primary font-label text-xs tracking-widest uppercase hover:border-primary/50 hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  )
}
