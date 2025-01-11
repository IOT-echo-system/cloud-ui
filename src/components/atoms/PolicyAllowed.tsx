import type {PropsWithChildren} from 'react'
import React from 'react'
import {useSelector} from '../../hooks'
import {PolicyUtils} from '../../utils/policyUtils'
import type {StackProps} from '@mui/material'
import {Stack} from '@mui/material'

type PolicyAllowedPropsType = {policyId: string; otherConditions?: boolean[]} & StackProps

export const PolicyAllowed: React.FC<PropsWithChildren<PolicyAllowedPropsType>> = ({
  children,
  policyId,
  otherConditions = [],
  ...props
}) => {
  const {policies} = useSelector(state => state.user)
  if (!PolicyUtils.isValid(policies, policyId) || otherConditions.some(match => !match)) {
    return <></>
  }
  return <Stack {...props}>{children}</Stack>
}
