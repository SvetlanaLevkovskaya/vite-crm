import { endOfWeek, getWeek, startOfWeek } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'

export const getWeekNumber = (date: Date): number => {
  return getWeek(date, { locale: ru, weekStartsOn: 1 })
}

const getWeekRange = (date: Date) => {
  return {
    start: startOfWeek(date, { locale: ru }),
    end: endOfWeek(date, { locale: ru }),
  }
}

export const getLocaleMap = () => ({
  en: enUS,
  ru,
})

export const getRelativeWeekNumber = (finishedDate: Date, currentDate: Date) => {
  const { start } = getWeekRange(finishedDate)

  console.log('start getWeekRange(finishedDate)', start, getWeek(start, { locale: ru }))
  const { start: currentStart } = getWeekRange(currentDate)
  console.log(
    'start getWeekRange(currentDate)',
    currentStart,
    getWeek(currentStart, { locale: ru })
  )
  const relativeWeekNumber = getWeek(currentStart, { locale: ru }) - getWeek(start, { locale: ru })
  console.log(`Date: ${finishedDate}, Relative Week Number: ${relativeWeekNumber + 1}`)
  return relativeWeekNumber + 1
}
