import React, {useEffect, useState} from 'react'
import {useSelector} from '../../hooks'
import {useRouter} from 'next/router'
import {Config} from '../../config'
import {Loader} from '../atoms'
import {PolicyUtils} from '../../utils/policyUtils'

type PageAllowedPropsType<T extends Record<string, unknown>> = {
  policy: string
  Component: React.ComponentType<T>
} & T

export const PageAllowed = <T extends Record<string, unknown>>(props: PageAllowedPropsType<T>): React.JSX.Element => {
  const {policy, Component} = props
  const {policies} = useSelector(state => state.user)
  const [validated, setValidated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const isAllowed = PolicyUtils.isValid(policies, policy)
    if (!isAllowed) {
      router.push(Config.HOME_PAGE_PATH).catch(() => ({}))
    }
    setValidated(true)
  }, [])

  if (!validated) {
    return <Loader loadingText={'Loading...'} />
  }

  return <Component {...props} />
}
