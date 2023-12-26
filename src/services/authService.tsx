import WebClient from './webClient'
import {setStorage, StorageKeys} from '../utils/storage'
import {apiConfig} from '../config/apiConfig'
import type {
  GenerateOTPResBody,
  LoginResBody,
  ResetPasswordResBody,
  SignUpReqBody,
  SignUpResBody,
  VerifyOTPResBody
} from './typing/auth'

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

  signUp: (values: {password: string; name: string; email: string}): Promise<SignUpResBody> => {
    return WebClient.post<SignUpResBody>({baseUrl: authConfig.baseUrl, body: values, path: authConfig.signUp})
  },

  generateOTP(email: string): Promise<GenerateOTPResBody> {
    return WebClient.post<GenerateOTPResBody>({
      baseUrl: authConfig.baseUrl,
      path: authConfig.generateOTP,
      body: {email}
    })
  },

  verifyOTP({otp, otpId}: {otp: string; otpId: string}): Promise<VerifyOTPResBody> {
    return WebClient.post<VerifyOTPResBody>({
      baseUrl: authConfig.baseUrl,
      path: authConfig.verifyOTP,
      body: {otpId, otp}
    })
  },
  resetPassword(values: {password: string; currentPassword?: string}): Promise<ResetPasswordResBody> {
    return WebClient.post<ResetPasswordResBody>({
      baseUrl: authConfig.baseUrl,
      path: authConfig.resetPassword,
      body: values
    })
  }
}

export default AuthService
