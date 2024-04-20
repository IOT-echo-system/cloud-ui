import React from 'react'
import {PolicyAllowed, WidgetContainer, WidgetTitle} from '../../../atoms'
import {PolicyUtils} from '../../../../utils/policyUtils'
import {InvoiceSeed} from './InvoiceSeed/InvoiceSeed'
import {InvoiceCart} from './invoiceCart/InvoiceCart'
import type {WidgetPropsType} from '../index'

export const Invoice: React.FC<WidgetPropsType<'INVOICE'>> = ({widget: invoiceWidget}) => {
  return (
    <WidgetContainer p={2} sx={{width: '100%'}} spacing={2}>
      <WidgetTitle widget={invoiceWidget} />
      <InvoiceCart widget={invoiceWidget} />
      <PolicyAllowed policyId={PolicyUtils.WIDGET_INVOICE_UPDATE} sx={{display: {xs: 'none', sm: 'unset'}}}>
        <InvoiceSeed widget={invoiceWidget} />
      </PolicyAllowed>
    </WidgetContainer>
  )
}
