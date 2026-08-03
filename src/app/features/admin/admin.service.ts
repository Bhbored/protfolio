import { supabase } from "../../shared/api/supabase"
import { asStringArray, throwIfError } from "../../shared/api/supabase-utils"
import type {
  PersonalInfo,
  Skill,
  SkillCategory,
  Project,
  Certificate,
  Experience,
  Education,
  ProjectCategory,
  SocialLinks,
  Language,
  ProficiencyLevel,
} from "../../shared/types"
import { personalInfoKeys } from "../landing/personal-info.service"
import { skillKeys } from "../skills/skills.service"
import { projectKeys } from "../projects/projects.service"
import { certificateKeys } from "../certificates/certificates.service"
import { experienceKeys } from "../experience/experiences.service"
import { educationKeys } from "../education/educations.service"
import { materialIconMap } from "../../shared/data/icons"
import type { LucideIcon } from "lucide-react"

export {
  personalInfoKeys,
  skillKeys,
  projectKeys,
  certificateKeys,
  experienceKeys,
  educationKeys,
}

export type CertificateRow = Omit<Certificate, "top_skills">

export type NewSkill = Omit<Skill, "id">
export type NewCategory = Omit<SkillCategory, "id">
export type NewProject = Omit<Project, "id">
export type NewCertificate = Omit<CertificateRow, "id">
export type NewExperience = Omit<Experience, "id">
export type NewEducation = Omit<Education, "id">

function asSocial(value: unknown): SocialLinks {
  const social = (value ?? {}) as Record<string, unknown>
  return {
    github: String(social.github ?? ""),
    linkedin: String(social.linkedin ?? ""),
  }
}

function asLanguages(value: unknown): Language[] {
  if (!Array.isArray(value)) return []
  return value.map((item) => {
    const lang = (item ?? {}) as Record<string, unknown>
    return {
      name: String(lang.name ?? ""),
      proficiency: Number(lang.proficiency ?? 0) as ProficiencyLevel,
    }
  })
}

function normalizePersonalInfo(row: PersonalInfo): PersonalInfo {
  return {
    ...row,
    phone: row.phone ?? "",
    location: row.location ?? "",
    summary: row.summary ?? "",
    headline: row.headline ?? "",
    profile_image: row.profile_image ?? "",
    is_available_for_work: row.is_available_for_work ?? false,
    social: asSocial(row.social),
    languages: asLanguages(row.languages),
  }
}

function normalizeSkill(row: Skill): Skill {
  return {
    ...row,
    icon: row.icon ?? 0,
    mastery_level: Number(row.mastery_level ?? 0),
    is_new: row.is_new ?? false,
    details: asStringArray(row.details),
  }
}

function normalizeProject(row: Project): Project {
  return {
    ...row,
    description: row.description ?? "",
    image_url: row.image_url ?? "",
    project_category: (row.project_category ?? 0) as ProjectCategory,
    github_url: row.github_url ?? "",
    live_url: row.live_url ?? "",
    technologies: asStringArray(row.technologies),
    key_features: asStringArray(row.key_features),
    screenshots: asStringArray(row.screenshots),
  }
}

function normalizeCertificate(row: CertificateRow): CertificateRow {
  return { ...row, year: row.year ?? "", link: row.link ?? null }
}

function normalizeExperience(row: Experience): Experience {
  return {
    ...row,
    period: row.period ?? "",
    description: asStringArray(row.description),
  }
}

function normalizeEducation(row: Education): Education {
  return { ...row, year: row.year ?? "" }
}

// ── Personal info ──

export async function updatePersonalInfo(
  id: string,
  patch: Omit<PersonalInfo, "id">,
): Promise<PersonalInfo> {
  const result = await supabase
    .from("personal_info")
    .update({
      name: patch.name,
      title: patch.title,
      email: patch.email,
      phone: patch.phone,
      location: patch.location,
      summary: patch.summary,
      headline: patch.headline,
      profile_image: patch.profile_image,
      is_available_for_work: patch.is_available_for_work,
      social: patch.social,
      languages: patch.languages,
    })
    .eq("id", id)
    .select()
    .single()
  const data = await throwIfError(result, "personal_info.update")
  return normalizePersonalInfo(data as PersonalInfo)
}

export async function createPersonalInfo(
  patch: Omit<PersonalInfo, "id">,
): Promise<PersonalInfo> {
  const result = await supabase
    .from("personal_info")
    .insert({
      name: patch.name,
      title: patch.title,
      email: patch.email,
      phone: patch.phone,
      location: patch.location,
      summary: patch.summary,
      headline: patch.headline,
      profile_image: patch.profile_image,
      is_available_for_work: patch.is_available_for_work,
      social: patch.social,
      languages: patch.languages,
    })
    .select()
    .single()
  const data = await throwIfError(result, "personal_info.create")
  return normalizePersonalInfo(data as PersonalInfo)
}

