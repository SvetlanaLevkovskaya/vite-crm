import { initReactI18next } from 'react-i18next'

import i18next from 'i18next'
import HttpBackend from 'i18next-http-backend'

import translationEN from './locale/en/translation.json'
import translationRU from './locale/ru/translation.json'

export const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
}

export const defaultNS = 'translation'

i18next
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locale/{{lng}}/{{ns}}.json',
    },
  })

export default i18next
