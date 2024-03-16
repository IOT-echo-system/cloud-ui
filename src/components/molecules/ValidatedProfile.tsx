import React, {PropsWithChildren, useEffect, useState} from 'react'
import {useDispatch} from '../../hooks'
import {useRouter} from 'next/router'
import {AuthService} from '../../services'
import {Config} from '../../config'
import {setUser} from '../../store/actions/user'
import {Loader} from '../atoms'
import {ProjectService} from '../../services/projectService'
import {setProject} from '../../store/actions/project'

export const ValidatedProfile: React.FC<PropsWithChildren> = ({children}) => {
  const [isValidated, setIsValidated] = useState(false)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (!router.pathname.startsWith('/auth')) {
      AuthService.validate()
        .then(res => {
          if (!res.projectId && router.pathname !== Config.START_PAGE_PATH) {
            return router.push(Config.START_PAGE_PATH)
          }
          setIsValidated(true)
        })
        .catch(() => {
          setIsValidated(false)
          return router.push(Config.LOGIN_PAGE_PATH)
        })
    } else {
      setLoading(false)
    }
  }, [router.pathname])

  useEffect(() => {
    if (!router.pathname.startsWith('/auth')) {
      AuthService.getUserDetails()
        .then(userDetails => dispatch(setUser(userDetails)))
        .catch(()=>({}))
        .finally(() => setLoading(false))
      ProjectService.getProjectDetails().then(projectDetails => dispatch(setProject(projectDetails)))
        .catch(()=>({}))
    }
  }, [router.pathname])

  if (loading) {
    return <Loader page loadingText={'Loading...'} />
  }

  return <>{children}</>
}
