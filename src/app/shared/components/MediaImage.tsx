import { useEffect, useRef, useState } from "react"
import type { ImgHTMLAttributes, ReactNode } from "react"
import { ImageOff } from "lucide-react"
import { resolveMediaUrl } from "../../../lib/media-url"

export type MediaImageFrame = "phone" | "desktop" | "square" | "none"

type LoadState = "loading" | "loaded" | "error"

interface MediaImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "onLoad" | "onError"> {
  readonly src: string | null | undefined
  readonly alt: string
  readonly frame?: MediaImageFrame
  readonly className?: string
  readonly imageClassName?: string
  readonly resolveUrl?: boolean
  readonly fallback?: ReactNode
  readonly objectFit?: "cover" | "contain"
}

const frameClass: Record<MediaImageFrame, string> = {
  phone: "aspect-[9/19.5]",
  desktop: "aspect-video",
  square: "aspect-square",
  none: "size-full",
}

function Skeleton() {
  return (
    <div
      className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_25%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.03)_75%)] bg-size-[200%_100%] animate-shimmer"
      aria-hidden
    />
  )
}

function DefaultFallback() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-surface-container-low text-on-surface-variant"
      role="img"
      aria-label="Image unavailable"
    >
      <ImageOff className="size-[35%] max-h-8 max-w-8 min-h-3.5 min-w-3.5 opacity-45" aria-hidden />
    </div>
  )
}

export default function MediaImage({
  src,
  alt,
  frame = "none",
  className = "",
  imageClassName = "",
  resolveUrl = true,
  fallback,
  objectFit = "cover",
  loading = "lazy",
  ...imgProps
}: MediaImageProps) {
  const resolved = resolveUrl ? resolveMediaUrl(src) : (src?.trim() ?? "")
  const [state, setState] = useState<LoadState>(resolved ? "loading" : "error")
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setState(resolved ? "loading" : "error")
  }, [resolved])

  useEffect(() => {
    const img = imgRef.current
    if (img?.complete && img.naturalWidth > 0) {
      setState("loaded")
    }
  }, [resolved])

  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover"

  return (
    <div
      className={`relative overflow-hidden bg-surface-container-low ${frameClass[frame]} ${className}`}
    >
      {state === "loading" && <Skeleton />}

      {state === "error" && (fallback ?? <DefaultFallback />)}

      {resolved && state !== "error" && (
        <img
          {...imgProps}
          ref={imgRef}
          src={resolved}
          alt={alt}
          loading={loading}
          decoding="async"
          className={`size-full ${fitClass} transition-opacity duration-500 ${
            state === "loaded" ? "opacity-100" : "opacity-0"
          } ${imageClassName}`}
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
        />
      )}
    </div>
  )
}
