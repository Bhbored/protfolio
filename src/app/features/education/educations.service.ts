import { queryOptions } from "@tanstack/react-query"
import { supabase } from "../../shared/api/supabase"
import { STALE_TIME, throwIfError } from "../../shared/api/supabase-utils"
import type { Education } from "../../shared/types"

export type NewEducation = Omit<Education, "id">

export const educationKeys = {
  all: ["educations"] as const,
  list: () => [...educationKeys.all, "list"] as const,
}

function normalizeEducation(row: Education): Education {
  return {
    ...row,
    year: row.year ?? "",
  }
}

export async function fetchEducations(): Promise<Education[]> {
  const result = await supabase.from("educations").select("*")
  const rows = await throwIfError(result, "educations")
  return ((rows ?? []) as Education[]).map(normalizeEducation)
}

export async function createEducation(row: NewEducation): Promise<Education> {
  const result = await supabase.from("educations").insert(row).select().single()
  const data = await throwIfError(result, "educations.create")
  return normalizeEducation(data as Education)
}

export async function updateEducation(
  id: string,
  row: NewEducation,
): Promise<Education> {
  const result = await supabase
    .from("educations")
    .update(row)
    .eq("id", id)
    .select()
    .single()
  const data = await throwIfError(result, "educations.update")
  return normalizeEducation(data as Education)
}

export async function deleteEducation(id: string): Promise<void> {
  const result = await supabase.from("educations").delete().eq("id", id)
  await throwIfError(result, "educations.delete")
}

export const educationQueries = {
  list: () =>
    queryOptions({
      queryKey: educationKeys.list(),
      queryFn: fetchEducations,
      staleTime: STALE_TIME,
    }),
}
