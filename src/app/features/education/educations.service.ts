import { queryOptions } from "@tanstack/react-query"
import { supabase } from "../../shared/api/supabase"
import { STALE_TIME, throwIfError } from "../../shared/api/supabase-utils"
import type { Education } from "../../shared/types"

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

export const educationQueries = {
  list: () =>
    queryOptions({
      queryKey: educationKeys.list(),
      queryFn: fetchEducations,
      staleTime: STALE_TIME,
    }),
}
