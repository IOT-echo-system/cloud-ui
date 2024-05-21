import type {Project} from '../../typing/project'
import type {TRootActions} from '../../typing/store'

export const ProjectAction = {
  SET_PROJECT: 'SET_PROJECT'
} as const

export const initProjectState: Project = {
  policies: [],
  roles: [],
  name: '',
  projectId: '',
  users: []
}

const projectReducer = (state: Project, action: TRootActions): Project => {
  switch (action.type) {
    case ProjectAction.SET_PROJECT:
      return {...state, ...action.payload.project}
    default:
      return state
  }
}

export default projectReducer
