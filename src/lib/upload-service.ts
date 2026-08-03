import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const baseFolder = import.meta.env.VITE_R2_BASE_FOLDER

const s3Client = new S3Client({
  region: "auto",
  endpoint: import.meta.env.VITE_R2_SERVICE_URL,
  forcePathStyle: true,
  credentials: {
    accessKeyId: import.meta.env.VITE_R2_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_R2_SECRET_KEY,
  },
})

export function buildObjectKey(projectFolder: string, fileName: string): string {
  const clean = projectFolder.trim().replace(/^\/+|\/+$/g, "")
  const safeName = fileName.trim().replace(/\s+/g, "-")
  const objectKey = clean ? `${baseFolder}/${clean}/${safeName}` : `${baseFolder}/${safeName}`
  return objectKey
}

export async function uploadImage(file: File, projectFolder: string): Promise<string> {
  try {
    const key = buildObjectKey(projectFolder, file.name)
    const command = new PutObjectCommand({
      Bucket: import.meta.env.VITE_R2_BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: file.type,
    })
    await s3Client.send(command)
    return `${import.meta.env.VITE_R2_PUBLIC_URL_BASE}/${key}`
  } catch (error) {
    throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

export async function uploadImages(files: File[], projectFolder: string): Promise<string[]> {
  try {
    const urls = await Promise.all(files.map((file) => uploadImage(file, projectFolder)))
    return urls
  } catch (error) {
    throw new Error(`Failed to upload images: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
