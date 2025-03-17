<script setup lang="ts">
import type { CreateNewTask } from '@/types/common'
import { createTaskQuery, profilesQuery, projectsQuery } from '@/utils/query'
type Option = {
  label: string
  value: string | number
}

const visible = defineModel<boolean>()
const projectsOptions = ref([] as Option[])
const profilesOptions = ref([] as Option[])

const getProjectsOptions = async () => {
  const { data: allProjects } = await projectsQuery
  if (!allProjects) return
  allProjects.forEach((project) => {
    projectsOptions.value.push({
      label: project.name,
      value: project.id
    })
  })
}

const getProfilesOptions = async () => {
  const { data: allProfiles } = await profilesQuery
  if (!allProfiles) return
  console.log('Data => ', allProfiles)
  allProfiles.forEach((profile) => {
    profilesOptions.value.push({
      label: profile.full_name,
      value: profile.id
    })
  })
}

const getOptions = async () => {
  await Promise.all([getProjectsOptions(), getProfilesOptions()])
}
getOptions()
const { profile } = storeToRefs(useAuthStore())
const createTask = async (formData: CreateNewTask) => {
  const task = {
    ...formData,
    collaborators: [profile.value!.id]
  }

  const { error } = await createTaskQuery(task)

  if (error) {
    console.log(error)
  }

  visible.value = false
}
</script>
<template>
  <Sheet v-model:open="visible">
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create new task</SheetTitle>
      </SheetHeader>

      <FormKit
        type="form"
        @submit="createTask"
        submit-label="Create Task"
        :config="{
          validationVisibility: 'submit'
        }"
      >
        <FormKit
          type="text"
          name="name"
          id="name"
          label="Name"
          placeholder="My new task"
          validation="required|length:1,255"
        />
        <FormKit
          type="select"
          name="profile_id"
          id="profile_id"
          label="User"
          placeholder="Select a user"
          :options="profilesOptions"
          validation="required"
        />
        <FormKit
          type="select"
          name="project_id"
          id="project_id"
          label="Project"
          placeholder="Select a project"
          :options="projectsOptions"
          validation="required"
        />
        <FormKit
          type="textarea"
          name="description"
          id="description"
          label="Description"
          placeholder="Task description"
          aria-describedby="description"
          validation="length:0,500"
        />
      </FormKit>
    </SheetContent>
  </Sheet>
</template>

<style scoped></style>
