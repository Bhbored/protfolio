import { supabase } from "../app/shared/api/supabase"

const uploadUrl = import.meta.env.VITE_UPLOAD_FUNCTION_URL
const baseFolder = import.meta.env.VITE_R2_BASE_FOLDER ?? "portfolio"

export function buildFolderPath(projectFolder: string): string {
  const clean = projectFolder
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
  const base = (baseFolder ?? "portfolio").replace(/^\/+|\/+$/g, "")
  return clean ? `${base}/${clean}` : base
}

function uniqueFileName(file: File): string {
  const ext = file.name.includes(".")
    ? file.name.slice(file.name.lastIndexOf("."))
    : ""
  const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  return `${stamp}${ext}`
}

async function authHeaders(): Promise<HeadersInit> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  }

  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (anonKey) {
    headers.Authorization = `Bearer ${anonKey}`
    headers.apikey = anonKey
  }

  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return headers
}

export async function uploadImage(
  file: File,
  projectFolder: string,
): Promise<string> {
  if (!uploadUrl) {
    throw new Error("VITE_UPLOAD_FUNCTION_URL is not configured")
  }

  const formData = new FormData()
  const named = new File([file], uniqueFileName(file), { type: file.type })
  formData.append("file", named)
  formData.append("folder", buildFolderPath(projectFolder))

  const response = await fetch(uploadUrl, {
    method: "POST",
    headers: await authHeaders(),
    body: formData,
  })

  if (!response.ok) {
    const body = await response.text().catch(() => "")
    throw new Error(
      body || `Upload failed with status ${response.status}`,
    )
  }

  const data = (await response.json()) as {
    imageUrl?: string
    url?: string
    publicUrl?: string
  }
  const url = data.imageUrl ?? data.url ?? data.publicUrl
  if (!url) {
    throw new Error("Upload succeeded but no image URL was returned")
  }
  return url
}

export async function uploadImages(
  files: File[],
  projectFolder: string,
): Promise<string[]> {
  return Promise.all(files.map((file) => uploadImage(file, projectFolder)))
}
