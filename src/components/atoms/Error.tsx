import React from 'react'
import {Stack, Typography} from '@mui/material'

type ErrorPropsType = {errorText?: string; page?: boolean}
export const Error: React.FC<ErrorPropsType> = ({errorText, page = false}) => {
  return (
    <Stack
      flexDirection={'row'}
      justifyContent={'center'}
      alignItems={'center'}
      style={{height: page ? 'calc(100vh - 148px)' : 'auto'}}
    >
      {errorText && (
        <Typography color={'error'} variant={'h5'} component={'div'}>
          {errorText}
        </Typography>
      )}
    </Stack>
  )
}
