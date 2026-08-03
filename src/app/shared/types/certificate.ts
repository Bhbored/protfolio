import type { Skill } from "./skill"

export interface Certificate {
  id: string
  title: string
  issuer: string
  year: string
  link: string | null
  top_skills: Skill[]
}
