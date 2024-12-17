export type LoginReqBody = {email: string; password: string}
export type LoginResBody = {token: string}
export type GenerateOTPResBody = {success: boolean; otpId: string; generatedAt: Date}
export type VerifyOTPResBody = {success: boolean; token: string}
export type ValidateResBody = {userId: string}
export type ResetPasswordResBody = {success: boolean}
export type LogoutResBody = ResetPasswordResBody