// ── Skills ──

export async function createSkill(row: NewSkill): Promise<Skill> {
  const result = await supabase.from("skills").insert(row).select().single()
  const data = await throwIfError(result, "skills.create")
  return normalizeSkill(data as Skill)
}

export async function updateSkill(id: string, row: NewSkill): Promise<Skill> {
  const result = await supabase
    .from("skills")
    .update(row)
    .eq("id", id)
    .select()
    .single()
  const data = await throwIfError(result, "skills.update")
  return normalizeSkill(data as Skill)
}

export async function deleteSkill(id: string): Promise<void> {
  const result = await supabase.from("skills").delete().eq("id", id)
  await throwIfError(result, "skills.delete")
}

// ── Categories ──

export async function createCategory(row: NewCategory): Promise<SkillCategory> {
  const result = await supabase
    .from("skill_categories")
    .insert(row)
    .select()
    .single()
  const data = await throwIfError(result, "skill_categories.create")
  return data as SkillCategory
}

export async function updateCategory(
  id: string,
  row: NewCategory,
): Promise<SkillCategory> {
  const result = await supabase
    .from("skill_categories")
    .update(row)
    .eq("id", id)
    .select()
    .single()
  const data = await throwIfError(result, "skill_categories.update")
  return data as SkillCategory
}

export async function deleteCategory(id: string): Promise<void> {
  const result = await supabase.from("skill_categories").delete().eq("id", id)
  await throwIfError(result, "skill_categories.delete")
}

// ── Projects ──

export async function createProject(row: NewProject): Promise<Project> {
  const result = await supabase.from("projects").insert(row).select().single()
  const data = await throwIfError(result, "projects.create")
  return normalizeProject(data as Project)
}

export async function updateProject(
  id: string,
  row: NewProject,
): Promise<Project> {
  const result = await supabase
    .from("projects")
    .update(row)
    .eq("id", id)
    .select()
    .single()
  const data = await throwIfError(result, "projects.update")
  return normalizeProject(data as Project)
}

export async function deleteProject(id: string): Promise<void> {
  const result = await supabase.from("projects").delete().eq("id", id)
  await throwIfError(result, "projects.delete")
}

// ── Certificates ──

export async function createCertificate(
  row: NewCertificate,
): Promise<CertificateRow> {
  const result = await supabase
    .from("certificates")
    .insert(row)
    .select()
    .single()
  const data = await throwIfError(result, "certificates.create")
  return normalizeCertificate(data as CertificateRow)
}

export async function updateCertificate(
  id: string,
  row: NewCertificate,
): Promise<CertificateRow> {
  const result = await supabase
    .from("certificates")
    .update(row)
    .eq("id", id)
    .select()
    .single()
  const data = await throwIfError(result, "certificates.update")
  return normalizeCertificate(data as CertificateRow)
}

export async function deleteCertificate(id: string): Promise<void> {
  const result = await supabase.from("certificates").delete().eq("id", id)
  await throwIfError(result, "certificates.delete")
}

// ── Experiences ──

export async function createExperience(
  row: NewExperience,
): Promise<Experience> {
  const result = await supabase
    .from("experiences")
    .insert(row)
    .select()
    .single()
  const data = await throwIfError(result, "experiences.create")
  return normalizeExperience(data as Experience)
}

export async function updateExperience(
  id: string,
  row: NewExperience,
): Promise<Experience> {
  const result = await supabase
    .from("experiences")
    .update(row)
    .eq("id", id)
    .select()
    .single()
  const data = await throwIfError(result, "experiences.update")
  return normalizeExperience(data as Experience)
}

export async function deleteExperience(id: string): Promise<void> {
  const result = await supabase.from("experiences").delete().eq("id", id)
  await throwIfError(result, "experiences.delete")
}

// ── Educations ──

export async function createEducation(row: NewEducation): Promise<Education> {
  const result = await supabase.from("educations").insert(row).select().single()
  const data = await throwIfError(result, "educations.create")
  return normalizeEducation(data as Education)
}

export async function updateEducation(
  id: string,
  row: NewEducation,
): Promise<Education> {
  const result = await supabase
    .from("educations")
    .update(row)
    .eq("id", id)
    .select()
    .single()
  const data = await throwIfError(result, "educations.update")
  return normalizeEducation(data as Education)
}

export async function deleteEducation(id: string): Promise<void> {
  const result = await supabase.from("educations").delete().eq("id", id)
  await throwIfError(result, "educations.delete")
}

// ── Icon picker helpers ──

export interface IconOption {
  id: number
  name: string
  Icon: LucideIcon
}

export function getIconOptions(): IconOption[] {
  return Object.entries(materialIconMap)
    .map(([id, Icon]) => ({
      id: Number(id),
      name: Icon.displayName ?? Icon.name ?? String(id),
      Icon,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}
