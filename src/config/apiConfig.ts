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
    baseUrl: '/zones',
    zones: '',
    updateName: '/{zoneId}/name'
  },
  board: {
    baseUrl: '/boards',
    boards: '',
    board: '/{boardId}',
    updateBoardName: '/{boardId}/name',
    secretKey: '/{boardId}/secret-key'
  },
  feed: {
    baseUrl: '/feeds',
    feeds: '',
    updateName: '/{feedId}/name',
    updateValue: '/{feedId}/value'
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
