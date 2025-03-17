import type { LoginForm } from '@/types/auth.type'
import type { AuthError } from '@supabase/supabase-js'

type FormErrors<T> = {
  [K in keyof T]: string[]
}
export const useFormErrors = () => {
  const _error = ref('')
  const realTimeErrors = ref<FormErrors<LoginForm>>()

  const handleError = (error: AuthError) => {
    if (error)
      _error.value =
        error?.message == 'Invalid login credentials'
          ? 'Incorrect email or password'
          : error?.message
  }

  const handleLoginForm = async (formData: LoginForm) => {
    realTimeErrors.value = {
      email: [],
      password: []
    }

    const { validateEmail, validatePassword } = await import('@/utils/validation/form.validator')

    const emailErrors = validateEmail(formData.email)

    if (emailErrors?.length) realTimeErrors.value.email = emailErrors
    const passwordErrors = validatePassword(formData.password)
    if (passwordErrors?.length) realTimeErrors.value.password = passwordErrors
  }
  return {
    error: _error,
    realTimeErrors,
    handleError,
    handleLoginForm
  }
}
