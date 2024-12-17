import WebClient from './webClient'
import {apiConfig} from '../config/apiConfig'
import type {RegistrationReqBody, RegistrationResBody} from './typing/user'

class UserService_ {
  userConfig = apiConfig.user

  registration(values: RegistrationReqBody): Promise<RegistrationResBody> {
    return WebClient.post<RegistrationResBody>({
      baseUrl: this.userConfig.baseUrl,
      body: values,
      path: this.userConfig.registration
    })
  }
}

export const UserService = new UserService_()
