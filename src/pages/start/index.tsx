import type {NextPage} from 'next'
import React, {useEffect} from 'react'
import {Start} from '../../components/templates/start/Start'
import {useRouter} from 'next/router'
import {AuthService} from '../../services'
import {Config} from '../../config'

const StartPage: NextPage = () => {
  const router = useRouter()
  useEffect(() => {
    AuthService.validate()
      .then(res => {
        if (res.projectId) {
          return router.push(Config.HOME_PAGE_PATH)
        }
      })
      .catch()
  }, [])
  return <Start />
}

export default StartPage
