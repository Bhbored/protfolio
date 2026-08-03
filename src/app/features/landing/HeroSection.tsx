import { capitalizeName } from "../../../lib/capitalizer"
import { useLanding } from "../../providers/LandingProvider"
import AvailabilityBadge from "./components/AvailabilityBadge"
import PortraitSection from "./components/PortraitSection"
import ScrollIndicator from "./components/ScrollIndicator"

export default function HeroSection() {
  const { personalInfo: info } = useLanding()
  const name = capitalizeName(info.name)

  return (
    <section id="home" className="relative h-screen w-full flex items-center px-6 md:px-12 mesh-gradient overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="w-full max-w-384 mx-auto h-full flex items-center">
        {/* Desktop Layout */}
        <div className="hidden md:flex flex-row items-center gap-12 w-full">
          <div className="w-full md:w-3/5 relative z-10 flex flex-col items-start pt-20">
            <div className="flex flex-col gap-0">
              <div className="relative">
                <h1
                  className="font-headline text-[72px] md:text-[96px] lg:text-[120px] font-bold text-white leading-[0.85] tracking-tight animate-fade-in-left select-none"
                  style={{ animationDelay: "300ms", animationFillMode: "forwards", opacity: 0 }}
                >
                  {name}
                </h1>
                <h1
                  className="font-headline text-[72px] md:text-[96px] lg:text-[120px] font-bold text-gradient leading-[0.85] tracking-tight mt-4 animate-fade-in-left select-none"
                  style={{ animationDelay: "500ms", animationFillMode: "forwards", opacity: 0 }}
                >
                  {info.title}
                </h1>
              </div>
            </div>

            <div className="mt-16 md:mt-24 flex items-center gap-8 md:gap-12">
              {info.is_available_for_work && <AvailabilityBadge />}
              <div
                className="max-w-xs animate-fade-in-up"
                style={{ animationDelay: "700ms", animationFillMode: "both", opacity: 0 }}
              >
                <p className="font-body text-white/80 text-sm leading-relaxed">
                  {info.summary}
                </p>
              </div>
            </div>
          </div>

          <div
            className="hidden md:block w-full md:w-2/5 h-[70vh] relative animate-fade-in-right"
            style={{ animationDelay: "600ms", animationFillMode: "both", opacity: 0 }}
          >
            <PortraitSection portraitUrl={info.profile_image} />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden flex-col items-center justify-center w-full pt-20 pb-12">
          <div className="w-full flex flex-col items-center text-center">
            <div className="flex flex-col gap-0">
              <div className="relative">
                <h1
                  className="font-headline text-[64px] font-bold text-white leading-[0.9] tracking-tight animate-fade-in-up select-none"
                  style={{ animationDelay: "300ms", animationFillMode: "forwards", opacity: 0 }}
                >
                  {name.split("").map((letter, i) => (
                    <span
                      key={i}
                      className="inline-block relative hover:-translate-y-2 transition-transform duration-300"
                    >
                      {letter === " " ? "\u00A0" : letter}
                      <span
                        className="absolute -top-6 left-0 opacity-0 group-hover:opacity-100 transition-opacity text-primary text-[10px]"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      >
                        ↑
                      </span>
                    </span>
                  ))}
                </h1>
                <h1
                  className="font-headline text-[64px] font-bold text-gradient leading-[0.9] tracking-tight mt-2 animate-fade-in-up select-none"
                  style={{ animationDelay: "500ms", animationFillMode: "forwards", opacity: 0 }}
                >
                  {info.title}
                </h1>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-6">
              {info.is_available_for_work && <AvailabilityBadge />}
              <div
                className="max-w-sm animate-fade-in-up"
                style={{ animationDelay: "700ms", animationFillMode: "both", opacity: 0 }}
              >
                <p className="font-body text-white/40 text-sm leading-relaxed">
                  {info.summary}
                </p>
              </div>
            </div>
          </div>

          <div
            className="w-full h-[40vh] mt-8 relative animate-scale-in"
            style={{ animationDelay: "600ms", animationFillMode: "both", opacity: 0 }}
          >
            <PortraitSection portraitUrl={info.profile_image} />
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
