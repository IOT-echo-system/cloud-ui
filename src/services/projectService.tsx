import {apiConfig} from '../config/apiConfig'
import type {ProjectsWithRoleResponse, ProjectWithRoles} from './typing/project'
import WebClient from './webClient'
import type {Project} from '../typing/project'

const projectConfig = apiConfig.project

export const ProjectService = {
  getProjectsWithRoles(): Promise<ProjectsWithRoleResponse> {
    return WebClient.get<ProjectsWithRoleResponse>({
      baseUrl: projectConfig.baseUrl,
      path: projectConfig.projects
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
