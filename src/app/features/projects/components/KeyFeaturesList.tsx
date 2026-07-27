interface KeyFeaturesListProps {
  readonly features: readonly string[];
}

export default function KeyFeaturesList({ features }: KeyFeaturesListProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(145deg,rgba(20,20,25,0.85)_0%,rgba(10,10,15,0.95)_100%)] backdrop-blur-2xl p-7 border border-white/10 transition-all duration-[0.4s] hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_24px_48px_rgba(0,0,0,0.4),0_0_80px_rgba(0,240,255,0.03)] group flex-1">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-cyan-500 via-cyan-400 to-transparent" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors duration-500" />

      <div className="relative mb-6 pb-4 border-b border-white/5">
        <h3 className="text-xl font-bold uppercase tracking-wider mb-1.5">
          <span className="bg-linear-to-r from-cyan-300 via-cyan-400 to-cyan-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            Key Features
          </span>
        </h3>
        <p className="text-[11px] uppercase tracking-[0.15em] text-zinc-500 font-medium">
          What makes this project stand out
        </p>
      </div>

      <div className="relative flex flex-col gap-1.5">
        {features.map((feature, i) => (
          <div
            key={i}
            className="flex items-start gap-3.5 p-3.5 bg-white/1.5 border border-white/4 rounded-[10px] transition-all duration-[0.35s] hover:bg-cyan-500/5 hover:border-cyan-500/20 hover:translate-x-1.5 hover:shadow-[0_4px_20px_rgba(6,182,212,0.08)] group/feature"
          >
            <span className="shrink-0 w-1.5 h-1.5 mt-1.75 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)] transition-all duration-[0.35s] group-hover/feature:shadow-[0_0_24px_rgba(34,211,238,0.9)] group-hover/feature:scale-140" />
            <p className="text-sm leading-relaxed text-zinc-400 transition-colors duration-300 group-hover/feature:text-white/90">
              {feature}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
