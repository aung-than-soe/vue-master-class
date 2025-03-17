import { createRouter, createWebHistory } from 'vue-router/auto'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, _, next) => {
  const store = useAuthStore()
  await store.getSession()
  const isAuthorized = ['/login', '/register'].includes(to.path)

  if (!store.user && !isAuthorized) {
    next({ name: '/login' })
  } else if (store.user && isAuthorized) {
    next({ name: '/' })
  } else {
    next()
  }
})

if (import.meta.hot) {
  handleHotUpdate(router)
}

export default router
