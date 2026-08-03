import { useMutation } from "@tanstack/react-query"
import { uploadImage, uploadImages } from "../lib/upload-service"

interface UploadImageInput {
  file: File
  projectFolder: string
}

interface UploadImagesInput {
  files: File[]
  projectFolder: string
}

export function useUploadImage() {
  return useMutation({
    mutationFn: ({ file, projectFolder }: UploadImageInput) => uploadImage(file, projectFolder),
  })
}

export function useUploadImages() {
  return useMutation({
    mutationFn: ({ files, projectFolder }: UploadImagesInput) => uploadImages(files, projectFolder),
  })
}
