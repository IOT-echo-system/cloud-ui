import {apiConfig} from '../config/apiConfig'
import type {ProjectsWithRoleResponse, ProjectWithRoles} from './typing/project'
import WebClient from './webClient'

const projectConfig = apiConfig.project

export const ProjectService = {
  getProjectsWithRoles(): Promise<ProjectsWithRoleResponse> {
    return WebClient.get<ProjectsWithRoleResponse>({
      baseUrl: projectConfig.baseUrl,
      path: projectConfig.projects
    })
  },

  getAccount(projectId: string, roleId: string) {
    return WebClient.get<ProjectsWithRoleResponse>({
      baseUrl: projectConfig.baseUrl,
      path: projectConfig.projects,
      uriVariables: {projectId, roleId}
    })
  },

  createProject(values: {name: string}): Promise<ProjectWithRoles> {
    return WebClient.post<ProjectWithRoles>({
      baseUrl: projectConfig.baseUrl,
      path: projectConfig.projects,
      body: values
    })
  },

  getProjectDetails() {
    return WebClient.get<ProjectWithRoles>({
      baseUrl: projectConfig.baseUrl,
      path: projectConfig.projectDetails
    })
  }
}
