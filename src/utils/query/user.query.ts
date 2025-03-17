import Client from '@/lib/supabase'
import type { QueryData } from '@supabase/supabase-js'

export const profileQuery = ({ column, value }: { column: string; value: string }) => {
  return Client.from('profiles').select().eq(column, value).single()
}

export const groupedProfilesQuery = (userIds: string[]) =>
  Client.from('profiles').select('username, avatar_url, id, full_name').in('id', userIds)

export type Collaborators = QueryData<ReturnType<typeof groupedProfilesQuery>>

export const profilesQuery = Client.from('profiles').select(`id, full_name`)
