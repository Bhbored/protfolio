import { Navigate, Route, Routes } from "react-router-dom"
import { AuthProvider } from "../providers/AuthProvider"
import AdminLayout from "../features/admin/components/AdminLayout"
import ProtectedRoute from "../features/admin/components/ProtectedRoute"
import LoginPage from "../features/admin/pages/LoginPage"
import DashboardPage from "../features/admin/pages/DashboardPage"
import PersonalInfoPage from "../features/admin/pages/PersonalInfoPage"
import SkillsPage from "../features/admin/pages/SkillsPage"
import CategoriesPage from "../features/admin/pages/CategoriesPage"
import ProjectsPage from "../features/admin/pages/ProjectsPage"
import ExperiencesPage from "../features/admin/pages/ExperiencesPage"
import EducationsPage from "../features/admin/pages/EducationsPage"
import CertificatesPage from "../features/admin/pages/CertificatesPage"

export default function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="personal-info" element={<PersonalInfoPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="experiences" element={<ExperiencesPage />} />
          <Route path="educations" element={<EducationsPage />} />
          <Route path="certificates" element={<CertificatesPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
