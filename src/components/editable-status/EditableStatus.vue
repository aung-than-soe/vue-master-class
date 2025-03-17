<script setup lang="ts">
const value = defineModel<'in-progress' | 'completed'>()
const emit = defineEmits(['commit'])

const { readonly = false } = defineProps<{ readonly?: boolean }>()

const toggle = () => {
  if (readonly) return
  value.value = value.value === 'completed' ? 'in-progress' : 'completed'
  emit('commit')
}
</script>
<template>
  <div class="text-2xl cursor-pointer" @click="toggle">
    <Transition mode="out-in">
      <i-lucide-circle-check class="text-green-500" v-if="value === 'completed'" />
      <i-lucide-circle-dot class="text-gray-500" v-else />
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: transform 150ms;
}

.v-enter-from,
.v-leave-to {
  transform: scale(0.3);
}
</style>
