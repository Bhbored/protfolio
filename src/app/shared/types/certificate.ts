import type { Skill } from "./skill"

export interface Certificate {
  Id: string
  Title: string
  Issuer: string
  Year: string
  Link?: string
  TopSKills: Skill[]
}
