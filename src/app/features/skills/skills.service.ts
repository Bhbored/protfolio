import { queryOptions } from "@tanstack/react-query"
import { supabase } from "../../shared/api/supabase"
import {
  STALE_TIME,
  asStringArray,
  throwIfError,
} from "../../shared/api/supabase-utils"
import type { Skill, SkillCategory } from "../../shared/types"

export const skillKeys = {
  all: ["skills"] as const,
  list: () => [...skillKeys.all, "list"] as const,
  categories: () => [...skillKeys.all, "categories"] as const,
}

function normalizeSkill(row: Skill): Skill {
  return {
    ...row,
    icon: row.icon ?? 0,
    mastery_level: Number(row.mastery_level ?? 0),
    is_new: row.is_new ?? false,
    details: asStringArray(row.details),
  }
}

export async function fetchSkills(): Promise<Skill[]> {
  const result = await supabase.from("skills").select("*")
  const rows = await throwIfError(result, "skills")
  return ((rows ?? []) as Skill[]).map(normalizeSkill)
}

export async function fetchSkillCategories(): Promise<SkillCategory[]> {
  const result = await supabase.from("skill_categories").select("*")
  const rows = await throwIfError(result, "skill_categories")
  return (rows ?? []) as SkillCategory[]
}

export function getSkillsByCategoryId(
  skills: Skill[],
  categoryId: string,
): Skill[] {
  return skills.filter((s) => s.skill_category_id === categoryId)
}

export const skillQueries = {
  list: () =>
    queryOptions({
      queryKey: skillKeys.list(),
      queryFn: fetchSkills,
      staleTime: STALE_TIME,
    }),
  categories: () =>
    queryOptions({
      queryKey: skillKeys.categories(),
      queryFn: fetchSkillCategories,
      staleTime: STALE_TIME,
    }),
}
