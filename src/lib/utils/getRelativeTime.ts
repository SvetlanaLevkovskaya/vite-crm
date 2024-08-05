import { formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'

export const getRelativeTime = (date: string): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ru })
}
