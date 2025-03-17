import type { GroupedCollaborators } from '@/types/collaborator.type'
import { groupedProfilesQuery, type Projects, type TasksWithProjects } from '@/utils/query'

export const useCollaborators = () => {
  const groupedCollaborators = ref<GroupedCollaborators>({})
  const getProfilesByIds = async (userIds: string[]) => {
    const { data, error } = await groupedProfilesQuery(userIds)

    if (error || !data) return []
    return data
  }

  const getGroupedCollaborators = async (items: Projects | TasksWithProjects) => {
    const filtered = items.filter((item) => item.collaborators.length)
    const promises = filtered.map((item) => getProfilesByIds(item.collaborators))

    const results = await Promise.all(promises)
    filtered.forEach((item, idx) => {
      groupedCollaborators.value[item.id] = results[idx]
    })
  }

  return {
    getProfilesByIds,
    getGroupedCollaborators,
    groupedCollaborators
  }
}
