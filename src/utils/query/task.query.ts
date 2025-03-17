import Client from '@/lib/supabase'
import type { CreateNewTask } from '@/types/common'
import type { QueryData } from '@supabase/supabase-js'

export const tasksWithProjectQuery = Client.from('tasks').select(`*, projects (id, name, slug)`)
export type TasksWithProjects = QueryData<typeof tasksWithProjectQuery>

export const taskQuery = (id: number) =>
  Client.from('tasks')
    .select(
      `*,
      projects (
       id,
       name,
       slug
       )`
    )
    .eq('id', id)
    .single()

export type Task = QueryData<ReturnType<typeof taskQuery>>

export const updateTaskQuery = (updatedTask = {}, id: number) => {
  return Client.from('tasks').update(updatedTask).eq('id', id)
}

export const createTaskQuery = (newTask: CreateNewTask) => {
  return Client.from('tasks').insert(newTask)
}

export const deleteTaskQuery = (id: number) => {
  return Client.from('tasks').delete().eq('id', id)
}
