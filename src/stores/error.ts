import type { AppError, ExtendedPostgrestError } from '@/types/error'

export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref<null | AppError | ExtendedPostgrestError>(null)
  const isCustomError = ref(false)
  const setError = ({
    error,
    errorCode
  }: {
    error: string | AppError | ExtendedPostgrestError
    errorCode?: number
  }) => {
    if (typeof error === 'string') isCustomError.value = true
    if (typeof error === 'string' || error instanceof Error) {
      activeError.value = typeof error === 'string' ? Error(error) : error
      activeError.value.errorCode = errorCode || 500
      return
    }

    activeError.value = error
    ;(activeError.value as ExtendedPostgrestError).statusCode = errorCode || 500
  }

  const clearError = () => {
    activeError.value = null
    isCustomError.value = false
  }

  return {
    activeError,
    setError,
    isCustomError,
    clearError
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot))
}
