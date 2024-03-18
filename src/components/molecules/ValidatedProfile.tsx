import type {PropsWithChildren} from 'react'
import React, {useEffect, useState} from 'react'
import {useDispatch} from '../../hooks'
import {useRouter} from 'next/router'
import {AuthService} from '../../services'
import {Config} from '../../config'
import {setUser} from '../../store/actions/user'
import {Loader} from '../atoms'
import {ProjectService} from '../../services/projectService'
import {setProject} from '../../store/actions/project'

export const ValidatedProfile: React.FC<PropsWithChildren> = ({children}) => {
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
        })
        .catch(() => {
          return router.push(Config.LOGIN_PAGE_PATH)
        })
    } else {
      setLoading(false)
    }
  }, [router.pathname])

  useEffect(() => {
    const fetchDetails = async () => {
      if (!router.pathname.startsWith('/auth')) {
        const [userDetails, projectDetails] = await Promise.all([
          AuthService.getUserDetails(),
          ProjectService.getProjectDetails()
        ])
        dispatch(setUser(userDetails))
        dispatch(setProject(projectDetails))
      }
    }
    fetchDetails().finally(() => {
      setLoading(false)
    })
  }, [router.pathname])

  if (loading) {
    return <Loader page loadingText={'Loading...'} />
  }

  return <>{children}</>
}
