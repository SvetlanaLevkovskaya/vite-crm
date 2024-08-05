export const getWorkingWeekNumber = () => {
  const now = new Date()
  const shiftedTime = new Date(now.getTime() + 11 * 60 * 60 * 1000)
  const startOfYear = new Date(shiftedTime.getFullYear(), 0, 1)
  const pastDaysOfYear = (shiftedTime.getTime() - startOfYear.getTime()) / 86400000

  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7)
}
