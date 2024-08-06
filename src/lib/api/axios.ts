import axios from 'axios'

import { Comment } from '../../types/comments.ts'
import { Designer, Issue } from '../../types/designers.ts'
import { ApiRoutes } from '../configs/routes.ts'

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error(error.message)
      return error.message || error.response.statusText
    } else if (error.request) {
      console.error('No Response Error:', error.request.statusText)
      return error.request.statusText
    }
  } else if (error instanceof Error) {
    console.error('Unknown Error:', error.message)
    return error.message
  } else {
    console.error('Unexpected Error:', error)
    return error as string
  }
  return 'Unexpected Error'
}

const instanceAxios = axios.create({
  baseURL: 'https://sandbox.creos.me/api/v1',
})

instanceAxios.interceptors.response.use(
  (res) => res,
  (error) => {
    const errorMessage = handleApiError(error)
    return Promise.reject(new Error(errorMessage))
  }
)

export const fetchComments = async (): Promise<Comment[]> => {
  try {
    const response = await instanceAxios.get(ApiRoutes.comment)
    return response.data
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}

export const fetchDesigners = async (
  status?: string,
  key?: string,
  ordering?: string,
  page?: number,
  limit?: number
): Promise<Designer[]> => {
  try {
    const params: Record<string, any> = {}
    if (status) params.status = status
    if (key) params.key = key
    if (ordering) params.ordering = ordering
    if (page) params.page = page
    if (limit) params.limit = limit

    const response = await instanceAxios.get<{ results: Designer[] }>(ApiRoutes.designer, {
      params,
    })
    const designers = response.data.results

    return designers.map((designer) => {
      const closedTasksCount = designer.issues.filter(
        (issue: Issue) => issue.status === 'Done'
      ).length
      const inProgressTasksCount = designer.issues.filter(
        (issue: Issue) => issue.status === 'In Progress'
      ).length

      return {
        ...designer,
        closedTasksCount,
        inProgressTasksCount,
      }
    })
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}

export const fetchIssues = async () => {
  try {
    const response = await instanceAxios.get(ApiRoutes.issue)
    return response.data
  } catch (error) {
    throw new Error(handleApiError(error))
  }
}
