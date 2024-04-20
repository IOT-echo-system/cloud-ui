import React from 'react'
import {PolicyAllowed, WidgetContainer} from '../../../atoms'
import {IconButton, Stack, Typography} from '@mui/material'
import {PolicyUtils} from '../../../../utils/policyUtils'
import {ModalForms} from '../../ModalForms/ModalForms'
import {EditWidgetName} from '../../ModalForms/formFunctions'
import {Edit} from '@mui/icons-material'
import {InvoiceSeed} from './InvoiceSeed/InvoiceSeed'
import {InvoiceCart} from './invoiceCart/InvoiceCart'
import type {WidgetPropsType} from '../index'

export const Invoice: React.FC<WidgetPropsType<'INVOICE'>> = ({widget: invoiceWidget}) => {
  return (
    <WidgetContainer p={2} sx={{width: '100%'}}>
      <Stack direction={'row'} alignItems={'start'} spacing={2}>
        <Stack>
          <Typography component={'div'} variant={'h5'}>
            {invoiceWidget.title}
          </Typography>
          <Typography>Widget Id: {invoiceWidget.widgetId}</Typography>
        </Stack>
        <PolicyAllowed policyId={PolicyUtils.WIDGET_UPDATE}>
          <ModalForms getFormDetails={EditWidgetName} widget={invoiceWidget}>
            <IconButton color={'primary'}>
              <Edit />
            </IconButton>
          </ModalForms>
        </PolicyAllowed>
      </Stack>
      <InvoiceCart widget={invoiceWidget} />
      <PolicyAllowed policyId={PolicyUtils.WIDGET_INVOICE_UPDATE} sx={{display: {xs: 'none', sm: 'unset'}}}>
        <InvoiceSeed widget={invoiceWidget} />
      </PolicyAllowed>
    </WidgetContainer>
  )
}
