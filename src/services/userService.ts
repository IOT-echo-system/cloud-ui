import WebClient from './webClient'
import {apiConfig} from '../config/apiConfig'
import type {RegistrationReqBody, RegistrationResBody, UserResBody} from './typing/user'

class UserService_ {
  userConfig = apiConfig.user

  registration(values: RegistrationReqBody): Promise<RegistrationResBody> {
    return WebClient.post<RegistrationResBody>({
      baseUrl: this.userConfig.baseUrl,
      body: values,
      path: this.userConfig.registration
    })
  }

  getMyDetails(): Promise<UserResBody> {
    return WebClient.get<UserResBody>({
      baseUrl: this.userConfig.baseUrl,
      path: this.userConfig.me
    })
  }
}

export const UserService = new UserService_()
