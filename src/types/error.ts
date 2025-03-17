import type { PostgrestError } from '@supabase/supabase-js'

export interface AppError extends Error {
  errorCode?: number
}

export interface ExtendedPostgrestError extends PostgrestError {
  statusCode?: number
}
