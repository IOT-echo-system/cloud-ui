import type {PropsWithChildren} from 'react'
import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {UserService} from '../../services'
import {Config} from '../../config'
import {Loader} from '../atoms'
import {useDispatch} from '../../hooks'
import {setUser} from '../../store/actions/user'

export const ValidatedProfile: React.FC<PropsWithChildren> = ({children}) => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (!router.pathname.startsWith('/auth')) {
      UserService.getMyDetails()
        .then(user => {
          dispatch(setUser(user))
        })
        .catch(() => router.push(Config.LOGIN_PAGE_PATH))
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [router.pathname])

  if (loading) {
    return <Loader page loadingText={'Loading...'} />
  }

  return <>{children}</>
}
