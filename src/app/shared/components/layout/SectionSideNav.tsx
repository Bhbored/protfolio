import { useRef } from "react"
import type { LucideIcon } from "lucide-react"
import {
  BadgeCheck,
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  GraduationCap,
  House,
  Mail,
  Navigation,
} from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useLanding } from "../../../providers/LandingProvider"

gsap.registerPlugin(useGSAP)

const COLLAPSED_W = 44
const EXPANDED_W = 168

const sections: readonly {
  readonly id: string
  readonly label: string
  readonly Icon: LucideIcon
}[] = [
  { id: "Home", label: "Home", Icon: House },
  { id: "Skills", label: "Skills", Icon: Code2 },
  { id: "Projects", label: "Projects", Icon: FolderKanban },
  { id: "Experience", label: "Experience", Icon: BriefcaseBusiness },
  { id: "Certificates", label: "Certificates", Icon: BadgeCheck },
  { id: "Education", label: "Education", Icon: GraduationCap },
  { id: "Contact", label: "Contact", Icon: Mail },
]

export default function SectionSideNav() {
  const { currentSection, navigateToSection } = useLanding()
  const rootRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

  useGSAP(
    (_, contextSafe) => {
      const rail = railRef.current
      if (!rail || !contextSafe) return

      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(rail, { width: COLLAPSED_W })
        gsap.set(".section-side-nav__meta", { autoAlpha: 0, x: 8 })

        gsap.from(".section-side-nav__item", {
          x: 28,
          autoAlpha: 0,
          duration: 0.45,
          stagger: 0.04,
          ease: "power3.out",
          delay: 0.15,
        })

        const open = contextSafe(() => {
          gsap.to(rail, {
            width: EXPANDED_W,
            duration: 0.4,
            ease: "power3.inOut",
            overwrite: "auto",
          })
          gsap.to(".section-side-nav__meta", {
            autoAlpha: 1,
            x: 0,
            duration: 0.3,
            ease: "power2.out",
            stagger: 0.025,
            overwrite: "auto",
          })
        })

        const close = contextSafe(() => {
          gsap.to(rail, {
            width: COLLAPSED_W,
            duration: 0.35,
            ease: "power3.inOut",
            overwrite: "auto",
          })
          gsap.to(".section-side-nav__meta", {
            autoAlpha: 0,
            x: 8,
            duration: 0.2,
            ease: "power2.in",
            overwrite: "auto",
          })
        })

        rail.addEventListener("pointerenter", open)
        rail.addEventListener("pointerleave", close)
        rail.addEventListener("focusin", open)
        rail.addEventListener("focusout", close)

        return () => {
          rail.removeEventListener("pointerenter", open)
          rail.removeEventListener("pointerleave", close)
          rail.removeEventListener("focusin", open)
          rail.removeEventListener("focusout", close)
        }
      })

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(rail, { width: COLLAPSED_W })
        gsap.set(".section-side-nav__meta", { autoAlpha: 0, x: 0 })

        const open = () => {
          gsap.set(rail, { width: EXPANDED_W })
          gsap.set(".section-side-nav__meta", { autoAlpha: 1 })
        }
        const close = () => {
          gsap.set(rail, { width: COLLAPSED_W })
          gsap.set(".section-side-nav__meta", { autoAlpha: 0 })
        }

        rail.addEventListener("pointerenter", open)
        rail.addEventListener("pointerleave", close)
        return () => {
          rail.removeEventListener("pointerenter", open)
          rail.removeEventListener("pointerleave", close)
        }
      })

      return () => mm.revert()
    },
    { scope: rootRef },
  )

  return (
    <aside
      ref={rootRef}
      className="pointer-events-none fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 md:block"
      aria-label="Page sections"
    >
      <div
        ref={railRef}
        className="pointer-events-auto flex w-[44px] flex-col overflow-hidden border border-white/8 border-r-0 bg-background/85 py-3 shadow-[-8px_0_28px_rgba(0,0,0,0.4)] backdrop-blur-xl"
        style={{ borderRadius: "0.875rem 0 0 0.875rem" }}
      >
        <div className="section-side-nav__meta mb-2 flex items-center gap-2 px-3 opacity-0">
          <Navigation className="size-3.5 text-primary" aria-hidden />
          <span className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/70">
            Sections
          </span>
        </div>

        <nav className="flex flex-col gap-0.5 px-1.5">
          {sections.map(({ id, label, Icon }) => {
            const active = currentSection === id
            return (
              <button
                key={id}
                type="button"
                title={label}
                className="section-side-nav__item group relative flex h-9 w-full cursor-pointer items-center gap-3 rounded-md px-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                onClick={() => navigateToSection(id)}
                aria-label={label}
                aria-current={active ? "true" : undefined}
              >
                {active && (
                  <span
                    className="absolute top-1/2 left-0 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary"
                    aria-hidden
                  />
                )}
                <Icon
                  className={`size-4 shrink-0 transition-colors ${
                    active
                      ? "text-primary"
                      : "text-zinc-500 group-hover:text-zinc-200"
                  }`}
                  aria-hidden
                  strokeWidth={active ? 2.25 : 1.75}
                />
                <span
                  className={`section-side-nav__meta truncate font-label text-[10px] uppercase tracking-widest opacity-0 ${
                    active ? "text-primary" : "text-zinc-300"
                  }`}
                >
                  {label}
                </span>
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
