import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationControlsProps {
  readonly currentPage: number
  readonly pageSize: number
  readonly totalItems: number
  readonly onPageChange: (page: number) => void
}

export default function PaginationControls({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}: PaginationControlsProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  if (totalPages <= 1) return null

  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)

  return (
    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant tabular-nums">
        Showing {start}–{end} of {totalItems}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 bg-surface-container-high border border-outline-variant/30 text-primary font-label text-xs tracking-widest uppercase disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={`size-10 cursor-pointer font-label text-xs tabular-nums border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              page === currentPage
                ? "border-primary bg-primary/10 text-primary"
                : "border-outline-variant/30 bg-surface-container-high text-on-surface-variant hover:text-primary"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 bg-surface-container-high border border-outline-variant/30 text-primary font-label text-xs tracking-widest uppercase disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="Next page"
        >
          Next
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}
