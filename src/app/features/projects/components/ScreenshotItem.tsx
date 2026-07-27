import { useState } from "react"

interface ScreenshotItemProps {
  readonly src: string
  readonly alt?: string
  readonly isMobileApp?: boolean
}

export default function ScreenshotItem({ src, alt = "Screenshot", isMobileApp = false }: ScreenshotItemProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative bg-surface-container-low overflow-hidden rounded-xl border border-white/10 ${isMobileApp ? "aspect-9/16" : "aspect-video"}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_25%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.03)_75%)] bg-size-[200%_100%] animate-shimmer" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
