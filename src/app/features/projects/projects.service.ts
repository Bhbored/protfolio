import { queryOptions } from "@tanstack/react-query"
import { supabase } from "../../shared/api/supabase"
import {
  STALE_TIME,
  asStringArray,
  throwIfError,
} from "../../shared/api/supabase-utils"
import type { Project, ProjectCategory } from "../../shared/types"

export const projectKeys = {
  all: ["projects"] as const,
  list: () => [...projectKeys.all, "list"] as const,
}

function normalizeProject(row: Project): Project {
  return {
    ...row,
    description: row.description ?? "",
    image_url: row.image_url ?? "",
    project_category: (row.project_category ?? 0) as ProjectCategory,
    github_url: row.github_url ?? "",
    live_url: row.live_url ?? "",
    technologies: asStringArray(row.technologies),
    key_features: asStringArray(row.key_features),
    screenshots: asStringArray(row.screenshots),
  }
}

export async function fetchProjects(): Promise<Project[]> {
  const result = await supabase.from("projects").select("*")
  const rows = await throwIfError(result, "projects")
  return ((rows ?? []) as Project[]).map(normalizeProject)
}

export const projectQueries = {
  list: () =>
    queryOptions({
      queryKey: projectKeys.list(),
      queryFn: fetchProjects,
      staleTime: STALE_TIME,
    }),
}
