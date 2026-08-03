/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_R2_BASE_FOLDER: string
  readonly VITE_R2_PUBLIC_URL_BASE: string
  readonly VITE_UPLOAD_FUNCTION_URL: string
  readonly VITE_ADMIN_PASSWORD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
