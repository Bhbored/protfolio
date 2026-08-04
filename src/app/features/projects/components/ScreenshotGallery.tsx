import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react"
import ScreenshotItem from "./ScreenshotItem"
import MediaImage from "../../../shared/components/MediaImage"
import PhoneDeviceFrame from "../../../shared/components/PhoneDeviceFrame"

interface ScreenshotGalleryProps {
  readonly screenshots: readonly string[]
  readonly isMobileApp?: boolean
}

export default function ScreenshotGallery({
  screenshots,
  isMobileApp = false,
}: ScreenshotGalleryProps) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: number) => {
    if (!galleryRef.current) return
    const amount = isMobileApp ? 200 : 320
    galleryRef.current.scrollBy({ left: dir * amount, behavior: "smooth" })
  }

  const itemClass = isMobileApp
    ? "group relative w-[132px] min-w-[132px] shrink-0 cursor-pointer transition-all duration-300 sm:w-[152px] sm:min-w-[152px] md:w-[168px] md:min-w-[168px] md:hover:scale-[1.03]"
    : "group relative w-[calc(50%-0.5rem)] min-w-[calc(50%-0.5rem)] shrink-0 cursor-pointer transition-all duration-300 md:w-[calc(33.333%-1rem)] md:min-w-[calc(33.333%-1rem)] md:hover:scale-[1.02]"

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scroll(-1)}
        className="absolute -left-6 top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-surface-container-high/90 text-white backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/20 md:flex"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        className="absolute -right-6 top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-surface-container-high/90 text-white backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/20 md:flex"
      >
        <ChevronRight className="size-5" />
      </button>

      <button
        type="button"
        onClick={() => scroll(-1)}
        className="absolute left-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-surface-container-high/90 text-white backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/20 md:hidden"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        className="absolute right-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-surface-container-high/90 text-white backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/20 md:hidden"
      >
        <ChevronRight className="size-5" />
      </button>

      <div
        ref={galleryRef}
        className={`flex overflow-x-auto scroll-smooth scrollbar-none py-3 ${
          isMobileApp ? "gap-4 sm:gap-5" : "gap-6"
        }`}
      >
        {screenshots.map((src, i) => (
          <div
            key={i}
            className={itemClass}
            onClick={() => setPreviewIndex(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setPreviewIndex(i)
              }
            }}
            role="button"
            tabIndex={0}
          >
            <ScreenshotItem
              src={src}
              alt={`Screenshot ${i + 1}`}
              isMobileApp={isMobileApp}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[1.35rem] bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex size-12 items-center justify-center rounded-full border border-primary/50 bg-primary/20 backdrop-blur-sm sm:size-14">
                <Search className="size-5 text-primary sm:size-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {previewIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-md md:p-6"
          onClick={() => setPreviewIndex(null)}
        >
          <div
            className={`relative flex w-full flex-col items-center justify-center ${
              isMobileApp ? "max-w-[min(100%,420px)]" : "max-w-7xl"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewIndex(null)}
              className="absolute -top-1 -right-1 z-50 flex size-10 items-center justify-center rounded-full border border-white/20 bg-surface-container-high text-white transition-all duration-300 hover:border-primary/50 hover:bg-primary/20 md:-top-2 md:-right-2 md:size-11"
            >
              <X className="size-5 md:size-6" />
            </button>

            {isMobileApp ? (
              <PhoneDeviceFrame
                size="lg"
                className="mx-auto w-[min(100%,calc((85vh-1rem)*9/19.5))] max-w-[400px]"
              >
                <MediaImage
                  src={screenshots[previewIndex]}
                  alt="Preview"
                  frame="phone"
                  resolveUrl={false}
                  loading="eager"
                  className="w-full bg-black"
                />
              </PhoneDeviceFrame>
            ) : (
              <MediaImage
                src={screenshots[previewIndex]}
                alt="Preview"
                frame="desktop"
                resolveUrl={false}
                objectFit="contain"
                loading="eager"
                className="mx-auto max-h-[85vh] w-full rounded-lg bg-black/20"
              />
            )}

            {screenshots.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setPreviewIndex(
                      (previewIndex - 1 + screenshots.length) %
                        screenshots.length,
                    )
                  }
                  className={`absolute top-1/2 z-50 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-surface-container-high/80 text-white backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/20 md:size-12 ${
                    isMobileApp
                      ? "-left-2 sm:-left-14 md:-left-16"
                      : "-left-4 md:-left-6"
                  }`}
                >
                  <ChevronLeft className="size-5 md:size-6" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPreviewIndex((previewIndex + 1) % screenshots.length)
                  }
                  className={`absolute top-1/2 z-50 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-surface-container-high/80 text-white backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/20 md:size-12 ${
                    isMobileApp
                      ? "-right-2 sm:-right-14 md:-right-16"
                      : "-right-4 md:-right-6"
                  }`}
                >
                  <ChevronRight className="size-5 md:size-6" />
                </button>
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/20 bg-surface-container-high/80 px-4 py-2 font-label text-sm text-white backdrop-blur-sm">
                  {previewIndex + 1} / {screenshots.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
