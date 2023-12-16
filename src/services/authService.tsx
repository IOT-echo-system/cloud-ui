import WebClient from './webClient'
import type {User} from '../typing/user'
import {setStorage, StorageKeys} from '../utils/storage'
import {apiConfig} from '../config/apiConfig'

const authConfig = apiConfig.auth

const AuthService = {
  login: async (credentials: {email: string; password: string}): Promise<User> => {
    const {authToken, user} = await WebClient.post<{authToken: string; user: User}>({
      baseUrl: authConfig.baseUrl,
      path: authConfig.login,
      body: credentials
    })
    setStorage(StorageKeys.AUTH, {token: authToken})
    return user
  },

  signUp: (values: {password: string; name: string; email: string}): Promise<void> => {
    return WebClient.post({baseUrl: authConfig.baseUrl, path: authConfig.signUp, body: values})
  }
}

export default AuthService
