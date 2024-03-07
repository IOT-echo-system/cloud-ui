export type SignUpReqBody = {email: string; password: string}
export type SignUpResBody = {email: string; name: string; userId: string}
export type LoginResBody = {token: string}
export type GenerateOTPResBody = {success: boolean; otpId: string; generatedAt: Date}
export type VerifyOTPResBody = {success: boolean; token: string}
export type ValidateResBody = {
  projectId?: string
  userId: string
}
export type ResetPasswordResBody = {success: boolean}
