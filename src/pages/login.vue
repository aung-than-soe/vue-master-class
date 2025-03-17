<script setup lang="ts">
import type { LoginForm } from '@/types/auth.type'
import { login } from '@/utils/query'
import { watchDebounced } from '@vueuse/core'

const formData = ref<LoginForm>({
  email: '',
  password: ''
})

const { error: _error, handleError, realTimeErrors, handleLoginForm } = useFormErrors()
const router = useRouter()

watchDebounced(
  formData,
  () => {
    handleLoginForm(formData.value)
  },
  { debounce: 500, deep: true }
)

const signin = async () => {
  const { error } = await login(formData.value)
  if (!error) router.push('/')
  else handleError(error)
}
</script>

<template>
  <div class="mx-auto flex w-full justify-center items-center p-10 text-center -mt-20 min-h-[90vh]">
    <Card class="max-w-sm w-full mx-auto">
      <CardHeader>
        <CardTitle class="text-2xl"> Login </CardTitle>
        <CardDescription> Login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-4 mb-4 justify-center items-center">
          <Button variant="outline" class="w-full"> Register with Google </Button>
          <Separator label="Or" />
        </div>

        <form class="grid gap-4" @submit.prevent="signin">
          <div class="grid gap-2">
            <Label id="email" class="text-left">Email</Label>
            <Input
              type="email"
              placeholder="johndoe19@example.com"
              required
              v-model="formData.email"
              :class="{ 'border-red-500': _error }"
            />
            <ul class="text-sm text-left text-red-500" v-if="realTimeErrors?.email">
              <li v-for="err in realTimeErrors.email" :key="err" class="list-none">{{ err }}</li>
            </ul>
          </div>
          <div class="grid gap-2">
            <div class="flex items-center">
              <Label id="password">Password</Label>
              <a href="#" class="inline-block ml-auto text-xs underline"> Forgot your password? </a>
            </div>
            <Input
              id="password"
              type="password"
              autocomplete
              required
              v-model="formData.password"
              :class="{ 'border-red-500': _error }"
            />
            <ul class="text-sm text-left text-red-500" v-if="realTimeErrors?.password">
              <li v-for="err in realTimeErrors.password" :key="err" class="list-none">{{ err }}</li>
            </ul>
          </div>
          <u class="text-sm text-left text-red-500" v-if="_error">
            <li class="list-none">{{ _error }}</li>
          </u>
          <Button type="submit" class="w-full"> Login </Button>
        </form>
        <div class="mt-4 text-sm text-center">
          Don't have an account?
          <RouterLink to="/register" class="underline"> Register </RouterLink>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped></style>
