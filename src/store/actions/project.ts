import {Project} from '../../typing/project'
import {ProjectAction} from '../reducers/project'

export const setProject = (project: Project) => {
  return {type: ProjectAction.SET_PROJECT, payload: {project}}
}
