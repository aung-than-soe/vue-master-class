import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import AutoImport from 'unplugin-auto-import/vite'
import FormKit from 'unplugin-formkit/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'

// import vueDevTools from 'vite-plugin-vue-devtools'

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
    plugins: [
      VueRouter({
        dts: './types/typed-router.d.ts'
      }),
      Icons({
        compiler: 'vue3',
        autoInstall: true
      }),
      FormKit({
        configFile: './formkit.config.ts'
      }),
      Components({
        dts: './types/components.d.ts',
        resolvers: [IconsResolver()]
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
          /\.md$/ // .md
        ],
        imports: [
          'vue',
          VueRouterAutoImports,
          {
            pinia: ['defineStore', 'storeToRefs', 'acceptHMRUpdate']
          },
          {
            'vue-meta': ['useMeta']
          }
        ],
        dts: './types/auto-imports.d.ts',
        viteOptimizeDeps: true,
        dirs: ['src/stores/**', 'src/composables/**']
      }),
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (element) => element.startsWith('iconify-icon')
          }
        }
      })
      // vueDevTools()
    ],
    server: {
      port: 4000
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
    },
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()]
      }
    }
  }
})
