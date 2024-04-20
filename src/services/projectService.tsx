import {apiConfig} from '../config/apiConfig'
import type {ProjectWithRoles} from './typing/project'
import WebClient from './webClient'
import type {Project} from '../typing/project'

class ProjectService_ {
  projectConfig = apiConfig.project

  getProjectsWithRoles(): Promise<ProjectWithRoles[]> {
    return WebClient.get<ProjectWithRoles[]>({
      baseUrl: this.projectConfig.baseUrl,
      path: this.projectConfig.projectsWithRoles
    })
  }

  createProject(values: {name: string}): Promise<ProjectWithRoles> {
    return WebClient.post<ProjectWithRoles>({
      baseUrl: this.projectConfig.baseUrl,
      path: this.projectConfig.projects,
      body: values
    })
  }

  getProjectDetails(): Promise<Project> {
    return WebClient.get<Project>({
      baseUrl: this.projectConfig.baseUrl,
      path: this.projectConfig.projectDetails
    })
  }
}

export const ProjectService = new ProjectService_()
