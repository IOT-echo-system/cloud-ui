import type {PropsWithChildren} from 'react'
import React from 'react'
import {useSelector} from '../../hooks'
import {PolicyUtils} from '../../utils/policyUtils'

type PolicyAllowedPropsType = {policyId: string}

export const PolicyAllowed: React.FC<PropsWithChildren<PolicyAllowedPropsType>> = ({children, policyId}) => {
  const {policies} = useSelector(state => state.project)
  if (!PolicyUtils.isValid(policies, policyId)) {
    return <></>
  }
  return <>{children}</>
}
