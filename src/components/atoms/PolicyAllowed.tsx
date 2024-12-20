import type {PropsWithChildren} from 'react'
import React from 'react'
import {useSelector} from '../../hooks'
import {PolicyUtils} from '../../utils/policyUtils'
import type {StackProps} from '@mui/material'
import {Stack} from '@mui/material'

type PolicyAllowedPropsType = {policyId: string} & StackProps

export const PolicyAllowed: React.FC<PropsWithChildren<PolicyAllowedPropsType>> = ({children, policyId, ...props}) => {
  const {policies} = useSelector(state => state.user)
  if (!PolicyUtils.isValid(policies, policyId)) {
    return <></>
  }
  return <Stack {...props}>{children}</Stack>
}
