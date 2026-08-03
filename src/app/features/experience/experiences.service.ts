import { queryOptions } from "@tanstack/react-query"
import { supabase } from "../../shared/api/supabase"
import {
  STALE_TIME,
  asStringArray,
  throwIfError,
} from "../../shared/api/supabase-utils"
import type { Experience } from "../../shared/types"

export type NewExperience = Omit<Experience, "id">

export const experienceKeys = {
  all: ["experiences"] as const,
  list: () => [...experienceKeys.all, "list"] as const,
}

function normalizeExperience(row: Experience): Experience {
  return {
    ...row,
    period: row.period ?? "",
    description: asStringArray(row.description),
  }
}

export async function fetchExperiences(): Promise<Experience[]> {
  const result = await supabase.from("experiences").select("*")
  const rows = await throwIfError(result, "experiences")
  return ((rows ?? []) as Experience[]).map(normalizeExperience)
}

export async function createExperience(
  row: NewExperience,
): Promise<Experience> {
  const result = await supabase
    .from("experiences")
    .insert(row)
    .select()
    .single()
  const data = await throwIfError(result, "experiences.create")
  return normalizeExperience(data as Experience)
}

export async function updateExperience(
  id: string,
  row: NewExperience,
): Promise<Experience> {
  const result = await supabase
    .from("experiences")
    .update(row)
    .eq("id", id)
    .select()
    .single()
  const data = await throwIfError(result, "experiences.update")
  return normalizeExperience(data as Experience)
}

export async function deleteExperience(id: string): Promise<void> {
  const result = await supabase.from("experiences").delete().eq("id", id)
  await throwIfError(result, "experiences.delete")
}

export const experienceQueries = {
  list: () =>
    queryOptions({
      queryKey: experienceKeys.list(),
      queryFn: fetchExperiences,
      staleTime: STALE_TIME,
    }),
}
