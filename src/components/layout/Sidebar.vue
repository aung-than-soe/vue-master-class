<script setup lang="ts">
import { menuKey, type MenuOptions } from '@/utils/keys/injectionKeys'
import { useWindowSize } from '@vueuse/core'

const links = [
  {
    title: 'Dashboard',
    to: '/',
    icon: 'lucide:house'
  },
  {
    title: 'Projects',
    to: '/projects',
    icon: 'lucide:building-2'
  },
  {
    title: 'My Tasks',
    to: '/tasks',
    icon: 'lucide:badge-check'
  }
]

const accountLinks = [
  {
    title: 'Profile',
    to: '/profile',
    icon: 'lucide:user'
  },
  {
    title: 'Sign Out',
    icon: 'lucide:log-out'
  }
]
const router = useRouter()
const handleLogout = async (title: string) => {
  if (title === 'Sign Out') {
    const { logout } = await import('@/utils/query')
    const isLoggedOut = await logout()
    if (isLoggedOut) router.push('/login')
  }
}
defineEmits(['taskClicked'])

const { collapsed, toggle } = inject(menuKey) as MenuOptions

const windowWidth = useWindowSize().width

watchEffect(() => {
  if (windowWidth.value > 1024) {
    collapsed.value = true
  } else {
    collapsed.value = false
  }
})
</script>

<template>
  <aside
    class="flex flex-col h-screen gap-2 border-r fixed bg-muted/40 transition-[width]"
    :class="{ 'w-52': collapsed, 'w-20': !collapsed }"
  >
    <div class="flex h-16 items-center border-b px-2 lg:px-4 shrink-0 gap-1 justify-between">
      <Button @click="toggle" variant="outline" size="icon" class="w-8 h-8">
        <i-lucide-menu />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" size="icon" class="w-8 h-8">
            <i-lucide-plus />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem @click="$emit('taskClicked')"> Task </DropdownMenuItem>
          <DropdownMenuItem>Project</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <nav class="flex flex-col gap-2 justify-between h-full relative">
      <div>
        <SidebarLinks :links="links" />
      </div>

      <div class="border-y text-center bg-background py-3">
        <SidebarLinks :links="accountLinks" @onClick="handleLogout" />
      </div>
    </nav>
  </aside>
</template>
