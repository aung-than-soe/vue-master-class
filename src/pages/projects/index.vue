<script setup lang="ts">
import { useCollaborators } from '@/composables/collaborator'
import { useProjectsStore } from '@/stores/loaders/projects'
import { columns } from '@/utils/table/project.column'

usePageStore().pageData.title = 'Projects'

const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

await getProjects()

const { getGroupedCollaborators, groupedCollaborators } = useCollaborators()

getGroupedCollaborators(projects.value ?? [])

const columnsWithCollaborators = columns(groupedCollaborators)
useMeta({
  title: 'Pulse - Projects',
  description: {
    name: 'description',
    content: 'Pulse is a ....'
  }
})
</script>

<template>
  <DataTable v-if="projects" :columns="columnsWithCollaborators" :data="projects" />
</template>
