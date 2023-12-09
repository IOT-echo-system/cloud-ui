import type {User} from '@/typing/user'
import {Config} from '@/config'
import {setStorage, StorageKeys} from '@/utils/storage'
import WebClient from 'web-client-starter'

const AuthService = {
  async login(credentials: {email: string; password: string}): Promise<User> {
    const {authToken, user} = await WebClient.post<{authToken: string; user: User}>({
      baseUrl: Config.BACKEND_BASE_URL,
      path: Config.LOGIN_PATH,
      body: credentials
    })
    setStorage(StorageKeys.AUTH, {token: authToken})
    return user
  },

  signUp(values: {password: string; name: string; email: string}): Promise<void> {
    return WebClient.post({baseUrl: Config.BACKEND_BASE_URL, path: Config.SIGN_UP_PATH, body: values})
  }
}

export default AuthService
