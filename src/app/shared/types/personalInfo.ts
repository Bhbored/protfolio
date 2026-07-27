import type { ProficiencyLevel } from "./enums"

export interface SocialLinks {
  Github: string
  Linkedin: string
}

export interface Language {
  Name: string
  Proficiency: ProficiencyLevel
}

export interface PersonalInfo {
  Name: string
  Title: string
  Email: string
  Phone: string
  Location: string
  Summary: string
  HeadLine: string
  ProfileImage: string
  IsAvailableForWork: boolean
  Social: SocialLinks
  Languages: Language[]
}
