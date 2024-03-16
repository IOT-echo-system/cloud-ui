import type {NextPage} from 'next'
import React, {useEffect} from 'react'
import {LogIn} from '../../components/templates/auth'
import {AuthService} from '../../services'
import {Config} from '../../config'
import {useRouter} from 'next/router'

const LoginPage: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    AuthService.validate()
      .then(res => router.push(res.projectId ? Config.HOME_PAGE_PATH : Config.START_PAGE_PATH))
      .catch(() => ({}))
  }, [])

  return <LogIn />
}

export default LoginPage
