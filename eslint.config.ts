import stylistic from '@stylistic/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'include patterns',
    files: ['**/*.{ts,cts,mts,tsx,vue}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest'
      }
    }
  },
  {
    name: 'ignore patterns',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/public/**',
      '**/.vscode/**',
      '!**/eslint.config.ts',
      '**/types.ts',
      '**/tailwind.config.js',
      '**/stylelint.config.js',
      '**/.gitignore',
      '**/.gitattributes',
      '**/components/ui/**',
      '**/lib/utils.ts'
    ]
  },
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  vueTsConfigs.recommendedTypeChecked,
  skipFormatting,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@stylistic': stylistic
    },
    extends: []
  },
  {
    rules: {
      'vue/multi-word-component-names': 0,
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'warn'
    }
  }
)
