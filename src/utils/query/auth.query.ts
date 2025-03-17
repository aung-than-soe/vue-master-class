import Client from '@/lib/supabase'
import type { LoginForm, RegisterForm } from '@/types/auth.type'

export const register = async (form: RegisterForm) => {
  const { data, error } = await Client.auth.signUp({
    email: form.email,
    password: form.password
  })
  if (error) console.log(error)

  if (data.user) {
    const { error } = await Client.from('profiles').insert({
      id: data.user.id,
      username: form.username,
      full_name: form.firstName + ' ' + form.lastName
    })

    if (error) console.log('Error => ', error)
  }

  return true
}

export const login = async (formData: LoginForm) => {
  const { error } = await Client.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  })

  return { error }
}

export const logout = async () => {
  const { error } = await Client.auth.signOut()
  if (error) return console.log(error)
  return true
}
