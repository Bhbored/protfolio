/** Matches `experiences` — nullable DB columns coerced to defaults in the data layer */
export interface Experience {
  id?: string
  title: string
  company: string
  period: string
  description: string[]
}
