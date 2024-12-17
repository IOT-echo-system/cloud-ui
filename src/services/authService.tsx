import WebClient from './webClient'
import {setStorage, StorageKeys} from '../utils/storage'
import {apiConfig} from '../config/apiConfig'
import type {
  GenerateOTPResBody,
  LoginReqBody,
  LoginResBody,
  LogoutResBody,
  ResetPasswordResBody,
  ValidateResBody,
  VerifyOTPResBody
} from './typing/auth'
import type {User} from '../typing/user'

class AuthService_ {
  authConfig = apiConfig.auth

  generateOTP(email: string): Promise<GenerateOTPResBody> {
    return WebClient.post<GenerateOTPResBody>({
      baseUrl: this.authConfig.baseUrl,
      path: this.authConfig.generateOTP,
      body: {email}
    })
  }

  async login(credentials: LoginReqBody): Promise<LoginResBody> {
    const response = await WebClient.post<LoginResBody>({
      baseUrl: this.authConfig.baseUrl,
      path: this.authConfig.login,
      body: credentials
    })
    setStorage(StorageKeys.AUTH, {token: response.token})
    return response
  }

  resetPassword(values: {password: string; currentPassword?: string}): Promise<ResetPasswordResBody> {
    return WebClient.post<ResetPasswordResBody>({
      baseUrl: this.authConfig.baseUrl,
      path: this.authConfig.resetPassword,
      body: values
    })
  }

  verifyOTP({otp, otpId}: {otp: string; otpId: string}): Promise<VerifyOTPResBody> {
    return WebClient.post<VerifyOTPResBody>({
      baseUrl: this.authConfig.baseUrl,
      path: this.authConfig.verifyOTP,
      body: {otpId, otp}
    })
  }

  validate(): Promise<ValidateResBody> {
    return WebClient.get<ValidateResBody>({
      baseUrl: this.authConfig.baseUrl,
      path: this.authConfig.validate
    })
  }

  async updateToken(projectId: string, roleId: string): Promise<LoginResBody> {
    const response = await WebClient.post<LoginResBody>({
      baseUrl: this.authConfig.baseUrl,
      path: this.authConfig.updateToken,
      body: {projectId, roleId}
    })
    setStorage(StorageKeys.AUTH, {token: response.token})
    return response
  }

  getUserDetails(): Promise<User> {
    return WebClient.get<User>({
      baseUrl: this.authConfig.baseUrl,
      path: this.authConfig.userDetails
    })
  }

  logout(): Promise<LogoutResBody> {
    return WebClient.get<LogoutResBody>({
      baseUrl: this.authConfig.baseUrl,
      path: this.authConfig.logout
    })
  }
}

export const AuthService = new AuthService_()
