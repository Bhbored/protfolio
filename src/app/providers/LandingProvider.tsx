import type { ReactNode } from "react"
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react"
import { useQuery } from "@tanstack/react-query"
import type {
  PersonalInfo,
  Skill,
  SkillCategory,
  Project,
  Certificate,
  Experience,
  Education,
} from "../shared/types"
import {
  EMPTY_PERSONAL_INFO,
  personalInfoQueries,
} from "../features/landing/personal-info.service"
import {
  getSkillsByCategoryId as filterSkillsByCategory,
  skillQueries,
} from "../features/skills/skills.service"
import { projectQueries } from "../features/projects/projects.service"
import {
  getTop3SkillsByCertificateId as filterTopSkills,
  withCertificateTopSkills,
  certificateQueries,
} from "../features/certificates/certificates.service"
import { experienceQueries } from "../features/experience/experiences.service"
import { educationQueries } from "../features/education/educations.service"

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

export function LandingProvider({
  children,
}: {
  readonly children: ReactNode
}) {
  const [currentSection, setCurrentSection] = useState("Home")

  const personalInfoQuery = useQuery(personalInfoQueries.detail())
  const skillsQuery = useQuery(skillQueries.list())
  const categoriesQuery = useQuery(skillQueries.categories())
  const projectsQuery = useQuery(projectQueries.list())
  const certificatesQuery = useQuery(certificateQueries.list())
  const experiencesQuery = useQuery(experienceQueries.list())
  const educationsQuery = useQuery(educationQueries.list())

  useEffect(() => {
    const errors = [
      personalInfoQuery.error,
      skillsQuery.error,
      categoriesQuery.error,
      projectsQuery.error,
      certificatesQuery.error,
      experiencesQuery.error,
      educationsQuery.error,
    ].filter(Boolean)

    for (const error of errors) {
      console.error("[LandingProvider]", error)
    }
  }, [
    personalInfoQuery.error,
    skillsQuery.error,
    categoriesQuery.error,
    projectsQuery.error,
    certificatesQuery.error,
    experiencesQuery.error,
    educationsQuery.error,
  ])

  const navigateToSection = useCallback((section: string) => {
    setCurrentSection(section)
    const el = document.getElementById(section.toLowerCase())
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }, [])

  const personalInfo = personalInfoQuery.data ?? EMPTY_PERSONAL_INFO
  const skills = skillsQuery.data ?? []
  const categories = categoriesQuery.data ?? []
  const projects = projectsQuery.data ?? []
  const experiences = experiencesQuery.data ?? []
  const educations = educationsQuery.data ?? []

  const certificates = useMemo(
    () => withCertificateTopSkills(certificatesQuery.data ?? [], skills),
    [certificatesQuery.data, skills],
  )

  const getSkillsByCategoryId = useCallback(
    (categoryId: string) => filterSkillsByCategory(skills, categoryId),
    [skills],
  )

  const getTop3SkillsByCertificateId = useCallback(
    (certificateId: string) => filterTopSkills(skills, certificateId),
    [skills],
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
