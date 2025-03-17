<script setup lang="ts">
import { menuKey } from '@/utils/keys/injectionKeys'

const { pageData } = storeToRefs(usePageStore())

const show = ref(false)
const collapsed = ref(false)
const toggleMenu = () => (collapsed.value = !collapsed.value)

provide(menuKey, {
  collapsed,
  toggle: toggleMenu
})
</script>

<template>
  <div>
    <Sidebar @task-clicked="show = true" />
    <NewTask v-model="show" />
    <div
      class="flex flex-col transition-[margin]"
      :class="{ 'ml-52': collapsed, 'ml-20': !collapsed }"
    >
      <TopNavbar />
      <main class="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
        <div class="flex items-center">
          <h1 class="text-lg font-semibold md:text-2xl">{{ pageData.title }}</h1>
        </div>
        <slot />
      </main>
    </div>
  </div>
</template>
