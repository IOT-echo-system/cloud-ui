export const apiConfig = {
  baseUrl: '/api',
  auth: {
    baseUrl: '/auth',
    signUp: '/sign-up',
    login: '/login',
    validate: '/validate',
    generateOTP: '/generate-otp',
    verifyOTP: '/verify-otp',
    resetPassword: '/reset-password',
    updateToken: '/update-token',
    userDetails: '/user-details',
    logout: '/logout'
  },
  project: {
    baseUrl: '/projects',
    projects: '',
    projectsWithRoles: '/project-with-roles',
    project: '/{projectId}/role/{roleId}',
    projectDetails: '/project-details'
  },
  board: {
    baseUrl: '/boards',
    boards: '',
    updateBoardName: '/{boardId}/name'
  },
  widget: {
    baseUrl: '/widgets',
    widgets: ''
  }
} as const
