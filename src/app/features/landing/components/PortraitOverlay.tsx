export default function PortraitOverlay() {
  return (
    <div className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none bg-linear-to-b from-transparent from-60% to-background/40 opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
  )
}
