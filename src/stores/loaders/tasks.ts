import {
  deleteTaskQuery,
  taskQuery,
  tasksWithProjectQuery,
  updateTaskQuery,
  type Task,
  type TasksWithProjects
} from '@/utils/query'
import { useMemoize } from '@vueuse/core'

export const useTasksStore = defineStore('tasks-store', () => {
  const tasks = ref<TasksWithProjects | null>(null)
  const task = ref<Task | null>()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadTasks = useMemoize(async (_key: string) => await tasksWithProjectQuery)
  const loadTask = useMemoize(async (id: string) => await taskQuery(+id))

  interface ValidateCacheParam {
    ref: typeof tasks | typeof task
    query: typeof tasksWithProjectQuery | typeof taskQuery
    key: string
    loaderFn: typeof loadTasks | typeof loadTask
  }

  const validateCache = ({ ref, query, key, loaderFn }: ValidateCacheParam) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(+key) : query
      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        } else {
          loaderFn.delete('' + key)
          if (!error && data) ref.value = data
        }
      })
    }
  }
  const getTasks = async () => {
    tasks.value = null
    const key = 'tasks'
    const { data, error, status } = await loadTasks(key)
    if (error) useErrorStore().setError({ error, errorCode: status })
    if (data) tasks.value = data
    validateCache({ ref: tasks, query: tasksWithProjectQuery, key, loaderFn: loadTasks })
  }

  const getTask = async (id: number) => {
    task.value = null
    const { data, error, status } = await loadTask('' + id)
    if (error) useErrorStore().setError({ error, errorCode: status })
    if (data) task.value = data
    validateCache({ ref: task, query: taskQuery, key: '' + id, loaderFn: loadTask })
  }

  const updateTask = async () => {
    if (!task.value) return
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { projects, id, ...taskProps } = task.value
    await updateTaskQuery(taskProps, id)
  }

  const deleteTask = async () => {
    if (!task.value) return
    await deleteTaskQuery(task.value.id)
  }

  return {
    tasks,
    task,
    getTasks,
    getTask,
    updateTask,
    deleteTask
  }
})
