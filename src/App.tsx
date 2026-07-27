import { BrowserRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import MainLayout from "./app/shared/components/layout/MainLayout"
import EmptyLayout from "./app/shared/components/layout/EmptyLayout"

const queryClient = new QueryClient()

function HomePage() {
  return (
    <div className="min-h-[200vh]">
      <section id="home" className="h-screen flex items-center justify-center">
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-white">
          Home
        </h1>
      </section>
      <section id="skills" className="h-screen flex items-center justify-center">
        <h2 className="font-headline text-4xl text-white">Skills</h2>
      </section>
      <section id="projects" className="h-screen flex items-center justify-center">
        <h2 className="font-headline text-4xl text-white">Projects</h2>
      </section>
      <section id="experience" className="h-screen flex items-center justify-center">
        <h2 className="font-headline text-4xl text-white">Experience</h2>
      </section>
      <section id="certificates" className="h-screen flex items-center justify-center">
        <h2 className="font-headline text-4xl text-white">Certificates</h2>
      </section>
      <section id="education" className="h-screen flex items-center justify-center">
        <h2 className="font-headline text-4xl text-white">Education</h2>
      </section>
      <section id="contact" className="h-screen flex items-center justify-center">
        <h2 className="font-headline text-4xl text-white">Contact</h2>
      </section>
    </div>
  )
}

function ProjectDetailsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="font-headline text-4xl text-white">Project Details</h1>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
          </Route>
          <Route element={<EmptyLayout />}>
            <Route path="project/:id" element={<ProjectDetailsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
