import type { ReactNode } from "react"
import { createContext, useContext, useState, useCallback, useMemo } from "react"
import { personalInfo } from "../../data/mockData"
import skillsData from "../shared/data/Skills.json"
import categoriesData from "../shared/data/SkillCategories.json"
import projectsData from "../shared/data/Projects.json"
import certificatesData from "../shared/data/Certificates.json"
import experiencesData from "../shared/data/Experiences.json"
import educationsData from "../shared/data/Educations.json"
import type { PersonalInfo, Skill, SkillCategory, Project, Certificate, Experience, Education } from "../shared/types"

interface ExperienceJson {
  title: string; company: string; period: string; description: string[]
}

interface EducationJson {
  id: string; title: string; issuer: string; year: string
}

function toExperience(j: ExperienceJson): Experience {
  return { Title: j.title, Company: j.company, Period: j.period, Description: j.description }
}

function toEducation(j: EducationJson): Education {
  return { Id: j.id, Title: j.title, Issuer: j.issuer, Year: j.year }
}

// ── JSON data mappers ──

interface SkillJson {
  id: string; title: string; icon: number
  skillCategoryID: string | null; certificateID: string | null
  masteryLevel: number; isNew: boolean; details: string[]
}

interface CategoryJson { id: string; category: string }

interface ProjectJson {
  title: string; description: string; imageUrl: string
  projectCategory: number; technologies: string[]; githubUrl: string
  liveUrl: string; keyFeatures: string[]; screenshots: string[]
}

function toSkill(j: SkillJson): Skill {
  return { Id: j.id, Title: j.title, Icon: j.icon, SkillCategoryID: j.skillCategoryID, CertificateID: j.certificateID, MasteryLevel: j.masteryLevel, IsNew: j.isNew, Details: j.details }
}

function toCategory(j: CategoryJson): SkillCategory {
  return { Id: j.id, Category: j.category }
}

interface CertificateJson {
  id: string; title: string; issuer: string
  year: string; link?: string; topSKills: SkillJson[]
}

function toCertificate(j: CertificateJson, getTopSkills: (id: string) => Skill[]): Certificate {
  return { Id: j.id, Title: j.title, Issuer: j.issuer, Year: j.year, Link: j.link, TopSKills: getTopSkills(j.id) }
}

function toProject(j: ProjectJson): Project {
  return { Title: j.title, Description: j.description, ImageUrl: j.imageUrl, ProjectCategory: j.projectCategory as never, Technologies: j.technologies, GithubUrl: j.githubUrl, LiveUrl: j.liveUrl, KeyFeatures: j.keyFeatures, Screenshots: j.screenshots }
}

// ── State shape ──

interface LandingState {
  personalInfo: PersonalInfo
  currentSection: string
  navigateToSection: (section: string) => void
  skills: Skill[]
  categories: SkillCategory[]
  getSkillsByCategoryId: (id: string) => Skill[]
  getTop3SkillsByCertificateId: (id: string) => Skill[]
  projects: Project[]
  certificates: Certificate[]
  experiences: Experience[]
  educations: Education[]
}

const LandingContext = createContext<LandingState | null>(null)

export function LandingProvider({ children }: { readonly children: ReactNode }) {
  const [currentSection, setCurrentSection] = useState("Home")

  const navigateToSection = useCallback((section: string) => {
    setCurrentSection(section)
    const el = document.getElementById(section.toLowerCase())
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }, [])

  const skills = useMemo(() => (skillsData as SkillJson[]).map(toSkill), [])
  const categories = useMemo(() => (categoriesData as CategoryJson[]).map(toCategory), [])
  const projects = useMemo(() => (projectsData as ProjectJson[]).map(toProject), [])
  const experiences = useMemo(() => (experiencesData as ExperienceJson[]).map(toExperience), [])
  const educations = useMemo(() => (educationsData as EducationJson[]).map(toEducation), [])

  const getSkillsByCategoryId = useCallback(
    (categoryId: string) => skills.filter((s) => s.SkillCategoryID === categoryId),
    [skills]
  )

  const getTop3SkillsByCertificateIdFn = useCallback(
    (certId: string) =>
      skills
        .filter((s) => s.CertificateID === certId)
        .sort((a, b) => b.MasteryLevel - a.MasteryLevel)
        .slice(0, 3),
    [skills]
  )

  const certificates = useMemo(
    () => (certificatesData as CertificateJson[]).map((j) => toCertificate(j, getTop3SkillsByCertificateIdFn)),
    [getTop3SkillsByCertificateIdFn]
  )

  const getTop3SkillsByCertificateId = useCallback(
    (certificateId: string) =>
      skills
        .filter((s) => s.CertificateID === certificateId)
        .sort((a, b) => b.MasteryLevel - a.MasteryLevel)
        .slice(0, 3),
    [skills]
  )

  return (
    <LandingContext.Provider
      value={{
        personalInfo,
        currentSection,
        navigateToSection,
        skills,
        categories,
        getSkillsByCategoryId,
        getTop3SkillsByCertificateId,
        projects,
        certificates,
        experiences,
        educations,
      }}
    >
      {children}
    </LandingContext.Provider>
  )
}

export function useLanding(): LandingState {
  const ctx = useContext(LandingContext)
  if (!ctx) throw new Error("useLanding must be used within LandingProvider")
  return ctx
}
