export default function AvailabilityBadge() {
  return (
    <div className="inline-flex items-center gap-2.5">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-primary" />
      </span>
      <span className="font-label text-[10px] uppercase tracking-[0.28em] text-primary/80">
        Available for work
      </span>
    </div>
  )
}
