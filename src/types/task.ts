export interface Task {
  id: number
  status: string
  designer: string | null
  project: string
  date_created: string
  received_from_client: number
  send_to_project_manager: number
  send_to_account_manager: number
  send_to_designer: number
  date_finished?: string
}
