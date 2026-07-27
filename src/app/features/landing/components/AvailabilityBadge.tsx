export default function AvailabilityBadge() {
  return (
    <div className="flex items-center gap-3 px-3 py-1.5 md:px-4 md:py-2 bg-surface-container-low border border-outline-variant/20 hover:scale-105 transition-transform duration-300 animate-scale-in">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-container" />
      </span>
      <span className="font-headline text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-white/60">
        Available for Work
      </span>
    </div>
  )
}
