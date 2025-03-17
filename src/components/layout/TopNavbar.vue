<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const { profile } = storeToRefs(useAuthStore())
const isDark = useDark()
const toggleDarkMode = useToggle(isDark)
</script>

<template>
  <nav class="h-16 border-b bg-muted/40 flex gap-2 justify-between px-6 items-center">
    <form class="relative h-fit w-full max-w-96">
      <i-lucide-search
        class="absolute top-[50%] translate-y-[-50%] left-2.5 text-muted-foreground"
      />
      <Input class="w-full pl-8 bg-background" type="text" placeholder="Search ..." />
    </form>
    <div class="flex justify-center items-center gap-4">
      <Button @click="toggleDarkMode()" class="w-8 h-8">
        <Transition name="scale" mode="out-in">
          <i-lucide-sun v-if="isDark" />
          <i-lucide-moon v-else />
        </Transition>
      </Button>
      <div class="w-8">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                :src="profile?.avatar_url || ''"
                :alt="`${profile?.full_name} profile picture`"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <RouterLink
                :to="{
                  name: '/users/[username]',
                  params: { username: profile?.username || '' }
                }"
                class="w-full h-full"
              >
                Profile
              </RouterLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </nav>
</template>
