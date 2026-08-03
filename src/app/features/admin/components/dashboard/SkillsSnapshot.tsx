import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"
import type { Skill, SkillCategory } from "../../../../shared/types"
import { getIcon } from "../../../../shared/data/icons"
import DashPanel, { PanelHeader } from "./DashPanel"

interface SkillsSnapshotProps {
  readonly skills: readonly Skill[]
  readonly categories: readonly SkillCategory[]
  readonly loading: boolean
}

export default function SkillsSnapshot({
  skills,
  categories,
  loading,
}: SkillsSnapshotProps) {
  const top = [...skills]
    .sort((a, b) => b.mastery_level - a.mastery_level)
    .slice(0, 5)

  const categoryName = (id: string | null) =>
    categories.find((c) => c.id === id)?.category ?? "Uncategorized"

  return (
    <DashPanel className="h-full">
      <PanelHeader
        title="Top skills"
        subtitle="By mastery"
        action={
          <Link
            to="/admin/skills"
            className="inline-flex min-h-10 items-center gap-1 font-label text-[10px] uppercase tracking-widest text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            All
            <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
        }
      />

      {loading ? (
        <div className="space-y-4 animate-pulse">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-2/3 rounded bg-white/10" />
              <div className="h-2 rounded-full bg-white/5" />
            </div>
          ))}
        </div>
      ) : top.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 px-4 py-12 text-center">
          <p className="font-body text-sm text-on-surface-variant">No skills yet</p>
          <Link
            to="/admin/skills"
            className="inline-flex min-h-11 items-center rounded-xl bg-primary/15 px-4 font-label text-xs uppercase tracking-widest text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Add skill
          </Link>
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {top.map((skill, i) => {
            const Icon = getIcon(skill.icon)
            return (
              <li key={skill.id} className="group">
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="truncate font-body text-sm font-medium text-on-surface">
                        <span className="mr-1.5 font-label text-[10px] text-on-surface-variant/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {skill.title}
                      </p>
                      <span className="shrink-0 font-headline text-sm font-bold tabular-nums text-primary">
                        {skill.mastery_level}
                      </span>
                    </div>
                    <p className="truncate font-label text-[10px] uppercase tracking-wider text-on-surface-variant">
                      {categoryName(skill.skill_category_id)}
                    </p>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-primary to-primary-container motion-safe:transition-[width] motion-safe:duration-700"
                    style={{ width: `${skill.mastery_level}%` }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </DashPanel>
  )
}
