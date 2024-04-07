import type {MouseEventHandler} from 'react'
import {useEffect, useState} from 'react'
import {ProjectService} from '../../../services/projectService'
import type {ProjectWithRoles} from '../../../services/typing/project'
import {useToast} from '../../../hooks'
import {AuthService} from '../../../services'
import {useRouter} from 'next/router'
import {Config} from '../../../config'

type UseStartType = {
  projects: ProjectWithRoles[]
  userId: string
  handleSelect: (projectId: string, roleId: string) => MouseEventHandler<HTMLButtonElement>
  addProject: (project: ProjectWithRoles) => void
}

export const useStart = (): UseStartType => {
  const [projects, setProjects] = useState<ProjectWithRoles[]>([])
  const [userId, setUserId] = useState('')
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    ProjectService.getProjectsWithRoles().then(setProjects).catch(toast.error)
    AuthService.validate()
      .then(user => {
        setUserId(user.userId)
      })
      .catch(toast.error)
  }, [])

  const handleSelect = (projectId: string, roleId: string): MouseEventHandler<HTMLButtonElement> => {
    return () => {
      AuthService.updateToken(projectId, roleId)
        .then(() => router.push(Config.HOME_PAGE_PATH))
        .catch(toast.error)
    }
  }

  const addProject = (project: ProjectWithRoles) => {
    setProjects([project, ...projects])
  }

  useEffect(() => {
    ProjectService.getProjectsWithRoles().then(res => {
      setProjects(res)
    })
  }, [])

  return {projects, handleSelect, addProject, userId}
}
