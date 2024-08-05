import i18next from '../../i18n/config.ts'

const pluralize = (
  count: number,
  one: string,
  few: string,
  many: string,
  locale: string
): string => {
  if (locale === 'ru') {
    const lastDigit = count % 10
    const lastTwoDigits = count % 100
    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return `${count} ${one}`
    } else if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwoDigits >= 12 && lastTwoDigits <= 14)) {
      return `${count} ${few}`
    } else {
      return `${count} ${many}`
    }
  }

  return `${count} ${count === 1 ? one : many}`
}

export const getDurationText = (duration: string, locale: string): string => {
  if (typeof duration === 'undefined') return ''
  const numericDuration = +duration
  return pluralize(
    numericDuration,
    i18next.t('oneHour'),
    i18next.t('fewHours'),
    i18next.t('manyHours'),
    locale
  )
}

export const getTasksText = (count: number | undefined, locale: string): string => {
  if (typeof count === 'undefined') return ''
  return pluralize(
    count,
    i18next.t('oneTask'),
    i18next.t('fewTasks'),
    i18next.t('manyTasks'),
    locale
  )
}
