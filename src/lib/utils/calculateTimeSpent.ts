import { Issue } from '../../types/designers.ts'

export const calculateTimeSpent = (issue: Issue) => {
  if (!issue.date_finished_by_designer) return 0
  const start = new Date(issue.date_started_by_designer).getTime()
  const end = new Date(issue.date_finished_by_designer).getTime()
  return (end - start) / (1000 * 60 * 60)
}
