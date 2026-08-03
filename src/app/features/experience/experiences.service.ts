import { queryOptions } from "@tanstack/react-query"
import { supabase } from "../../shared/api/supabase"
import {
  STALE_TIME,
  asStringArray,
  throwIfError,
} from "../../shared/api/supabase-utils"
import type { Experience } from "../../shared/types"

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

export const experienceQueries = {
  list: () =>
    queryOptions({
      queryKey: experienceKeys.list(),
      queryFn: fetchExperiences,
      staleTime: STALE_TIME,
    }),
}
