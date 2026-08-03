
export interface Skill {
  id: string
  title: string
  icon: number
  skill_category_id: string | null
  certificate_id: string | null
  mastery_level: number
  is_new: boolean
  details: string[]
}

export interface SkillCategory {
  id: string
  category: string
}
