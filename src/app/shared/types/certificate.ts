import type { Skill } from "./skill"

/** Matches `certificates` (+ client-enriched `top_skills`) */
export interface Certificate {
  id: string
  title: string
  issuer: string
  year: string
  link: string | null
  top_skills: Skill[]
}
