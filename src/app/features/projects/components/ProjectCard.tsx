import { useNavigate } from "react-router-dom"
import type { Project } from "../../../shared/types"
import { Code, ExternalLink } from "lucide-react"
import { projectSlug } from "../../../../lib/media-url"
import { animStagger } from "../../../../lib/anim-delay"
import MediaImage from "../../../shared/components/MediaImage"

interface ProjectCardProps {
  readonly project: Project
  readonly index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const navigate = useNavigate()
  const href = project.id ?? projectSlug(project.title)

  return (
    <div
      className={`flex flex-col gap-4 animate-fade-in-up sm:gap-5 md:gap-6 ${animStagger(index, 150, 600)}`}
    >
      <div className="mb-1 flex items-center gap-3 sm:mb-2">
        <span className="border border-primary/20 bg-primary/10 px-2.5 py-1 font-label text-[10px] uppercase tracking-widest text-primary sm:px-3 sm:text-xs">
          Stage {(index + 1).toString().padStart(2, "0")}
        </span>
      </div>

      <div
        className="group relative aspect-video bg-surface-container-low overflow-hidden border border-outline-variant/10 transition-all duration-500 hover:border-primary/40 hover:shadow-glow-cyan hover:scale-[1.02] cursor-pointer"
        onClick={() => navigate(`/project/${href}`)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            navigate(`/project/${href}`)
          }
        }}
        role="link"
        tabIndex={0}
      >
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-10" />
        <div className="absolute top-0 left-0 right-0 h-spx bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

        <div className="absolute inset-0 scale-[0.95] transition-transform duration-700 group-hover:scale-100">
          <MediaImage
            src={project.image_url}
            alt={project.title}
            frame="none"
            className="absolute inset-0 size-full bg-transparent"
            imageClassName="grayscale opacity-40 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-60"
            fallback={<div className="absolute inset-0 bg-surface-container-highest" />}
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-primary-container flex items-center justify-center backdrop-blur-sm bg-primary-container/5 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
            <span className="text-primary font-label text-[10px] md:text-xs font-black tracking-[0.2em]">
              VIEW
            </span>
          </div>
        </div>

        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
          <div className="text-[10px] font-label text-primary tracking-widest uppercase">
            Target: {project.title}
          </div>
        </div>

        <div className="absolute bottom-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
          <span className="w-1 h-1 rounded-full bg-primary/60" />
          <span className="w-1 h-1 rounded-full bg-primary/40" />
          <span className="w-1 h-1 rounded-full bg-primary/20" />
        </div>
      </div>

      <div>
        <h4 className="mb-2 font-headline text-base font-bold text-white transition-all duration-500 group-hover:text-gradient sm:text-lg md:text-xl">
          {project.title}
        </h4>
        <p className="mb-3 font-body text-xs text-on-surface-variant/80 sm:mb-4 sm:text-sm md:text-base">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-label tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 px-2 py-1"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-[10px] font-label tracking-widest uppercase text-on-surface-variant bg-surface-container/10 border border-outline-variant/20 px-2 py-1">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        <div className="flex gap-4 mt-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-label tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Code className="w-3.5 h-3.5" />
              Code
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-label tracking-widest uppercase text-on-surface-variant hover:text-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
