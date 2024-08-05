import 'i18next'

import { defaultNS } from '../i18n/config.ts'

import resources from './resources.ts'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: typeof resources
  }
}
