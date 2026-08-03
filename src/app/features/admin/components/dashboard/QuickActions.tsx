import { Link } from "react-router-dom"
import {
  Briefcase,
  GraduationCap,
  History,
  UserRound,
  Zap,
  BadgeCheck,
} from "lucide-react"
import DashPanel, { PanelHeader } from "./DashPanel"

const actions = [
  {
    to: "/admin/projects",
    label: "New project",
    hint: "Add showcase work",
    icon: Briefcase,
    accent: "from-primary/20 to-primary/5 text-primary",
  },
  {
    to: "/admin/personal-info",
    label: "Profile",
    hint: "Photo, bio, links",
    icon: UserRound,
    accent: "from-secondary/20 to-secondary/5 text-secondary",
  },
  {
    to: "/admin/skills",
    label: "Skills",
    hint: "Mastery levels",
    icon: Zap,
    accent: "from-primary/20 to-transparent text-primary",
  },
  {
    to: "/admin/certificates",
    label: "Certificates",
    hint: "Credentials",
    icon: BadgeCheck,
    accent: "from-white/10 to-transparent text-on-surface",
  },
  {
    to: "/admin/experiences",
    label: "Experience",
    hint: "Work history",
    icon: History,
    accent: "from-white/10 to-transparent text-on-surface",
  },
  {
    to: "/admin/educations",
    label: "Education",
    hint: "Schools & courses",
    icon: GraduationCap,
    accent: "from-white/10 to-transparent text-on-surface",
  },
] as const

export default function QuickActions() {
  return (
    <DashPanel className="h-full" padded={false}>
      <div className="p-4 sm:p-5 md:p-6">
        <PanelHeader title="Quick actions" subtitle="Jump into editing" />
      </div>

      
      <div className="flex gap-3 overflow-x-auto px-4 pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-5 sm:pb-5 md:px-6 md:pb-6 [&::-webkit-scrollbar]:hidden">
        {actions.map(({ to, label, hint, icon: Icon, accent }) => (
          <Link
            key={to}
            to={to}
            className="group flex w-[72%] max-w-[240px] shrink-0 snap-start flex-col gap-3 rounded-2xl border border-white/[0.06] bg-linear-to-br from-surface-container-highest to-surface-container-high p-4 transition-all active:scale-[0.98] motion-safe:hover:border-primary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto sm:max-w-none"
          >
            <span
              className={`flex size-11 items-center justify-center rounded-xl bg-linear-to-br ${accent}`}
            >
              <Icon className="size-5" aria-hidden />
            </span>
            <span>
              <span className="block font-headline text-sm font-bold text-on-surface group-hover:text-primary">
                {label}
              </span>
              <span className="mt-0.5 block font-body text-xs text-on-surface-variant">
                {hint}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </DashPanel>
  )
}
