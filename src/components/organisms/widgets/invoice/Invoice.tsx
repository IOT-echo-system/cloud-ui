import React from 'react'
import type {Widget} from '../../../../typing/widget'
import {PolicyAllowed, WidgetContainer} from '../../../atoms'
import {IconButton, Stack, Typography} from '@mui/material'
import {PolicyUtils} from '../../../../utils/policyUtils'
import {ModalForms} from '../../ModalForms/ModalForms'
import {EditInvoiceWidgetName} from '../../ModalForms/formFunctions'
import {Edit} from '@mui/icons-material'
import {InvoiceSeed} from './InvoiceSeed/InvoiceSeed'
import {InvoiceCart} from './invoiceCart/InvoiceCart'

type InvoicePropsType = {widget: Widget}
export const Invoice: React.FC<InvoicePropsType> = ({widget}) => {
  return (
    <WidgetContainer p={2} sx={{width: '100%'}}>
      <Stack direction={'row'} alignItems={'start'} spacing={2}>
        <Stack>
          <Typography component={'div'} variant={'h5'}>
            {widget.title}
          </Typography>
          <Typography>Widget Id: {widget.widgetId}</Typography>
        </Stack>
        <PolicyAllowed policyId={PolicyUtils.WIDGET_INVOICE_UPDATE}>
          <ModalForms getFormDetails={EditInvoiceWidgetName} widget={widget}>
            <IconButton color={'primary'}>
              <Edit />
            </IconButton>
          </ModalForms>
        </PolicyAllowed>
      </Stack>
      <InvoiceCart widget={widget} />
      <PolicyAllowed policyId={PolicyUtils.WIDGET_INVOICE_UPDATE} sx={{display: {xs: 'none', sm: 'unset'}}}>
        <InvoiceSeed widget={widget} />
      </PolicyAllowed>
    </WidgetContainer>
  )
}
