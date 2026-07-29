import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import MainLayout from "./app/shared/components/layout/MainLayout"
import EmptyLayout from "./app/shared/components/layout/EmptyLayout"
import { LandingProvider } from "./app/providers/LandingProvider"
import HeroSection from "./app/features/landing/HeroSection"
import SkillsSection from "./app/features/skills/SkillsSection"
import ProjectsSection from "./app/features/projects/ProjectsSection"
import CertificatesSection from "./app/features/certificates/CertificatesSection"
import ExperienceSection from "./app/features/experience/ExperienceSection"
import EducationSection from "./app/features/education/EducationSection"
import ContactSection from "./app/features/contact/ContactSection"
import ProjectDetailsPage from "./app/routes/ProjectDetailsPage"

const queryClient = new QueryClient()

function HomePage() {
  return (
    <div>
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <CertificatesSection />
      <EducationSection />
      <ContactSection />
    </div>
  )
}

function LandingLayout() {
  return (
    <LandingProvider>
      <MainLayout />
    </LandingProvider>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<LandingLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route element={<EmptyLayout />}>
            <Route path="project/:id" element={<LandingProvider><ProjectDetailsPage /></LandingProvider>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
