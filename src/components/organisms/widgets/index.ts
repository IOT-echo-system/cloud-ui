import {Invoice} from './invoice/Invoice'

export const widgets = ['INVOICE'] as const

export const widgetsMap = {
  INVOICE: Invoice
}
