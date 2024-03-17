import React from 'react'
import {Stack, Typography} from '@mui/material'

export const CopyRights: React.FC = () => {
  return (
    <Stack justifyContent={'center'} alignItems={'center'}>
      <Typography variant={'body2'}>&copy; 2024 Robotutor tech. All Rights Reserved.</Typography>
    </Stack>
  )
}
