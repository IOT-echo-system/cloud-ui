import {Roles} from '../services/typing/project'

export interface Project {
  projectId: string
  name: string,
  roles: Roles[]
}
