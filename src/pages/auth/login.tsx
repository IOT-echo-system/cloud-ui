import type {NextPage} from 'next'
import React, {useEffect} from 'react'
import {LogIn} from '../../components/templates/auth'
import {UserService} from '../../services'
import {Config} from '../../config'
import {useRouter} from 'next/router'
import {useDispatch} from '../../hooks'
import {setUser} from '../../store/actions/user'

const LoginPage: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    UserService.getMyDetails()
      .then(user => {
        dispatch(setUser(user))
        return router.push(Config.HOME_PAGE_PATH)
      })
      .catch()
  }, [])

  return <LogIn />
}

export default LoginPage
