import { Link } from "react-router-dom"
import { ArrowUpRight, ExternalLink, UserRound } from "lucide-react"
import type { PersonalInfo } from "../../../../shared/types"
import { resolveMediaUrl } from "../../../../../lib/media-url"

interface WelcomeStripProps {
  readonly personalInfo: PersonalInfo | undefined
  readonly loading: boolean
  readonly projectCount: number
  readonly skillCount: number
}

export default function WelcomeStrip({
  personalInfo,
  loading,
  projectCount,
  skillCount,
}: WelcomeStripProps) {
  if (loading) {
    return (
      <div className="animate-pulse overflow-hidden rounded-3xl border border-white/[0.08] bg-surface-container-high p-5 sm:p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-white/10 sm:size-20" />
            <div className="flex-1 space-y-3">
              <div className="h-3 w-24 rounded bg-white/10" />
              <div className="h-7 w-3/4 max-w-xs rounded bg-white/10" />
              <div className="h-3 w-1/2 max-w-[12rem] rounded bg-white/5" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="h-16 rounded-2xl bg-white/5" />
            <div className="h-16 rounded-2xl bg-white/5" />
            <div className="col-span-2 h-12 rounded-2xl bg-white/5 sm:col-span-1 sm:h-16" />
          </div>
        </div>
      </div>
    )
  }

  const name = personalInfo?.name?.trim() || "Creator"
  const firstName = name.split(/\s+/)[0] || name
  const title = personalInfo?.title?.trim() || "Set your title in Personal Info"
  const avatar = resolveMediaUrl(personalInfo?.profile_image)
  const available = personalInfo?.is_available_for_work ?? false
  const location = personalInfo?.location?.trim()

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-surface-container-high">
      
      <div
        className="pointer-events-none absolute inset-0 mesh-gradient opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-0 size-56 rounded-full bg-primary/15 blur-3xl sm:size-72"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-16 size-48 rounded-full bg-secondary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent"
        aria-hidden
      />

      <div className="relative flex flex-col gap-6 p-5 sm:gap-7 sm:p-6 md:p-8">
        
        <div className="flex items-start gap-4">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-primary/10 shadow-[0_0_40px_rgba(0,240,255,0.12)] sm:size-20">
            {avatar ? (
              <img src={avatar} alt="" className="size-full object-cover" />
            ) : (
              <div className="flex size-full items-center justify-center text-primary">
                <UserRound className="size-8 sm:size-9" aria-hidden />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex min-h-7 items-center gap-1.5 rounded-full px-2.5 font-label text-[10px] uppercase tracking-[0.14em] ${
                  available
                    ? "bg-primary/15 text-primary"
                    : "bg-white/5 text-on-surface-variant"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${available ? "bg-primary motion-safe:animate-pulse" : "bg-on-surface-variant"}`}
                  aria-hidden
                />
                {available ? "Open to work" : "Unavailable"}
              </span>
              {location ? (
                <span className="truncate font-label text-[10px] uppercase tracking-wider text-on-surface-variant/80">
                  {location}
                </span>
              ) : null}
            </div>

            <h2 className="mt-2 font-headline text-2xl font-bold leading-tight tracking-tight text-on-surface sm:text-3xl md:text-4xl">
              Hey, {firstName}
            </h2>
            <p className="mt-1 line-clamp-2 font-body text-sm text-on-surface-variant sm:text-base">
              {title}
            </p>
          </div>
        </div>

        
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-white/[0.06] bg-black/20 px-3 py-3 sm:px-4">
            <p className="font-label text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">
              Projects
            </p>
            <p className="mt-1 font-headline text-2xl font-bold tabular-nums text-on-surface">
              {projectCount}
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-black/20 px-3 py-3 sm:px-4">
            <p className="font-label text-[10px] uppercase tracking-[0.16em] text-on-surface-variant">
              Skills
            </p>
            <p className="mt-1 font-headline text-2xl font-bold tabular-nums text-on-surface">
              {skillCount}
            </p>
          </div>

          <Link
            to="/admin/personal-info"
            className="col-span-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-primary to-primary-container px-4 font-label text-xs font-bold uppercase tracking-widest text-background transition-transform active:scale-[0.98] motion-safe:hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:col-span-1 sm:min-h-0"
          >
            Edit profile
            <ArrowUpRight className="size-3.5" aria-hidden />
          </Link>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-4 font-label text-xs uppercase tracking-widest text-on-surface transition-colors hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:col-span-1 sm:min-h-0"
          >
            Live site
            <ExternalLink className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
