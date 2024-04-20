import {IconButton, Stack, Typography} from '@mui/material'
import {PolicyAllowed} from './PolicyAllowed'
import {PolicyUtils} from '../../utils/policyUtils'
import {ModalForms} from '../organisms'
import {EditWidgetName} from '../organisms/ModalForms/formFunctions'
import {Edit} from '@mui/icons-material'
import React from 'react'
import type {WidgetPropsType} from '../organisms/widgets'

export const WidgetTitle: React.FC<WidgetPropsType> = ({widget}) => {
  return (
    <Stack direction={'row'} alignItems={'start'} spacing={2}>
      <Stack>
        <Typography component={'div'} variant={'h5'}>
          {widget.title}
        </Typography>
        <Typography>Widget Id: {widget.widgetId}</Typography>
      </Stack>
      <PolicyAllowed policyId={PolicyUtils.WIDGET_UPDATE}>
        <ModalForms getFormDetails={EditWidgetName} widget={widget}>
          <IconButton color={'primary'}>
            <Edit />
          </IconButton>
        </ModalForms>
      </PolicyAllowed>
    </Stack>
  )
}
