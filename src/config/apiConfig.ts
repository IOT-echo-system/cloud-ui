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
    registration: '/registration'
  },
  project: {
    baseUrl: '/projects',
    projects: '',
    projectsWithRoles: '/project-with-roles',
    project: '/{projectId}/role/{roleId}',
    projectDetails: '/project-details',
    name: '/{projectId}/name'
  },
  board: {
    baseUrl: '/boards',
    boards: '',
    board: '/{boardId}',
    updateBoardName: '/{boardId}/name',
    secretKey: '/{boardId}/secret-key'
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
