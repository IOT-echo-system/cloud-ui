import React, {useEffect, useState} from 'react'
import {useSelector} from '../../hooks'
import {useRouter} from 'next/router'
import {Config} from '../../config'
import {Loader} from '../atoms'
import {PolicyUtils} from '../../utils/policyUtils'

type PageAllowedPropsType = {policyId: string; Component: React.FC}

export const PageAllowed: React.FC<PageAllowedPropsType> = ({policyId, Component}) => {
  const {policies} = useSelector(state => state.project)
  const [validated, setValidated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const isAllowed = PolicyUtils.isValid(policies, policyId)
    if (!isAllowed) {
      router.push(Config.HOME_PAGE_PATH).catch(() => ({}))
    }
    setValidated(true)
  }, [])

  if (!validated) {
    return <Loader loadingText={'Loading...'} />
  }

  return <Component />
}
