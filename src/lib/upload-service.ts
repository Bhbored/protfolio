const uploadUrl = import.meta.env.VITE_UPLOAD_FUNCTION_URL
const baseFolder = import.meta.env.VITE_R2_BASE_FOLDER

export function buildFolderPath(projectFolder: string): string {
  const clean = projectFolder.trim().replace(/^\/+|\/+$/g, "")
  return clean ? `${baseFolder}/${clean}` : baseFolder
}

export async function uploadImage(file: File, projectFolder: string): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("folder", buildFolderPath(projectFolder))

  try {
    const response = await fetch(uploadUrl, { method: "POST", body: formData })

    if (!response.ok) {
      const body = await response.text().catch(() => "")
      throw new Error(body || `Upload failed with status ${response.status}`)
    }

    const data = (await response.json()) as { imageUrl: string }
    return data.imageUrl
  } catch (error) {
    throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function uploadImages(files: File[], projectFolder: string): Promise<string[]> {
  try {
    return await Promise.all(files.map((file) => uploadImage(file, projectFolder)))
  } catch (error) {
    throw new Error(`Failed to upload images: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
