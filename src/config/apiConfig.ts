export const apiConfig = {
  baseUrl: 'http://localhost:3001/api',
  auth: {
    baseUrl: '/auth',
    signUp: '/sign-up',
    login: '/login',
    validate: '/validate',
    generateOTP: '/generate-otp',
    verifyOTP: '/verify-otp',
    resetPassword: '/reset-password',
    updateToken: '/update-token'
  },
  account: {
    baseUrl: '/accounts',
    accounts: '',
    account: '/{accountId}/role/{roleId}'
  }
} as const
