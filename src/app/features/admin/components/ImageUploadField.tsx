import { useRef, useState } from "react"
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react"
import { useUploadImage, useUploadImages } from "../../../../hooks/use-upload"
import { useToast } from "../../../shared/components/Toast"

interface ImageUploadFieldProps {
  readonly label: string
  readonly value: string
  readonly onChange: (url: string) => void
  readonly projectFolder: string
  readonly round?: boolean
}

export function ImageUploadField({
  label,
  value,
  onChange,
  projectFolder,
  round = false,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const upload = useUploadImage()
  const toast = useToast()
  const [dragOver, setDragOver] = useState(false)

  const handleFile = (file: File | undefined) => {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast.error({ title: "Invalid file", description: "Please choose an image." })
      return
    }
    upload.mutate(
      { file, projectFolder: projectFolder || "uploads" },
      {
        onSuccess: (url) => {
          onChange(url)
          toast.success({ title: "Image uploaded" })
        },
        onError: (err) => {
          toast.error({
            title: "Upload failed",
            description: err instanceof Error ? err.message : "Unknown error",
          })
        },
      },
    )
  }

  return (
    <div className="space-y-2">
      <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
        {label}
      </span>
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          handleFile(e.dataTransfer.files?.[0])
        }}
        className={`relative overflow-hidden rounded-xl border border-dashed p-4 transition-colors ${
          dragOver
            ? "border-primary bg-primary/5"
            : "border-outline-variant/50 bg-surface-container-low/40"
        }`}
      >
        <div className="flex items-center gap-4">
          {value ? (
            <img
              src={value}
              alt=""
              className={`size-20 object-cover border border-white/10 ${
                round ? "rounded-full" : "rounded-lg"
              }`}
            />
          ) : (
            <div
              className={`flex size-20 items-center justify-center border border-white/10 bg-surface-container-high text-on-surface-variant ${
                round ? "rounded-full" : "rounded-lg"
              }`}
            >
              <ImagePlus className="size-6" />
            </div>
          )}
          <div className="min-w-0 flex-1 space-y-2">
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Image URL"
              className="w-full rounded-md border border-outline-variant/40 bg-transparent px-3 py-2 font-body text-sm text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:outline-none"
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={upload.isPending}
                onClick={() => inputRef.current?.click()}
                className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-outline-variant/30 bg-surface-container-high px-3 py-2 font-label text-xs uppercase tracking-widest text-primary disabled:opacity-50"
              >
                {upload.isPending ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Upload className="size-3.5" />
                )}
                {upload.isPending ? "Uploading…" : "Upload"}
              </button>
              {value ? (
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-outline-variant/30 px-3 py-2 font-label text-xs uppercase tracking-widest text-secondary"
                >
                  <Trash2 className="size-3.5" />
                  Clear
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            handleFile(e.target.files?.[0])
            e.target.value = ""
          }}
        />
      </div>
    </div>
  )
}

interface MultiImageUploadProps {
  readonly label: string
  readonly values: string[]
  readonly onChange: (urls: string[]) => void
  readonly projectFolder: string
}

export function MultiImageUploadField({
  label,
  values,
  onChange,
  projectFolder,
}: MultiImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const upload = useUploadImages()
  const toast = useToast()

  const handleFiles = (files: FileList | File[] | null) => {
    const list = files ? Array.from(files) : []
    if (!list.length) return
    upload.mutate(
      { files: list, projectFolder: projectFolder || "uploads" },
      {
        onSuccess: (urls) => {
          onChange([...values, ...urls])
          toast.success({
            title: "Screenshots uploaded",
            description: `${urls.length} image(s) added`,
          })
        },
        onError: (err) => {
          toast.error({
            title: "Upload failed",
            description: err instanceof Error ? err.message : "Unknown error",
          })
        },
      },
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
          {label}
        </span>
        <button
          type="button"
          disabled={upload.isPending}
          onClick={() => inputRef.current?.click()}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-outline-variant/30 bg-surface-container-high px-3 py-2 font-label text-xs uppercase tracking-widest text-primary disabled:opacity-50"
        >
          {upload.isPending ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Upload className="size-3.5" />
          )}
          {upload.isPending ? "Uploading…" : "Add images"}
        </button>
      </div>
      {values.length > 0 ? (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {values.map((url, index) => (
            <div key={`${url}-${index}`} className="group relative aspect-video overflow-hidden rounded-lg border border-white/10">
              <img src={url} alt="" className="size-full object-cover" />
              <button
                type="button"
                aria-label="Remove image"
                onClick={() => onChange(values.filter((_, i) => i !== index))}
                className="absolute top-1 right-1 inline-flex size-7 cursor-pointer items-center justify-center rounded-md bg-black/70 text-secondary opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-body text-sm text-on-surface-variant">No screenshots yet.</p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(e) => {
          handleFiles(e.target.files)
          e.target.value = ""
        }}
      />
    </div>
  )
}
