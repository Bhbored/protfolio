import { useLanding } from "../../providers/LandingProvider"
import ExperienceTimelineCard from "./components/ExperienceTimelineCard"

export default function ExperienceSection() {
  const { experiences } = useLanding()

  return (
    <section id="experience" className="min-h-screen pt-16 md:pt-24 pb-24 md:pb-32 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20 -z-10 mesh-gradient">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-80 md:w-[500px] h-80 md:h-[500px] bg-accent-orange/5 blur-[150px] rounded-full" />
      </div>

      <header className="mb-16 md:mb-32 relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8">
          <div className="inline-block relative">
            <span
              className="absolute -top-4 md:-top-6 left-0 font-label text-[8px] md:text-[10px] tracking-[0.4em] text-primary/40 uppercase animate-fade-in-up"
              style={{ animationDelay: "200ms", animationFillMode: "both", opacity: 0 }}
            >
              // PROFESSIONAL_TRAJECTORY
            </span>
            <h1
              className="font-headline text-[48px] md:text-[80px] lg:text-[96px] font-black tracking-tighter uppercase leading-none animate-fade-in-left"
              style={{ animationDelay: "400ms", animationFillMode: "both", opacity: 0 }}
            >
              Work<br /><span className="text-primary">Experience</span>
            </h1>
          </div>
          <div className="max-w-xs md:text-right border-r-2 md:border-r-0 md:border-l-2 border-primary/20 md:pl-6 pr-4 md:pr-0">
            <p
              className="text-slate-400 text-xs md:text-sm leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "600ms", animationFillMode: "both", opacity: 0 }}
            >
              Professional journey and key achievements.
            </p>
          </div>
        </div>
      </header>

      <div className="relative w-full max-w-7xl mx-auto">
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-linear-to-b from-primary to-accent-orange opacity-50 z-0 hidden md:block" />
        <div className="relative z-10 flex flex-col gap-24 md:gap-40">
          {experiences.map((exp, i) => (
            <ExperienceTimelineCard
              key={i}
              experience={exp}
              isLeft={i % 2 === 0}
              index={i}
              isActive={i === 0}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-20 left-10 font-label text-[8rem] md:text-[10rem] font-bold text-white/[0.02] tracking-tighter pointer-events-none select-none hidden md:block">
        2024_XP
      </div>
    </section>
  )
}
