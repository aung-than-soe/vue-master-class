export const validateEmail = (email: string) => {
  const trimmedEmail = email.trim()
  if (!trimmedEmail) return []

  const errors = []

  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  const isValidEmail = pattern.test(trimmedEmail)

  if (!isValidEmail) errors.push('Invalid email address')
  return errors
}

export const validatePassword = (password: string) => {
  if (!password) return []

  const errors = []

  if (password.length <= 6) errors.push('Password must be more than 6 characters')

  return errors
}
