import { getProjectCategoryName } from "../../../../lib/project-category"

interface ProjectInfoCardProps {
  readonly category: number
  readonly repositoryUrl?: string
  readonly technologyCount: number
}

export default function ProjectInfoCard({ category, repositoryUrl, technologyCount }: ProjectInfoCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(145deg,rgba(20,20,25,0.85)_0%,rgba(10,10,15,0.95)_100%)] backdrop-blur-2xl p-7 border border-white/10 transition-all duration-[0.4s] hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_24px_48px_rgba(0,0,0,0.4),0_0_80px_rgba(0,240,255,0.03)] group h-90 md:h-85">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-orange-500 via-orange-400 to-transparent" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors duration-500" />

      <div className="relative mb-6 pb-4 border-b border-white/5">
        <h3 className="text-xl font-bold uppercase tracking-wider mb-1.5">
          <span className="bg-linear-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(251,146,60,0.3)]">
            Project Information
          </span>
        </h3>
        <p className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-medium">
          Essential details about this project
        </p>
      </div>

      <div className="relative flex flex-col gap-0">
        
        <div className="py-4.5 border-b border-white/4 first:pt-0 last:pb-0 last:border-b-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-orange-400 mb-1.5 drop-shadow-[0_0_16px_rgba(251,146,60,0.2)]">
            Category
          </p>
          <p className="text-[0.938rem] text-white/85 tracking-[0.01em]">
            {getProjectCategoryName(category)}
          </p>
        </div>

        
        {repositoryUrl && (
          <div className="py-4.5 border-b border-white/4 first:pt-0 last:pb-0 last:border-b-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-orange-400 mb-1.5 drop-shadow-[0_0_16px_rgba(251,146,60,0.2)]">
              Repository
            </p>
            <a
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 text-[0.938rem] text-white/85 no-underline transition-all duration-300 hover:text-orange-400 group/link"
            >
              View on GitHub
              <svg className="w-3.5 h-3.5 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="absolute -bottom-0.75 left-0 w-0 h-[1.5px] bg-linear-to-r from-orange-400 to-orange-500 transition-all duration-[0.35s] shadow-[0_0_8px_rgba(251,146,60,0.4)] group-hover/link:w-full" />
            </a>
          </div>
        )}

        
        <div className="py-4.5 border-b border-white/4 first:pt-0 last:pb-0 last:border-b-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-orange-400 mb-1.5 drop-shadow-[0_0_16px_rgba(251,146,60,0.2)]">
            Tech Stack
          </p>
          <p className="text-[0.938rem] text-white/85 tracking-[0.01em]">
            {technologyCount} Technologies
          </p>
        </div>
      </div>
    </div>
  )
}
