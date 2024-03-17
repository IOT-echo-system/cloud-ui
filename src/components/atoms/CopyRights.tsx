import React from 'react'
import {Stack, Typography} from '@mui/material'
import {useSelector} from '../../hooks'

export const CopyRights: React.FC = () => {
  const site = useSelector(state => state.site)
  return (
    <Stack justifyContent={'center'} alignItems={'center'}>
      <Typography variant={'body2'}>&copy; 2024 {site.title}, All Rights Reserved.</Typography>
    </Stack>
  )
}
