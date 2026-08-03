const publicBase = (
  import.meta.env.VITE_R2_PUBLIC_URL_BASE ?? ""
).replace(/\/+$/, "")

export function resolveMediaUrl(url: string | null | undefined): string {
  if (!url) return ""
  const trimmed = url.trim()
  if (!trimmed) return ""
  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith("data:")) {
    return trimmed
  }
  if (!publicBase) return trimmed
  const path = trimmed.replace(/^\/+/, "")
  return `${publicBase}/${path}`
}

export function projectSlug(title: string): string {
  return title.toLowerCase().trim().replace(/\s+/g, "-")
}
