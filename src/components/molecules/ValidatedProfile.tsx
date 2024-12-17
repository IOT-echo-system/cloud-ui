import type {PropsWithChildren} from 'react'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {AuthService} from '../../services'
import {Config} from '../../config'
import {Loader} from '../atoms'

export const ValidatedProfile: React.FC<PropsWithChildren> = ({children}) => {
  const [loading, setLoading] = useState(true)
  // const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (!router.pathname.startsWith('/auth')) {
      AuthService.validate().catch(() => {
        return router.push(Config.LOGIN_PAGE_PATH)
      })
    } else {
      setLoading(false)
    }
  }, [router.pathname])

  // useEffect(() => {
  //   const fetchDetails = (): void => {
  //     if (!router.pathname.startsWith('/auth')) {
  //       // const [userDetails, projectDetails] = await Promise.all([
  //       //   UserService.getUserDetails(),
  //       //   ProjectService.getProjectDetails()
  //       // ])
  //       // dispatch(setUser(userDetails))
  //       // dispatch(setProject(projectDetails))
  //     }
  //   }
  //   // fetchDetails().finally(() => {
  //   //   setLoading(false)
  //   // })
  // }, [router.pathname])

  if (loading) {
    return <Loader page loadingText={'Loading...'} />
  }

  return <>{children}</>
}
