<script setup lang="ts">
import { menuKey, type MenuOptions } from '@/utils/keys/injectionKeys'

interface LinkProp {
  title: string
  to?: string
  icon: string
}

defineProps<{
  links: LinkProp[]
}>()

const emits = defineEmits<{
  onClick: [string]
}>()
const onLogout = (title: string) => {
  emits('onClick', title)
}

const { collapsed } = inject(menuKey) as MenuOptions
</script>

<template>
  <template v-for="link in links" :key="link.title">
    <RouterLink
      v-if="link.to"
      exactActiveClass="text-primary bg-muted"
      :key="link.title"
      :to="link.to"
      class="nav-link"
      :class="{ 'justify-normal': collapsed, 'justify-center': !collapsed }"
    >
      <iconify-icon :icon="link.icon"></iconify-icon>
      <span class="text-nowrap" :class="{ block: collapsed, hidden: !collapsed }">{{
        link.title
      }}</span>
    </RouterLink>

    <div
      v-else
      class="nav-link cursor-pointer"
      @click="onLogout(link.title)"
      :class="{ 'justify-normal': collapsed, 'justify-center': !collapsed }"
    >
      <iconify-icon :icon="link.icon" />
      <span class="text-nowrap" :class="{ block: collapsed, hidden: !collapsed }">
        {{ link.title }}
      </span>
    </div>
  </template>
</template>

<style scoped>
.nav-link {
  @apply flex items-center gap-3 px-4 py-2 mx-2 transition-colors rounded-lg hover:text-primary text-muted-foreground;
}
</style>
