import { Locale, formatDistanceToNow } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'

type SupportedLocale = 'en' | 'ru'

const localeMap: Record<SupportedLocale, Locale> = {
  en: enUS,
  ru,
}

export const getRelativeTime = (date: string, locale: string): string => {
  const supportedLocale: SupportedLocale =
    (locale as SupportedLocale) in localeMap ? (locale as SupportedLocale) : 'ru'
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: localeMap[supportedLocale],
  })
}
