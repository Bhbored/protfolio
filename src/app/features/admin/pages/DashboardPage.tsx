import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import {
  Briefcase,
  Zap,
  BadgeCheck,
  History,
  GraduationCap,
  Layers,
  ExternalLink,
} from "lucide-react"
import { projectQueries } from "../../projects/projects.service"
import { skillQueries } from "../../skills/skills.service"
import { certificateQueries } from "../../certificates/certificates.service"
import { experienceQueries } from "../../experience/experiences.service"
import { educationQueries } from "../../education/educations.service"
import { getProjectCategoryName } from "../../../../lib/project-category"
import { getIcon } from "../../../shared/data/icons"

export default function DashboardPage() {
  const { data: projects = [] } = useQuery(projectQueries.list())
  const { data: skills = [] } = useQuery(skillQueries.list())
  const { data: categories = [] } = useQuery(skillQueries.categories())
  const { data: certificates = [] } = useQuery(certificateQueries.list())
  const { data: experiences = [] } = useQuery(experienceQueries.list())
  const { data: educations = [] } = useQuery(educationQueries.list())

  const categoryName = (id: string | null) =>
    categories.find((c) => c.id === id)?.category ?? "—"

  const stats = [
    { label: "Projects", value: projects.length, icon: Briefcase, to: "/admin/projects" },
    { label: "Skills", value: skills.length, icon: Zap, to: "/admin/skills" },
    { label: "Certificates", value: certificates.length, icon: BadgeCheck, to: "/admin/certificates" },
    { label: "Experience", value: experiences.length, icon: History, to: "/admin/experiences" },
    { label: "Education", value: educations.length, icon: GraduationCap, to: "/admin/educations" },
    { label: "Categories", value: categories.length, icon: Layers, to: "/admin/categories" },
  ]

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map(({ label, value, icon: Icon, to }) => (
          <Link
            key={label}
            to={to}
            className="group rounded-xl border border-white/10 bg-linear-to-br from-surface-container-highest to-surface-container-high p-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-glow-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <div className="mb-3 flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Icon className="size-5" />
            </div>
            <h3 className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
              {label}
            </h3>
            <p className="mt-1 font-headline text-2xl font-bold tabular-nums text-on-surface">
              {value}
            </p>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-xl border border-white/10 bg-surface-container-high overflow-hidden">
          <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <h2 className="font-headline text-base font-bold">Recent Projects</h2>
            <Link to="/admin/projects" className="font-label text-xs uppercase tracking-widest text-primary hover:underline">
              View all
            </Link>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 font-label text-xs uppercase tracking-widest text-on-surface-variant">Title</th>
                  <th className="px-4 py-3 font-label text-xs uppercase tracking-widest text-on-surface-variant">Category</th>
                  <th className="px-4 py-3 font-label text-xs uppercase tracking-widest text-on-surface-variant">Tech</th>
                </tr>
              </thead>
              <tbody>
                {projects.slice(0, 5).map((p) => (
                  <tr key={p.id ?? p.title} className="border-b border-white/5 hover:bg-white/[0.03]">
                    <td className="px-4 py-3 font-body text-sm text-primary">{p.title}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 font-label text-[10px] uppercase tracking-wider text-primary">
                        {getProjectCategoryName(p.project_category)}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-label text-xs tabular-nums text-on-surface-variant">
                      {p.technologies.length}
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-sm text-on-surface-variant">
                      No projects yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-surface-container-high overflow-hidden">
          <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <h2 className="font-headline text-base font-bold">Skills Overview</h2>
            <Link to="/admin/skills" className="font-label text-xs uppercase tracking-widest text-primary hover:underline">
              View all
            </Link>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 font-label text-xs uppercase tracking-widest text-on-surface-variant">Skill</th>
                  <th className="px-4 py-3 font-label text-xs uppercase tracking-widest text-on-surface-variant">Category</th>
                  <th className="px-4 py-3 font-label text-xs uppercase tracking-widest text-on-surface-variant">Mastery</th>
                </tr>
              </thead>
              <tbody>
                {skills.slice(0, 5).map((s) => {
                  const Icon = getIcon(s.icon)
                  return (
                    <tr key={s.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-2 text-sm">
                          <Icon className="size-4 text-primary" />
                          {s.title}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-label text-xs text-on-surface-variant">
                        {categoryName(s.skill_category_id)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${s.mastery_level}%` }}
                            />
                          </div>
                          <span className="font-label text-xs tabular-nums">{s.mastery_level}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {skills.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-sm text-on-surface-variant">
                      No skills yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-xl border border-white/10 bg-surface-container-high overflow-hidden">
          <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <h2 className="font-headline text-base font-bold">Certificates</h2>
            <Link to="/admin/certificates" className="font-label text-xs uppercase tracking-widest text-primary hover:underline">
              View all
            </Link>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 font-label text-xs uppercase tracking-widest text-on-surface-variant">Title</th>
                  <th className="px-4 py-3 font-label text-xs uppercase tracking-widest text-on-surface-variant">Issuer</th>
                  <th className="px-4 py-3 font-label text-xs uppercase tracking-widest text-on-surface-variant">Year</th>
                  <th className="px-4 py-3 font-label text-xs uppercase tracking-widest text-on-surface-variant">Link</th>
                </tr>
              </thead>
              <tbody>
                {certificates.slice(0, 5).map((c) => (
                  <tr key={c.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                    <td className="px-4 py-3 text-sm text-primary">{c.title}</td>
                    <td className="px-4 py-3 text-sm text-on-surface-variant">{c.issuer}</td>
                    <td className="px-4 py-3 font-label text-xs tabular-nums">{c.year}</td>
                    <td className="px-4 py-3">
                      {c.link ? (
                        <a
                          href={c.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-label text-xs uppercase tracking-wider text-primary hover:underline"
                        >
                          View <ExternalLink className="size-3" />
                        </a>
                      ) : (
                        <span className="text-on-surface-variant">—</span>
                      )}
                    </td>
                  </tr>
                ))}
                {certificates.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-sm text-on-surface-variant">
                      No certificates yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
