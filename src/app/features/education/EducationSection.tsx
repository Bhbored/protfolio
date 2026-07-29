import { useLanding } from "../../providers/LandingProvider"
import EducationCard from "./components/EducationCard"

export default function EducationSection() {
  const { educations } = useLanding()

  return (
    <section id="education" className="min-h-screen pt-16 md:pt-24 pb-24 md:pb-32 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20 -z-10 mesh-gradient">
        <div className="absolute top-1/3 right-1/3 w-64 md:w-96 h-64 md:h-96 bg-primary/8 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 left-1/3 w-80 md:w-[500px] h-80 md:h-[500px] bg-accent-orange/5 blur-[150px] rounded-full" />
      </div>

      <header className="mb-16 md:mb-24 relative max-w-384 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="inline-block relative">
            <span
              className="absolute -top-4 md:-top-6 left-0 font-label text-[8px] md:text-[10px] tracking-[0.4em] text-primary/40 uppercase animate-fade-in-up"
              style={{ animationDelay: "200ms", animationFillMode: "both", opacity: 0 }}
            >
              // ACADEMIC_FOUNDATION
            </span>
            <h1
              className="font-headline text-[48px] md:text-[80px] lg:text-[96px] font-black tracking-tighter uppercase leading-none animate-fade-in-left"
              style={{ animationDelay: "400ms", animationFillMode: "both", opacity: 0 }}
            >
              KNOWLEDGE<br /><span className="text-primary">BASELINE</span>
            </h1>
          </div>
          <div className="max-w-xs md:text-right border-r-2 md:border-r-0 md:border-l-2 border-primary/20 md:pl-6 pr-4 md:pr-0">
            <p
              className="text-slate-400 text-xs md:text-sm leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "600ms", animationFillMode: "both", opacity: 0 }}
            >
              Academic achievements and educational background.
            </p>
          </div>
        </div>
        <div
          className="mt-4 flex items-center gap-2 animate-fade-in-up"
          style={{ animationDelay: "800ms", animationFillMode: "both", opacity: 0 }}
        >
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="font-label text-[10px] tracking-[0.3em] uppercase text-slate-500">
            {educations.length} Institutions
          </span>
        </div>
      </header>

      <div className="max-w-384 mx-auto relative">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 justify-center">
          {educations.map((edu, i) => (
            <div key={edu.Id} className="w-full md:w-[calc(50%-48px)] max-w-[600px] min-w-[280px] md:min-w-[400px]">
              <EducationCard education={edu} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
