import WebClient from 'web-client-starter'
import {getStorage, StorageKeys} from '../utils/storage'
import {apiConfig} from '../config/apiConfig'
import {v4 as uuidV4} from 'uuid'

WebClient.interceptor.request(config => {
  const {token} = getStorage<{token: string}>(StorageKeys.AUTH) ?? {token: ''}
  config.baseURL = apiConfig.baseUrl
  config.headers.authorization = token
  config.headers['x-trace-id'] = uuidV4()
  return config
})

export default WebClient
