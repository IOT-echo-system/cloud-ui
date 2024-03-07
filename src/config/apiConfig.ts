export const apiConfig = {
  baseUrl: '/api',
  auth: {
    baseUrl: '/auth',
    signUp: '/sign-up',
    login: '/login',
    validate: '/validate',
    generateOTP: '/generate-otp',
    verifyOTP: '/verify-otp',
    resetPassword: '/reset-password'
  },
  account: {
    baseUrl: '/accounts',
    accounts: '',
    account: '/{accountId}/role/{roleId}'
  }
} as const
