export const apiConfig = {
  baseUrl: '/api',
  auth: {
    baseUrl: '/auth',
    login: '/login',
    validate: '/validate',
    generateOTP: '/generate-otp',
    verifyOTP: '/verify-otp',
    resetPassword: '/reset-password',
    updateToken: '/update-token',
    userDetails: '/user-details',
    logout: '/logout'
  },
  user: {
    baseUrl: '/users',
    registration: '/registration',
    me: '/me'
  },
  premises: {
    baseUrl: '/premises',
    premises: '',
    premisesDetails: '/{premisesId}'
  },
  zone: {
    baseUrl: '/premises/{premisesId}/zones',
    zones: ''
  },
  board: {
    baseUrl: '/boards',
    boards: '',
    board: '/{boardId}',
    updateBoardName: '/{boardId}/name',
    secretKey: '/{boardId}/secret-key'
  },
  master: {
    baseUrl: '/masters',
    boards: '/boards',
    locations: '/locations/{pincode}'
  },
  widget: {
    baseUrl: '/widgets',
    widgets: '',
    title: '/{widgetId}/title'
  },
  routine: {
    baseUrl: '/routines',
    routines: '',
    name: '/{routineId}/name'
  }
} as const
