import {Stack} from '@mui/material'
import React from 'react'
import {CopyRights, PageContainer} from '../atoms'

export const Footer: React.FC = () => {
  return (
    <Stack sx={{padding: {xs: '16px 0', md: '24px 0', lg: '32px 0'}}}>
      <PageContainer>
        <CopyRights />
      </PageContainer>
    </Stack>
  )
}
