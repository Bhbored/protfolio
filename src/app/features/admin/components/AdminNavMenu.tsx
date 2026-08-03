import { NavLink } from "react-router-dom"
import {
  LayoutDashboard,
  User,
  Zap,
  Layers,
  Briefcase,
  History,
  GraduationCap,
  BadgeCheck,
  LogOut,
  X,
} from "lucide-react"
import { useAuth } from "../../../providers/AuthProvider"

const navItems: {
  to: string
  label: string
  icon: typeof LayoutDashboard
  end?: boolean
}[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/personal-info", label: "Personal Info", icon: User },
  { to: "/admin/skills", label: "Skills", icon: Zap },
  { to: "/admin/categories", label: "Categories", icon: Layers },
  { to: "/admin/projects", label: "Projects", icon: Briefcase },
  { to: "/admin/experiences", label: "Experience", icon: History },
  { to: "/admin/educations", label: "Education", icon: GraduationCap },
  { to: "/admin/certificates", label: "Certificates", icon: BadgeCheck },
]

interface AdminNavMenuProps {
  readonly onNavigate?: () => void
}

export default function AdminNavMenu({ onNavigate }: AdminNavMenuProps) {
  const { logout } = useAuth()

  return (
    <nav className="flex h-full flex-col" aria-label="Admin">
      <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex cursor-pointer items-center gap-3 rounded-md px-3 py-3 font-label text-sm tracking-wide transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  isActive
                    ? "bg-linear-to-r from-primary/15 to-primary/5 text-primary shadow-glow-cyan"
                    : "text-on-surface-variant hover:translate-x-0.5 hover:text-on-surface"
                }`
              }
            >
              <Icon className="size-5 shrink-0" aria-hidden />
              {label}
            </NavLink>
            <hr className="mt-1 border-white/5" />
          </li>
        ))}
      </ul>
      <div className="border-t border-white/10 p-3">
        <button
          type="button"
          onClick={() => {
            logout()
            onNavigate?.()
          }}
          className="flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-3 font-label text-sm tracking-wide text-secondary transition-colors hover:bg-secondary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          <LogOut className="size-5" aria-hidden />
          Logout
        </button>
      </div>
      {onNavigate && (
        <button
          type="button"
          onClick={onNavigate}
          className="absolute top-4 right-4 cursor-pointer text-on-surface-variant hover:text-on-surface md:hidden"
          aria-label="Close menu"
        >
          <X className="size-5" />
        </button>
      )}
    </nav>
  )
}
