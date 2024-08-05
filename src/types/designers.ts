export interface Issue {
  id: number
  date_started_by_designer: string
  date_finished_by_designer: string
  status: string
}

export interface Designer {
  avatar: string
  username: string
  issues: Issue[]
  medianTime?: number
  completedTasks?: number
}
