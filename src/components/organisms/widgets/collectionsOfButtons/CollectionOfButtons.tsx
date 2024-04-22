import React from 'react'
import {Button, PolicyAllowed, WidgetContainer, WidgetTitle} from '../../../atoms'
import type {WidgetPropsType} from '../index'
import {SwitchButtons} from './switchButtons/SwitchButtons'
import {AddSwitchButton} from './switchButtons/AddSwitchButton'
import {PolicyUtils} from '../../../../utils/policyUtils'
import {ModalForms} from '../../ModalForms/ModalForms'
import {Add} from '@mui/icons-material'
import {Stack} from '@mui/material'

export const CollectionOfButtons: React.FC<WidgetPropsType<'COLLECTION_OF_BUTTONS'>> = ({widget}) => {
  return (
    <WidgetContainer spacing={2} p={2} sx={{minWidth: {xs: '90%', sm: 280}}}>
      <Stack spacing={2}>
        <WidgetTitle widget={widget} />
        <SwitchButtons widget={widget} />
      </Stack>
      <Stack direction={'row'}>
        <PolicyAllowed policyId={PolicyUtils.WIDGET_INVOICE_UPDATE}>
          <ModalForms getFormDetails={AddSwitchButton} widget={widget}>
            <Button variant={'contained'} startIcon={<Add />}>
              Add switch button
            </Button>
          </ModalForms>
        </PolicyAllowed>
      </Stack>
    </WidgetContainer>
  )
}
