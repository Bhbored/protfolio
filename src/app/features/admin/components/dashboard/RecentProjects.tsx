import { Link } from "react-router-dom"
import { ArrowUpRight, ImageIcon } from "lucide-react"
import type { Project } from "../../../../shared/types"
import { getProjectCategoryName } from "../../../../../lib/project-category"
import { resolveMediaUrl } from "../../../../../lib/media-url"
import DashPanel, { PanelHeader } from "./DashPanel"

interface RecentProjectsProps {
  readonly projects: readonly Project[]
  readonly loading: boolean
}

export default function RecentProjects({ projects, loading }: RecentProjectsProps) {
  const [featured, ...rest] = projects.slice(0, 4)
  const secondary = rest.slice(0, 3)

  return (
    <DashPanel className="h-full">
      <PanelHeader
        title="Projects"
        subtitle="Latest showcase work"
        action={
          <Link
            to="/admin/projects"
            className="inline-flex min-h-10 items-center gap-1 font-label text-[10px] uppercase tracking-widest text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            All
            <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        }
      />

      {loading ? (
        <div className="grid gap-3 animate-pulse">
          <div className="aspect-[16/10] rounded-2xl bg-white/10 sm:aspect-[21/9]" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="h-24 rounded-2xl bg-white/5" />
            <div className="h-24 rounded-2xl bg-white/5" />
            <div className="h-24 rounded-2xl bg-white/5" />
          </div>
        </div>
      ) : !featured ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/15 px-4 py-14 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ImageIcon className="size-6" aria-hidden />
          </div>
          <div>
            <p className="font-headline text-sm font-bold text-on-surface">No projects yet</p>
            <p className="mt-1 font-body text-xs text-on-surface-variant">
              Add your first showcase piece
            </p>
          </div>
          <Link
            to="/admin/projects"
            className="inline-flex min-h-11 items-center rounded-xl bg-primary/15 px-4 font-label text-xs uppercase tracking-widest text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Add project
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          
          <Link
            to="/admin/projects"
            className="group relative block aspect-[16/11] overflow-hidden rounded-2xl border border-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:aspect-[21/9]"
          >
            {resolveMediaUrl(featured.image_url) ? (
              <img
                src={resolveMediaUrl(featured.image_url)}
                alt=""
                className="absolute inset-0 size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-surface-container-highest" />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <p className="font-label text-[10px] uppercase tracking-[0.16em] text-primary">
                {getProjectCategoryName(featured.project_category)}
              </p>
              <p className="mt-1 font-headline text-lg font-bold text-on-surface sm:text-xl">
                {featured.title}
              </p>
              {featured.technologies.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {featured.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-black/40 px-2 py-0.5 font-label text-[9px] uppercase tracking-wider text-on-surface backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>

          {secondary.length > 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {secondary.map((project) => {
                const thumb = resolveMediaUrl(project.image_url)
                return (
                  <Link
                    key={project.id ?? project.title}
                    to="/admin/projects"
                    className="group flex min-h-[72px] gap-3 rounded-2xl border border-white/[0.06] bg-black/20 p-2.5 transition-colors hover:border-primary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:flex-col sm:gap-2 sm:p-0 sm:overflow-hidden"
                  >
                    <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-surface-container-highest sm:aspect-[16/10] sm:size-auto sm:rounded-none sm:rounded-t-2xl">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt=""
                          className="size-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                        />
                      ) : (
                        <div className="size-full bg-white/5" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 self-center sm:self-auto sm:p-3 sm:pt-2">
                      <p className="truncate font-body text-sm font-medium text-on-surface group-hover:text-primary">
                        {project.title}
                      </p>
                      <p className="mt-0.5 truncate font-label text-[10px] uppercase tracking-wider text-on-surface-variant">
                        {getProjectCategoryName(project.project_category)}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      )}
    </DashPanel>
  )
}
