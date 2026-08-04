import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { capitalizeName } from "../../../lib/capitalizer"
import { useLanding } from "../../providers/LandingProvider"
import AvailabilityBadge from "./components/AvailabilityBadge"
import PortraitImage from "./components/PortraitImage"

gsap.registerPlugin(useGSAP)

export default function HeroSection() {
  const { personalInfo: info, navigateToSection } = useLanding()
  const name = capitalizeName(info.name)
  const nameParts = name.trim().split(/\s+/).filter(Boolean)
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        gsap.set("[data-hero-media]", { autoAlpha: 0, scale: 1.06 })
        gsap.set("[data-hero-copy] > *", { autoAlpha: 0, y: 32 })

        tl.to("[data-hero-media]", { autoAlpha: 1, scale: 1, duration: 1.1 })
          .to(
            "[data-hero-copy] > *",
            { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.1 },
            "-=0.55",
          )
      })

      return () => mm.revert()
    },
    {
      scope: sectionRef,
      dependencies: [name, info.title, info.headline, info.summary],
    },
  )

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-dvh w-full overflow-hidden bg-background"
    >
      <div
        data-hero-media
        className="group absolute inset-0 md:left-[36%] lg:left-[40%]"
      >
        <PortraitImage />
        {/* Soft edge only — keep the face clear */}
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-background from-0% via-transparent via-35% to-transparent md:bg-linear-to-r md:from-background md:from-0% md:via-background/40 md:via-18% md:to-transparent md:to-45%"
          aria-hidden
        />
      </div>

      <div className="absolute inset-0 grid-pattern opacity-[0.05]" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-384 flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20 md:justify-center md:px-12 md:pb-24 md:pt-24">
        <div data-hero-copy className="max-w-2xl space-y-6 md:space-y-8">
          {info.is_available_for_work ? <AvailabilityBadge /> : null}

          <div>
            <h1 className="font-headline text-5xl font-black uppercase leading-[0.86] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[104px]">
              {nameParts.length > 1 ? (
                <>
                  {nameParts.slice(0, -1).join(" ")}
                  <br />
                  <span className="text-primary">{nameParts.at(-1)}</span>
                </>
              ) : (
                <span className="text-primary">{name}</span>
              )}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 md:mt-5">
              {info.title ? (
                <p className="font-label text-xs uppercase tracking-[0.28em] text-primary/80 sm:text-sm">
                  {info.title}
                </p>
              ) : null}
              {info.title && info.location ? (
                <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden />
              ) : null}
              {info.location ? (
                <p className="font-label text-[10px] uppercase tracking-[0.22em] text-white/40 sm:text-xs">
                  {info.location}
                </p>
              ) : null}
            </div>
          </div>

          {(info.headline || info.summary) && (
            <div className="max-w-lg space-y-3 border-l border-primary/40 pl-4 md:space-y-4 md:pl-5">
              {info.headline ? (
                <p className="font-headline text-lg font-bold leading-snug tracking-tight text-white sm:text-xl md:text-2xl">
                  {info.headline}
                </p>
              ) : null}
              {info.summary ? (
                <p className="font-body text-sm leading-relaxed text-white/60 sm:text-[15px] md:text-base md:leading-relaxed">
                  {info.summary}
                </p>
              ) : null}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigateToSection("Projects")}
              className="group inline-flex min-h-12 items-center gap-3 bg-primary px-6 font-label text-xs font-bold uppercase tracking-[0.2em] text-background transition-all hover:brightness-110"
            >
              View Work
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </button>
            <button
              type="button"
              onClick={() => navigateToSection("Contact")}
              className="inline-flex min-h-12 items-center border border-white/15 px-5 font-label text-xs uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/35 hover:text-white"
            >
              Let&apos;s Talk
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
