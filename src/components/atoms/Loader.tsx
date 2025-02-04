import React from 'react'
import type {StackProps} from '@mui/material'
import {CircularProgress, Stack, Typography} from '@mui/material'

type LoaderPropsType = {page?: boolean; loadingText?: string} & StackProps
export const Loader: React.FC<LoaderPropsType> = ({page = false, loadingText, ...rest}) => {
  return (
    <Stack
      flexDirection={'row'}
      justifyContent={'center'}
      alignItems={'center'}
      style={{height: page ? 'calc(100vh - 148px)' : 'auto'}}
      {...rest}
    >
      <Stack alignItems={'center'} spacing={2}>
        <CircularProgress />
        {loadingText && <Typography>{loadingText}</Typography>}
      </Stack>
    </Stack>
  )
}
