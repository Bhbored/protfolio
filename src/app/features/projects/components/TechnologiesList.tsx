interface TechnologiesListProps {
  readonly technologies: readonly string[]
}

export default function TechnologiesList({ technologies }: TechnologiesListProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(145deg,rgba(20,20,25,0.85)_0%,rgba(10,10,15,0.95)_100%)] backdrop-blur-2xl p-7 border border-white/10 transition-all duration-[0.4s] hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_24px_48px_rgba(0,0,0,0.4),0_0_80px_rgba(0,240,255,0.03)] group">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-cyan-500 via-cyan-400 to-transparent" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors duration-500" />

      <div className="relative mb-6 pb-4 border-b border-white/5">
        <h3 className="text-xl font-bold uppercase tracking-wider mb-1.5">
          <span className="bg-linear-to-r from-cyan-300 via-cyan-400 to-cyan-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            Technologies Used
          </span>
        </h3>
        <p className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-medium">
          The tools and frameworks powering this project
        </p>
      </div>

      <div className="relative flex flex-wrap gap-2.5">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-default border bg-[linear-gradient(135deg,rgba(6,182,212,0.15)_0%,rgba(8,145,178,0.08)_100%)] border-cyan-500/25 text-cyan-300 hover:bg-[linear-gradient(135deg,rgba(6,182,212,0.25)_0%,rgba(8,145,178,0.15)_100%)] hover:border-cyan-500/50 hover:text-cyan-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(6,182,212,0.25),0_0_24px_rgba(34,211,238,0.1)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
