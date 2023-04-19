import { HelpersType } from '~/plugins/helpers'

declare module 'vue/types/vue' {
  interface Vue {
    $helpers: HelpersType
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $helpers: HelpersType
  }

  interface Context {
    $helpers: HelpersType
  }
}
