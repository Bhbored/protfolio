import { ProficiencyLevel } from "../app/shared/types"

export function getProficiencyText(level: number): string {
  switch (level) {
    case ProficiencyLevel.Elementary: return "Elementary Proficiency"
    case ProficiencyLevel.Intermediate: return "Intermediate Proficiency"
    case ProficiencyLevel.Advanced: return "Advanced Proficiency"
    case ProficiencyLevel.Native: return "Native"
    default: return "Unknown"
  }
}
