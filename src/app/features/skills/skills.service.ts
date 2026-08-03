import { queryOptions } from "@tanstack/react-query"
import { supabase } from "../../shared/api/supabase"
import {
  STALE_TIME,
  asStringArray,
  throwIfError,
} from "../../shared/api/supabase-utils"
import type { Skill, SkillCategory } from "../../shared/types"

export type NewSkill = Omit<Skill, "id">
export type NewCategory = Omit<SkillCategory, "id">

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

export async function createSkill(row: NewSkill): Promise<Skill> {
  const result = await supabase.from("skills").insert(row).select().single()
  const data = await throwIfError(result, "skills.create")
  return normalizeSkill(data as Skill)
}

export async function updateSkill(id: string, row: NewSkill): Promise<Skill> {
  const result = await supabase
    .from("skills")
    .update(row)
    .eq("id", id)
    .select()
    .single()
  const data = await throwIfError(result, "skills.update")
  return normalizeSkill(data as Skill)
}

export async function deleteSkill(id: string): Promise<void> {
  const result = await supabase.from("skills").delete().eq("id", id)
  await throwIfError(result, "skills.delete")
}

export async function fetchSkillCategories(): Promise<SkillCategory[]> {
  const result = await supabase.from("skill_categories").select("*")
  const rows = await throwIfError(result, "skill_categories")
  return (rows ?? []) as SkillCategory[]
}

export async function createCategory(row: NewCategory): Promise<SkillCategory> {
  const result = await supabase
    .from("skill_categories")
    .insert(row)
    .select()
    .single()
  const data = await throwIfError(result, "skill_categories.create")
  return data as SkillCategory
}

export async function updateCategory(
  id: string,
  row: NewCategory,
): Promise<SkillCategory> {
  const result = await supabase
    .from("skill_categories")
    .update(row)
    .eq("id", id)
    .select()
    .single()
  const data = await throwIfError(result, "skill_categories.update")
  return data as SkillCategory
}

export async function deleteCategory(id: string): Promise<void> {
  const result = await supabase.from("skill_categories").delete().eq("id", id)
  await throwIfError(result, "skill_categories.delete")
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
