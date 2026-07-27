import type { ProjectCategory } from "./enums"

export interface Project {
  Title: string
  Description: string
  ImageUrl: string
  ProjectCategory: ProjectCategory
  Technologies: string[]
  GithubUrl: string
  LiveUrl: string
  KeyFeatures: string[]
  Screenshots: string[]
}
