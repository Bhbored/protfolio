import type { ProficiencyLevel } from "./enums"

export interface SocialLinks {
  github: string
  linkedin: string
}

export interface Language {
  name: string
  proficiency: ProficiencyLevel
}

/** Matches `personal_info` — nullable DB columns coerced to defaults in the data layer */
export interface PersonalInfo {
  id?: string
  name: string
  title: string
  email: string
  phone: string
  location: string
  summary: string
  headline: string
  profile_image: string
  is_available_for_work: boolean
  social: SocialLinks
  languages: Language[]
}
