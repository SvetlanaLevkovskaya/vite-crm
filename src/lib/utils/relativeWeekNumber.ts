import { endOfWeek, getWeek, startOfWeek } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'

export const getWeekNumber = (date: Date): number => {
  return getWeek(date, { locale: enUS, weekStartsOn: 1 })
}

const getWeekRange = (date: Date) => {
  return {
    start: startOfWeek(date, { locale: enUS }),
    end: endOfWeek(date, { locale: enUS }),
  }
}

export const getLocaleMap = () => ({
  en: enUS,
  ru,
})

export const getRelativeWeekNumber = (date: Date, currentDate: Date) => {
  const { start } = getWeekRange(date)
  const { end } = getWeekRange(currentDate)
  return getWeek(start, { locale: enUS }) - getWeek(end, { locale: enUS }) + 1
}
