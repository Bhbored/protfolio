import { useMemo, useRef } from "react"
import { useNavigate } from "react-router-dom"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import type { Project } from "../../../shared/types"
import { projectSlug } from "../../../../lib/media-url"
import MediaImage from "../../../shared/components/MediaImage"

gsap.registerPlugin(useGSAP)

const COLLAPSED_W = 72
const EXPANDED_W = 228

interface ProjectSideNavProps {
  readonly projects: readonly Project[]
  readonly currentId?: string
  readonly currentTitle: string
}

export default function ProjectSideNav({
  projects,
  currentId,
  currentTitle,
}: ProjectSideNavProps) {
  const navigate = useNavigate()
  const rootRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

  const items = useMemo(() => {
    return projects.filter((p) => {
      if (currentId && p.id) return p.id !== currentId
      return p.title !== currentTitle
    })
  }, [projects, currentId, currentTitle])

  useGSAP(
    (_, contextSafe) => {
      const rail = railRef.current
      if (!rail || !contextSafe || items.length === 0) return

      const mm = gsap.matchMedia()

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(rail, { width: COLLAPSED_W })
        gsap.set(".project-side-nav__meta", { autoAlpha: 0, x: 12 })

        gsap.from(".project-side-nav__item", {
          x: 48,
          autoAlpha: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: "power3.out",
          delay: 0.15,
        })

        const open = contextSafe(() => {
          gsap.to(rail, {
            width: EXPANDED_W,
            duration: 0.45,
            ease: "power3.inOut",
            overwrite: "auto",
          })
          gsap.to(".project-side-nav__meta", {
            autoAlpha: 1,
            x: 0,
            duration: 0.35,
            ease: "power2.out",
            stagger: 0.03,
            overwrite: "auto",
          })
        })

        const close = contextSafe(() => {
          gsap.to(rail, {
            width: COLLAPSED_W,
            duration: 0.4,
            ease: "power3.inOut",
            overwrite: "auto",
          })
          gsap.to(".project-side-nav__meta", {
            autoAlpha: 0,
            x: 12,
            duration: 0.25,
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
        gsap.set(".project-side-nav__meta", { autoAlpha: 0, x: 0 })

        const open = () => {
          gsap.set(rail, { width: EXPANDED_W })
          gsap.set(".project-side-nav__meta", { autoAlpha: 1 })
        }
        const close = () => {
          gsap.set(rail, { width: COLLAPSED_W })
          gsap.set(".project-side-nav__meta", { autoAlpha: 0 })
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
    { scope: rootRef, dependencies: [items.length, currentId, currentTitle] },
  )

  if (items.length === 0) return null

  return (
    <aside
      ref={rootRef}
      className="pointer-events-none fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 md:block"
      aria-label="Other projects"
    >
      <div
        ref={railRef}
        className="pointer-events-auto flex w-[72px] flex-col gap-2 overflow-hidden border border-white/10 border-r-0 bg-surface-container-high/90 p-2 shadow-[-12px_0_40px_rgba(0,0,0,0.35)] backdrop-blur-md"
        style={{ borderRadius: "1rem 0 0 1rem" }}
      >
        <p className="px-1 pt-1 font-label text-[9px] uppercase tracking-[0.2em] text-primary/80">
          Next
        </p>

        <div className="flex max-h-[min(70vh,520px)] flex-col gap-2 overflow-y-auto scrollbar-none">
          {items.map((project, index) => {
            const href = project.id ?? projectSlug(project.title)
            return (
              <button
                key={project.id ?? project.title}
                type="button"
                className="project-side-nav__item group flex w-full cursor-pointer items-center gap-3 rounded-lg border border-transparent p-1 text-left transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:border-primary/50 focus-visible:outline-none"
                onClick={() => navigate(`/project/${href}`)}
              >
                <div className="relative size-14 shrink-0 overflow-hidden rounded-md border border-white/10 bg-surface-container-highest">
                  <MediaImage
                    src={project.image_url}
                    alt=""
                    frame="none"
                    className="size-full"
                    imageClassName="transition-transform duration-500 group-hover:scale-110"
                  />
                  <span className="absolute bottom-0.5 left-0.5 rounded bg-black/60 px-1 font-label text-[8px] tabular-nums text-white/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="project-side-nav__meta min-w-0 flex-1 opacity-0">
                  <p className="truncate font-headline text-xs font-bold text-white">
                    {project.title}
                  </p>
                  <p className="mt-0.5 truncate font-label text-[9px] uppercase tracking-widest text-on-surface-variant">
                    View project
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
