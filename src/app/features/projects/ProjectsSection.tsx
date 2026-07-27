import { useState } from "react"
import { useIsMobile } from "../../../hooks/use-mobile"
import { useLanding } from "../../providers/LandingProvider"
import ProjectCard from "./components/ProjectCard"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function ProjectsSection() {
  const { projects } = useLanding()
  const isMobile = useIsMobile()
  const pageSize = isMobile ? 2 : 3
  const [page, setPage] = useState(0)
  const totalPages = Math.max(1, Math.ceil(projects.length / pageSize))
  const cardWidth = isMobile ? "calc((100% - 1.5rem) / 2)" : "calc((100% - 3rem) / 3)"

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages - 1))
  const prevPage = () => setPage((p) => Math.max(p - 1, 0))

  const pages: typeof projects[] = []
  for (let i = 0; i < projects.length; i += pageSize) {
    pages.push(projects.slice(i, i + pageSize))
  }

  return (
    <section id="projects" className="pt-16 md:pt-24 pb-16 md:pb-24 min-h-screen mesh-gradient relative overflow-hidden">
      <div className="px-6 max-w-384 mx-auto">
        {/* Header */}
        <header className="mb-16 md:mb-24 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="inline-block relative">
              <span
                className="absolute -top-4 md:-top-6 left-0 font-label text-[8px] md:text-[10px] tracking-[0.4em] text-primary/40 uppercase animate-fade-in-up"
                style={{ animationDelay: "200ms", animationFillMode: "both", opacity: 0 }}
              >
                // DOCUMENTATION_MODULE_04
              </span>
              <h1
                className="font-headline text-[48px] md:text-[80px] lg:text-[96px] font-black tracking-tighter uppercase leading-none animate-fade-in-left"
                style={{ animationDelay: "400ms", animationFillMode: "both", opacity: 0 }}
              >
                Featured<br /><span className="text-primary">Projects</span>
              </h1>
            </div>
            <div className="max-w-xs md:text-right border-r-2 md:border-r-0 md:border-l-2 border-primary/20 md:pl-6 pr-4 md:pr-0">
              <p
                className="text-slate-400 text-xs md:text-sm leading-relaxed animate-fade-in-up"
                style={{ animationDelay: "600ms", animationFillMode: "both", opacity: 0 }}
              >
                Click on any project to see detailed features, technologies, and screenshots.
              </p>
            </div>
          </div>
          <div
            className="mt-4 flex items-center gap-2 animate-fade-in-up"
            style={{ animationDelay: "800ms", animationFillMode: "both", opacity: 0 }}
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="font-label text-[10px] tracking-[0.3em] uppercase text-slate-500">
              {projects.length} Projects Archived
            </span>
          </div>
        </header>
      </div>

      {/* Track */}
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${page * 100}%)` }}>
          {pages.map((pageProjects, pi) => (
            <div key={pi} className="flex gap-6 shrink-0 w-full px-6 max-w-384 mx-auto">
              {pageProjects.map((project) => {
                const realIndex = projects.indexOf(project)
                return (
                  <div
                    key={realIndex}
                    className="shrink-0 min-w-0"
                    style={{ width: cardWidth }}
                  >
                    <ProjectCard project={project} index={realIndex} />
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-12 px-6 max-w-384 mx-auto">
        <button
          onClick={prevPage}
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
          onClick={nextPage}
          disabled={page + 1 >= totalPages}
          className="flex items-center gap-2 px-6 py-3 bg-surface-container-high border border-outline-variant/30 text-primary font-label text-xs tracking-widest uppercase hover:border-primary/50 hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  )
}
