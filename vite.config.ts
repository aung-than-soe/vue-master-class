import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueRouter from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const supabaseKeys = ['SUPABASE_KEY', 'SUPABASE_URL']
  const env = loadEnv(mode, process.cwd(), '')

  const supabaseMap = supabaseKeys.reduce(
    (acc, current) => ({ ...acc, [current.split('_')[1]]: env[current] }),
    {}
  )
  const supabase = `import.meta.env.SUPABASE`
  return {
    plugins: [vueRouter(), vue(), vueDevTools()],
    server: {
      port: 3000
    },
    define: {
      __APP_VERSION__: JSON.stringify(env['APP_VERSION']),
      'import.meta.env.APP_VERSION': JSON.stringify(env['APP_VERSION']),
      [supabase]: supabaseMap
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
