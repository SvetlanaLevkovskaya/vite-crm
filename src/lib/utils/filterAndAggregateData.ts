import { Task } from '../../types/task.ts'

import { getRelativeWeekNumber, getWeekNumber } from './relativeWeekNumber.ts'

export const filterAndAggregateData = (tasks: Task[], weeksCount: number) => {
  const currentDate = new Date()
  const filteredTasks = tasks.filter((task) => {
    if (task.status !== 'Done' || !task.date_finished) return false
    const finishedDate = new Date(task.date_finished)
    return getRelativeWeekNumber(finishedDate, currentDate) <= weeksCount
  })

  const weekData = filteredTasks.reduce(
    (acc, task) => {
      const finishedDate = new Date(task.date_finished!)
      const weekNumber = getWeekNumber(finishedDate)
      if (!acc[weekNumber]) {
        acc[weekNumber] = { profit: 0, expense: 0, net: 0 }
      }
      acc[weekNumber].profit += task.received_from_client || 0
      acc[weekNumber].expense +=
        (task.send_to_project_manager || 0) +
        (task.send_to_account_manager || 0) +
        (task.send_to_designer || 0)
      acc[weekNumber].net = acc[weekNumber].profit - acc[weekNumber].expense
      return acc
    },
    {} as Record<number, { profit: number; expense: number; net: number }>
  )

  return weekData
}
