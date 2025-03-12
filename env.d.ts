/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

interface ImportMetaEnv {
  readonly APP_VERSION
  readonly SUPABASE: SupabaseMeta
}

interface SupabaseMeta {
  readonly KEY: string
  readonly URL: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare const __APP_VERSION__: string
