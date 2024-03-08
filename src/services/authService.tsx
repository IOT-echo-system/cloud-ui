import WebClient from './webClient'
import {setStorage, StorageKeys} from '../utils/storage'
import {apiConfig} from '../config/apiConfig'
import type {
  GenerateOTPResBody,
  LoginResBody,
  ResetPasswordResBody,
  SignUpReqBody,
  SignUpResBody,
  ValidateResBody,
  VerifyOTPResBody
} from './typing/auth'

const authConfig = apiConfig.auth

export const AuthService = {
  generateOTP(email: string): Promise<GenerateOTPResBody> {
    return WebClient.post<GenerateOTPResBody>({
      baseUrl: authConfig.baseUrl,
      path: authConfig.generateOTP,
      body: {email}
    })
  },

  async login(credentials: SignUpReqBody): Promise<LoginResBody> {
    const response = await WebClient.post<LoginResBody>({
      baseUrl: authConfig.baseUrl,
      path: authConfig.login,
      body: credentials
    })
    setStorage(StorageKeys.AUTH, {token: response.token})
    return response
  },

  resetPassword(values: {password: string; currentPassword?: string}): Promise<ResetPasswordResBody> {
    return WebClient.post<ResetPasswordResBody>({
      baseUrl: authConfig.baseUrl,
      path: authConfig.resetPassword,
      body: values
    })
  },

  signUp(values: {password: string; name: string; email: string}): Promise<SignUpResBody> {
    return WebClient.post<SignUpResBody>({baseUrl: authConfig.baseUrl, body: values, path: authConfig.signUp})
  },

  verifyOTP({otp, otpId}: {otp: string; otpId: string}): Promise<VerifyOTPResBody> {
    return WebClient.post<VerifyOTPResBody>({
      baseUrl: authConfig.baseUrl,
      path: authConfig.verifyOTP,
      body: {otpId, otp}
    })
  },

  validate(): Promise<ValidateResBody> {
    return WebClient.get<ValidateResBody>({
      baseUrl: authConfig.baseUrl,
      path: authConfig.validate
    })
  }
}
