import React from 'react'
import {WidgetContainer} from '../../../atoms'
import {Typography} from '@mui/material'
import type {WidgetPropsType} from '../index'

export const CollectionOfButtons: React.FC<WidgetPropsType<'COLLECTION_OF_BUTTONS'>> = ({widget}) => {
  return (
    <WidgetContainer p={2} sx={{width: '100%'}}>
      <Typography>Collections of buttons</Typography>
      <Typography>{JSON.stringify(widget)}</Typography>
    </WidgetContainer>
  )
}
