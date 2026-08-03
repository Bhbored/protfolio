import PortraitImage from "./PortraitImage"
import PortraitOverlay from "./PortraitOverlay"

export default function PortraitSection() {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-2 pt-4 sm:px-4 sm:pt-8 md:px-0 md:pt-0">
      <div className="group relative mx-auto h-full w-full max-w-xs overflow-hidden rounded-2xl border-2 border-white/10 shadow-[0_0_30px_rgba(0,240,255,0.1)] transition-all duration-700 hover:border-primary-container/30 hover:shadow-[0_0_40px_rgba(0,240,255,0.3)] sm:max-w-sm md:max-w-none md:rounded-3xl">
        <PortraitImage />
        <PortraitOverlay />
      </div>
    </div>
  )
}
