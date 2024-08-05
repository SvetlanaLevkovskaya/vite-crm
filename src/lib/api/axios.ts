import axios from 'axios'

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
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf8',
  },
  withCredentials: true,
  paramsSerializer: {
    indexes: null,
  },
})

instanceAxios.interceptors.response.use(
  (res) => res,
  (error) => {
    const errorMessage = handleApiError(error)
    return Promise.reject(new Error(errorMessage))
  }
)

export const apiClientService = {}
