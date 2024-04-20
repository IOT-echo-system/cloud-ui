import {apiConfig} from '../../config/apiConfig'
import {widgetConfig} from './widgetConfig'
import WebClient from '../webClient'
import type {BoardIdWithWidgetId} from './typing/widget'
import type {InvoiceSeed} from './typing/invoice'
import type {InvoiceWidget} from '../../typing/widget/widget'

const invoiceConfig = widgetConfig.invoice
const baseUrl = apiConfig.widget.baseUrl + invoiceConfig.baseUrl

export const InvoiceService = {
  updateTitle(values: {name: string}, boardIdAndWidgetId: BoardIdWithWidgetId): Promise<InvoiceWidget> {
    return WebClient.put<InvoiceWidget>({
      baseUrl: baseUrl,
      path: invoiceConfig.title,
      headers: {boardId: boardIdAndWidgetId.boardId},
      body: values,
      uriVariables: {widgetId: boardIdAndWidgetId.widgetId}
    })
  },

  getSeedData(widget: InvoiceWidget): Promise<InvoiceSeed[]> {
    return WebClient.get<InvoiceSeed[]>({
      baseUrl: baseUrl,
      path: invoiceConfig.seed,
      headers: {boardId: widget.boardId},
      uriVariables: {widgetId: widget.widgetId}
    })
  },

  addSeedItem(values: InvoiceSeed, widget: InvoiceWidget): Promise<InvoiceSeed> {
    return WebClient.post<InvoiceSeed>({
      baseUrl: baseUrl,
      path: invoiceConfig.seed,
      headers: {boardId: widget.boardId},
      uriVariables: {widgetId: widget.widgetId},
      body: values
    })
  },

  updateSeedItem(values: InvoiceSeed & {oldCode: string}, widget: InvoiceWidget): Promise<InvoiceSeed> {
    return WebClient.put<InvoiceSeed>({
      baseUrl: baseUrl,
      path: invoiceConfig.updateSeed,
      headers: {boardId: widget.boardId},
      uriVariables: {widgetId: widget.widgetId, itemCode: values.oldCode},
      body: values
    })
  },

  updatePayment(paid: boolean, widget: InvoiceWidget): Promise<InvoiceWidget> {
    return WebClient.put<InvoiceWidget>({
      baseUrl: baseUrl,
      path: invoiceConfig.payment,
      headers: {boardId: widget.boardId},
      uriVariables: {widgetId: widget.widgetId},
      body: {paid}
    })
  }
}
