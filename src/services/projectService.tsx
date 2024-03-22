import {apiConfig} from '../config/apiConfig'
import type {ProjectWithRoles} from './typing/project'
import WebClient from './webClient'
import type {Project} from '../typing/project'

const projectConfig = apiConfig.project

export const ProjectService = {
  getProjectsWithRoles(): Promise<ProjectWithRoles[]> {
    return WebClient.get<ProjectWithRoles[]>({
      baseUrl: projectConfig.baseUrl,
      path: projectConfig.projectsWithRoles
    })
  },

  createProject(values: {name: string}): Promise<ProjectWithRoles> {
    return WebClient.post<ProjectWithRoles>({
      baseUrl: projectConfig.baseUrl,
      path: projectConfig.projects,
      body: values
    })
  },

  getProjectDetails(): Promise<Project> {
    return WebClient.get<Project>({
      baseUrl: projectConfig.baseUrl,
      path: projectConfig.projectDetails
    })
  }
}
