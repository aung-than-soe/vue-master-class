import Client from '@/lib/supabase'
import { profileQuery } from '@/utils/query'
import type { Session, User } from '@supabase/supabase-js'
import type { Tables } from 'database/types'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<null | User>(null)
  const profile = ref<null | Tables<'profiles'>>(null)
  const isTrackingAuth = ref(false)
  const setProfile = async () => {
    if (!user.value) {
      profile.value = null
    }

    if (!profile.value || profile.value?.id !== user.value?.id) {
      const { data } = await profileQuery({ column: 'id', value: user.value!.id })
      profile.value = data || null
    }
  }

  const setAuth = async (userSession: null | Session = null) => {
    if (!userSession) {
      user.value = null
      profile.value = null
      return
    }
    user.value = userSession.user
    await setProfile()
  }

  const getSession = async () => {
    const { data } = await Client.auth.getSession()
    if (data.session?.user) await setAuth(data.session)
  }

  const trackAuthChanges = () => {
    if (isTrackingAuth.value) return
    isTrackingAuth.value = true
    Client.auth.onAuthStateChange((event, session) => {
      setTimeout(() => {
        setAuth(session)
      }, 0)
    })
  }
  return {
    user,
    profile,
    setAuth,
    getSession,
    trackAuthChanges
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
