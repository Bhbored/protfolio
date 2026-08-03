import { capitalizeName } from "../../../lib/capitalizer"
import { useLanding } from "../../providers/LandingProvider"
import AvailabilityBadge from "./components/AvailabilityBadge"
import PortraitSection from "./components/PortraitSection"
import ScrollIndicator from "./components/ScrollIndicator"

export default function HeroSection() {
  const { personalInfo: info } = useLanding()
  const name = capitalizeName(info.name)

  return (
    <section
      id="home"
      className="relative flex min-h-dvh w-full items-center overflow-hidden px-4 pt-20 pb-16 mesh-gradient sm:px-6 md:px-12 md:pt-0 md:pb-0"
    >
      <div className="absolute inset-0 grid-pattern opacity-10" aria-hidden />

      <div className="relative mx-auto flex h-full w-full max-w-384 flex-col items-center gap-8 md:flex-row md:gap-12 lg:gap-16">
        <div className="relative z-10 flex w-full flex-col items-center text-center md:w-3/5 md:items-start md:pt-20 md:text-left">
          <h1 className="anim-d-200 select-none font-headline text-4xl font-bold leading-[0.9] tracking-tight text-white motion-safe:animate-fade-in-up sm:text-5xl md:text-7xl md:motion-safe:animate-fade-in-left lg:text-[96px] xl:text-[120px]">
            {name}
          </h1>
          <h2 className="anim-d-400 mt-2 select-none font-headline text-3xl font-bold leading-[0.9] tracking-tight text-gradient motion-safe:animate-fade-in-up sm:text-4xl md:mt-4 md:text-6xl md:motion-safe:animate-fade-in-left lg:text-[96px] xl:text-[120px]">
            {info.title}
          </h2>

          <div className="mt-8 flex max-w-md flex-col items-center gap-5 sm:mt-10 md:mt-16 md:max-w-none md:flex-row md:items-start md:gap-10 lg:mt-24">
            {info.is_available_for_work && <AvailabilityBadge />}
            <p className="anim-d-600 font-body text-sm leading-relaxed text-white/70 motion-safe:animate-fade-in-up md:max-w-xs md:text-white/80">
              {info.summary}
            </p>
          </div>
        </div>

        <div className="anim-d-500 relative h-[42vh] w-full max-w-sm motion-safe:animate-scale-in sm:h-[48vh] md:h-[70vh] md:w-2/5 md:max-w-none md:motion-safe:animate-fade-in-right">
          <PortraitSection />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
