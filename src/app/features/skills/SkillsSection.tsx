import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useIsMobile } from "../../../hooks/use-mobile"
import { useLanding } from "../../providers/LandingProvider"
import type { Skill } from "../../shared/types"
import SkillCard from "./components/SkillCard"

const pageSize = 3

export default function SkillsSection() {
  const { categories, getSkillsByCategoryId } = useLanding()
  const isMobile = useIsMobile()
  const [pageIndices, setPageIndices] = useState<Record<string, number>>(() =>
    Object.fromEntries(categories.map((c) => [c.id, 0]))
  )

  const slideCategory = (categoryId: string, direction: number) => {
    setPageIndices((prev) => {
      const current = prev[categoryId] ?? 0
      return { ...prev, [categoryId]: current + direction }
    })
  }

  return (
    <section id="skills" className="min-h-screen pt-16 md:pt-20 pb-24 md:pb-32 px-6 max-w-384 mx-auto overflow-x-hidden mesh-gradient">
      {/* Section Header */}
      <header className="mb-16 md:mb-24 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="inline-block relative">
            <span
              className="absolute -top-4 md:-top-6 left-0 font-label text-[8px] md:text-[10px] tracking-[0.4em] text-primary/40 uppercase animate-fade-in-up"
              style={{ animationDelay: "200ms", animationFillMode: "both", opacity: 0 }}
            >
              // SYSTEM_CAPABILITIES_LOADED
            </span>
            <h1
              className="font-headline text-[48px] md:text-[80px] lg:text-[96px] font-black tracking-tighter uppercase leading-none animate-fade-in-left"
              style={{ animationDelay: "400ms", animationFillMode: "both", opacity: 0 }}
            >
              TECH<br /><span className="text-primary">ARSENAL</span>
            </h1>
          </div>
          <div className="max-w-xs md:text-right border-r-2 md:border-r-0 md:border-l-2 border-primary/20 md:pl-6 pr-4 md:pr-0">
            <p
              className="text-slate-400 text-xs md:text-sm leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "600ms", animationFillMode: "both", opacity: 0 }}
            >
              Technologies and tools used to build cross-platform applications.
            </p>
          </div>
        </div>
        <div
          className="mt-4 flex items-center gap-2 animate-fade-in-up"
          style={{ animationDelay: "800ms", animationFillMode: "both", opacity: 0 }}
        >
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="font-label text-[10px] tracking-[0.3em] uppercase text-slate-500">
            {categories.length} Skill Categories
          </span>
        </div>
      </header>

      {/* Categories */}
      {categories.map((category, catIndex) => {
        const categorySkills = getSkillsByCategoryId(category.id)
        const currentPage = pageIndices[category.id] ?? 0
        const totalPages = Math.max(1, Math.ceil(categorySkills.length / pageSize))

        // Build pages
        const pages: Skill[][] = []
        for (let i = 0; i < categorySkills.length; i += pageSize) {
          pages.push(categorySkills.slice(i, i + pageSize))
        }

        return (
          <div
            key={category.id}
            className="mb-16 md:mb-24 animate-fade-in-up"
            style={{
              animationDelay: `${800 + catIndex * 150}ms`,
              animationFillMode: "both",
              opacity: 0,
            }}
          >
            {/* Category Header */}
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-3 md:gap-4">
                <span className="font-label text-xs bg-surface-container-high px-2 py-1 text-primary">
                  0{catIndex + 1}
                </span>
                <h3 className="font-headline font-bold tracking-tight text-lg md:text-xl uppercase">
                  {category.category}
                </h3>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => slideCategory(category.id, -1)}
                  disabled={currentPage === 0}
                  className="flex items-center justify-center w-9 h-9 border border-white/10 rounded-lg bg-white/3 text-zinc-400 cursor-pointer backdrop-blur-sm transition-all duration-200 hover:border-primary/50 hover:text-primary hover:bg-primary/5 hover:shadow-[0_0_12px_rgba(0,240,255,0.15)] hover:-translate-y-0.5 active:scale-96 disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-on-surface-variant font-label text-[10px] tracking-widest">
                  {currentPage + 1}/{totalPages}
                </span>
                <button
                  onClick={() => slideCategory(category.id, 1)}
                  disabled={currentPage + 1 >= totalPages}
                  className="flex items-center justify-center w-9 h-9 border border-white/10 rounded-lg bg-white/3 text-zinc-400 cursor-pointer backdrop-blur-sm transition-all duration-200 hover:border-primary/50 hover:text-primary hover:bg-primary/5 hover:shadow-[0_0_12px_rgba(0,240,255,0.15)] hover:-translate-y-0.5 active:scale-96 disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Track */}
            <div className="overflow-hidden max-md:overflow-x-auto max-md:scrollbar-none">
              <div
                className="flex gap-6 transition-transform duration-500 ease-in-out"
                style={
                  !isMobile ? { transform: `translateX(-${currentPage * 100}%)` } : undefined
                }
              >
                {pages.map((page, pi) => (
                  <div key={pi} className="flex gap-6 shrink-0 w-full">
                    {page.map((skill) => (
                      <div
                        key={skill.id}
                        className="shrink-0 w-[calc(100vw-48px)] md:w-[calc((100vw-96px)/3)] max-w-150 md:max-w-120 min-w-65 md:min-w-75"
                      >
                        <SkillCard
                          skill={skill}
                          index={catIndex * 10 + categorySkills.indexOf(skill)}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
