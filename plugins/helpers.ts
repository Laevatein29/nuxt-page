import { Plugin } from '@nuxt/types'
import { Message } from 'element-ui'
import * as helperPlugin from '~/utils/helpers'

export type HelpersType = typeof helperPlugin & {
  copyText: (str: string) => void
}

const helpersPlugin: Plugin = ({ i18n }, inject) => {
  async function copyText(str: string) {
    document.addEventListener('copy', (e) => {
      e.clipboardData?.setData('text/plain', str)
      e.preventDefault()
    })

    try {
      const isCopy = document.execCommand('copy')
      if (!isCopy) {
        if (!navigator.clipboard) throw Error
        await navigator.clipboard.writeText(str)
      }
      Message.success(i18n.t('copySuccess').toString())
    } catch {
      Message.error(i18n.t('copyError').toString())
    }
  }

  inject('helpers', {
    ...helperPlugin,
    copyText,
  } as HelpersType)
}

export default helpersPlugin
