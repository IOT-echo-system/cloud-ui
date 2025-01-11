import type {AxiosError} from 'axios'
import WebClient from 'web-client-starter'
import {getStorage, StorageKeys} from '../utils/storage'
import {apiConfig} from '../config/apiConfig'
import {v4 as uuidV4} from 'uuid'

WebClient.interceptor.request(config => {
  const {token} = getStorage<{token: string}>(StorageKeys.AUTH) ?? {token: ''}
  const {premisesId} = getStorage<{premisesId: string}>(StorageKeys.PREMISES_ID) ?? {premisesId: ''}
  config.baseURL = apiConfig.baseUrl
  config.headers.authorization = token
  config.headers['x-trace-id'] = uuidV4()
  config.headers['x-premises-id'] = premisesId
  return config
})

WebClient.interceptor.response(
  response => response,
  (error: AxiosError) => {
    return Promise.reject(error.response?.data ?? error)
  }
)

export default WebClient
