import type { InjectionKey } from 'vue'

export type MenuOptions = {
  collapsed: Ref<boolean>
  toggle: () => void
}
export const menuKey: InjectionKey<MenuOptions> = Symbol('menu')
