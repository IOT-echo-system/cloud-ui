import WebClient from './webClient'
import {setStorage, StorageKeys} from '../utils/storage'
import {apiConfig} from '../config/apiConfig'
import type {LoginResBody, SignUpReqBody} from './typing/auth'

const authConfig = apiConfig.auth

const AuthService = {
  login: async (credentials: SignUpReqBody): Promise<void> => {
    return WebClient.post<LoginResBody>({
      baseUrl: authConfig.baseUrl,
      path: authConfig.login,
      body: credentials
    }).then(({token}) => {
      setStorage(StorageKeys.AUTH, {token: token})
    })
  },

  signUp: (values: {password: string; name: string; email: string}): Promise<void> => {
    return WebClient.post({baseUrl: authConfig.baseUrl, path: authConfig.signUp, body: values})
  }
}

export default AuthService
