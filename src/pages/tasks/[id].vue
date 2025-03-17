<script lang="ts" setup>
import { useTasksStore } from '@/stores/loaders/tasks'

const { id } = useRoute('/tasks/[id]').params
const store = useTasksStore()
const { task } = storeToRefs(store)
const { getTask, updateTask, deleteTask } = store

watch(
  () => task.value?.name,
  () => {
    usePageStore().pageData.title = `Task: ${task.value?.name || ''}`
  }
)
await getTask(+id)

const { getProfilesByIds } = useCollaborators()

const collaborators = task.value?.collaborators
  ? await getProfilesByIds(task.value.collaborators)
  : []

const loading = ref(false)
const router = useRouter()
const onDelete = async () => {
  loading.value = true
  await deleteTask()
  loading.value = false
  router.push({ name: '/tasks/' })
}
</script>
<template>
  <div class="flex flex-col justify-center items-center">
    <Table v-if="task">
      <TableRow>
        <TableHead> Name </TableHead>
        <TableCell>
          <EditableInput v-model="task.name" @commit="updateTask" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Description </TableHead>
        <TableCell>
          <EditableTextArea @commit="updateTask" v-model="task.description" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Assignee </TableHead>
        <TableCell> Lorem ipsum</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Project </TableHead>
        <TableCell>{{ task.projects?.name }}</TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Status </TableHead>
        <TableCell>
          <EditableStatus v-model="task.status" @commit="updateTask" />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableHead> Collaborators </TableHead>
        <TableCell>
          <div class="flex">
            <Avatar
              class="-mr-4 border border-primary hover:scale-110 transition-transform"
              v-for="collaborator in collaborators"
              :key="collaborator.id"
            >
              <RouterLink
                class="w-full h-full flex items-center justify-center"
                :to="{ name: '/users/[username]', params: { username: collaborator.username } }"
              >
                <AvatarImage
                  :src="collaborator.avatar_url || ''"
                  :alt="collaborator.full_name + ' Avatar'"
                />
                <AvatarFallback />
              </RouterLink>
            </Avatar>
          </div>
        </TableCell>
      </TableRow>
      <TableRow class="hover:bg-transparent">
        <TableHead class="align-top pt-4"> Comments </TableHead>
        <TableCell>
          Comments cards goes in here..
          <div class="flex flex-col justify-between p-3 bg-muted my-2 rounded-md">
            <textarea
              placeholder="Add your comment.."
              class="w-full max-w-full overflow-y-auto prose-sm prose border rounded dark:prose-invert hover:border-muted bg-background border-muted p-3"
            >
            </textarea>
            <div class="flex justify-between mt-3">
              <Button> Comment </Button>
              <div class="flex gap-4">
                <button variant="ghost" @click.prevent>
                  <i-lucide-paperclip />
                  <span class="sr-only">Attach file</span>
                </button>
                <button variant="ghost" @click.prevent>
                  <i-lucide-image-up />
                  <span class="sr-only">Upload image</span>
                </button>
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </Table>

    <Button
      @click="onDelete"
      class="self-end mt-3 w-full lg:max-w-40 md:max-w-100"
      variant="destructive"
    >
      <Transition name="scale">
        <i-lucide-loader-circle class="mr-1 animate-spin" v-if="loading" />
        <i-lucide-trash-2 class="mr-1" v-else />
      </Transition>
      Delete
    </Button>
  </div>
</template>

<style scoped>
th {
  @apply w-[100px];
}

h2 {
  @apply mb-4 text-lg font-semibold w-fit;
}

.table-container {
  @apply overflow-hidden overflow-y-auto rounded-md bg-slate-900 h-80;
}
</style>
