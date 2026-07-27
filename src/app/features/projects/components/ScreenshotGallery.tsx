import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react"
import ScreenshotItem from "./ScreenshotItem"

interface ScreenshotGalleryProps {
  readonly screenshots: readonly string[]
  readonly isMobileApp?: boolean
}

export default function ScreenshotGallery({ screenshots, isMobileApp = false }: ScreenshotGalleryProps) {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: number) => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({ left: dir * 320, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      {/* Nav arrows */}
      <button
        type="button"
        onClick={() => scroll(-1)}
        className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface-container-high/90 backdrop-blur-sm border border-white/20 hidden md:flex items-center justify-center text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface-container-high/90 backdrop-blur-sm border border-white/20 hidden md:flex items-center justify-center text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Mobile nav */}
      <button
        type="button"
        onClick={() => scroll(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface-container-high/90 backdrop-blur-sm border border-white/20 md:hidden flex items-center justify-center text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface-container-high/90 backdrop-blur-sm border border-white/20 md:hidden flex items-center justify-center text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Gallery scroll container */}
      <div
        ref={galleryRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none py-2"
      >
        {screenshots.map((src, i) => (
          <div
            key={i}
            className="shrink-0 w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] min-w-[calc(50%-0.5rem)] md:min-w-[calc(33.333%-1rem)] relative cursor-pointer transition-all duration-300 md:hover:scale-[1.02]"
            onClick={() => setPreviewIndex(i)}
          >
            <ScreenshotItem src={src} alt={`Screenshot ${i + 1}`} isMobileApp={isMobileApp} />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/50 flex items-center justify-center">
                <Search className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 md:p-4"
          onClick={() => setPreviewIndex(null)}
        >
          <div
            className={`relative ${isMobileApp ? "max-w-xs md:max-w-sm" : "max-w-7xl"} w-full flex flex-col items-center justify-center`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setPreviewIndex(null)}
              className="absolute -top-2 -right-2 md:-top-3 md:-right-3 z-50 w-10 h-10 md:w-11 md:h-11 rounded-full bg-surface-container-high border border-white/20 flex items-center justify-center text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Image */}
            <img
              src={screenshots[previewIndex]}
              alt="Preview"
              className={isMobileApp ? "max-h-[65vh] md:max-h-[75vh] w-auto object-contain rounded-lg" : "w-full h-auto max-h-[85vh] object-contain rounded-lg"}
            />

            {/* Nav */}
            {screenshots.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setPreviewIndex((previewIndex - 1 + screenshots.length) % screenshots.length)}
                  className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-container-high/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewIndex((previewIndex + 1) % screenshots.length)}
                  className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-container-high/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-4 py-2 bg-surface-container-high/80 backdrop-blur-sm rounded-full border border-white/20 text-white font-label text-sm whitespace-nowrap">
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
