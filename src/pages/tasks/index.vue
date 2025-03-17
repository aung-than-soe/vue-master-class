<script setup lang="ts">
import { useTasksStore } from '@/stores/loaders/tasks'
import { columns } from '@/utils/table/task.column'

usePageStore().pageData.title = 'My Task'

const store = useTasksStore()
const { tasks } = storeToRefs(store)
const { getTasks } = store

await getTasks()

const { getGroupedCollaborators, groupedCollaborators } = useCollaborators()

getGroupedCollaborators(tasks.value ?? [])

const columnsWithCollaborators = columns(groupedCollaborators)
</script>

<template>
  <DataTable v-if="tasks" :columns="columnsWithCollaborators" :data="tasks" />
</template>

<style scoped></style>
