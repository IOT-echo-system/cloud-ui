import WebClient from 'web-client-starter'
import type {AxiosError} from 'axios'
import {getStorage, StorageKeys} from '../utils/storage'
import {apiConfig} from '../config/apiConfig'
import {v4 as uuidV4} from 'uuid'
import type {Toast} from '../hooks'
import type {ServerError} from '../typing/error'

export const initWebClient = (toast: Toast): typeof WebClient => {
  WebClient.interceptor.request(config => {
    const {token} = getStorage<{token: string}>(StorageKeys.AUTH) ?? {token: ''}
    config.baseURL = apiConfig.baseUrl
    config.headers.authorization = token
    config.headers['x-trace-id'] = uuidV4()
    return config
  })

  WebClient.interceptor.response(
    response => response,
    (error: AxiosError) => {
      if (error.response?.data) {
        const errorData = error.response.data as ServerError
        toast.error(`Error: '${errorData.message}' with error code: '${errorData.errorCode}'`)
      }
      return Promise.reject(error.response?.data ?? error)
    }
  )
  return WebClient
}
