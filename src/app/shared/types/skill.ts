export interface Skill {
  Id: string
  Title: string
  Icon: number
  SkillCategoryID: string | null
  CertificateID: string | null
  MasteryLevel: number
  IsNew: boolean
  Details: string[]
}

export interface SkillCategory {
  Id: string
  Category: string
}
