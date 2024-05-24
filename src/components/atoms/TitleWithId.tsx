import {Stack, Typography} from '@mui/material'
import React from 'react'

export type TitleWithIdProps = {title: string; id: string; idLabel: string}

export const TitleWithId: React.FC<TitleWithIdProps> = props => {
  return (
    <Stack>
      <Typography component={'div'} variant={'h4'}>
        {props.title}
      </Typography>
      <Typography>
        {props.idLabel}: {props.id}
      </Typography>
    </Stack>
  )
}
