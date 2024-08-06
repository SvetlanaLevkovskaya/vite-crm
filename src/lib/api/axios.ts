import axios from 'axios'

import { Comment } from '../../types/comments.ts'
import { Designer } from '../../types/designers.ts'
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
  return 'Произошла неизвестная ошибка'
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

export const fetchDesigners = async (): Promise<Designer[]> => {
  try {
    const response = await instanceAxios.get<{ results: Designer[] }>(ApiRoutes.designer)
    return response.data.results
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
