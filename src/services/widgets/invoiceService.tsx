import {apiConfig} from '../../config/apiConfig'
import {widgetConfig} from './widgetConfig'
import WebClient from '../webClient'
import type {BoardIdWithWidgetId} from './typing/widget'
import type {InvoiceSeed, InvoiceTitleUpdateResponse} from './typing/invoice'
import type {Widget} from '../../typing/widget'

const invoiceConfig = widgetConfig.invoice
const baseUrl = apiConfig.widget.baseUrl + invoiceConfig.baseUrl

export const InvoiceService = {
  updateTitle(values: {name: string}, boardIdAndWidgetId: BoardIdWithWidgetId): Promise<InvoiceTitleUpdateResponse> {
    return WebClient.put<InvoiceTitleUpdateResponse>({
      baseUrl: baseUrl,
      path: invoiceConfig.title,
      headers: {boardId: boardIdAndWidgetId.boardId},
      body: values,
      uriVariables: {widgetId: boardIdAndWidgetId.widgetId}
    })
  },

  getSeedData(widget: Widget): Promise<InvoiceSeed[]> {
    return WebClient.get<InvoiceSeed[]>({
      baseUrl: baseUrl,
      path: invoiceConfig.seed,
      headers: {boardId: widget.boardId},
      uriVariables: {widgetId: widget.widgetId}
    })
  },

  addSeedItem(values: InvoiceSeed, widget: Widget): Promise<InvoiceSeed> {
    return WebClient.post<InvoiceSeed>({
      baseUrl: baseUrl,
      path: invoiceConfig.seed,
      headers: {boardId: widget.boardId},
      uriVariables: {widgetId: widget.widgetId},
      body: values
    })
  }
}
