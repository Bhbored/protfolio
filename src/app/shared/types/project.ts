import type { ProjectCategory } from "./enums"

/** Matches `projects` — nullable DB columns coerced to defaults in the data layer */
export interface Project {
  id?: string
  title: string
  description: string
  image_url: string
  project_category: ProjectCategory
  github_url: string
  live_url: string
  technologies: string[]
  key_features: string[]
  screenshots: string[]
}
