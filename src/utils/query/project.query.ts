import Client from '@/lib/supabase'
import type { QueryData } from '@supabase/supabase-js'

export const projectsQuery = Client.from('projects').select()
export type Projects = QueryData<typeof projectsQuery>

export const projectQuery = (slug: string) =>
  Client.from('projects')
    .select(
      `*,
      tasks(
        id,
        name,
        status,
        due_date
      )`
    )
    .eq('slug', slug)
    .single()

export type Project = QueryData<ReturnType<typeof projectQuery>>

export const updateProjectQuery = (updatedProject = {}, id: number) => {
  return Client.from('projects').update(updatedProject).eq('id', id)
}
