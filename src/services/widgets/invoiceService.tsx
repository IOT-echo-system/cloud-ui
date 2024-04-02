import {apiConfig} from '../../config/apiConfig'
import {widgetConfig} from './widgetConfig'
import WebClient from '../webClient'
import type {BoardIdWithWidgetId} from './typing/widget'
import type {InvoiceTitleUpdateResponse} from './typing/invoice'

const invoiceConfig = widgetConfig.invoice
const baseUrl = apiConfig.widget.baseUrl + invoiceConfig.baseUrl

export const InvoiceService = {
  updateTitle(values: {name: string}, boardIdAndWidgetId: BoardIdWithWidgetId): Promise<InvoiceTitleUpdateResponse> {
    return WebClient.put<InvoiceTitleUpdateResponse>({
      baseUrl: baseUrl,
      path: invoiceConfig.updateTitle,
      headers: {boardId: boardIdAndWidgetId.boardId},
      body: values,
      uriVariables: {widgetId: boardIdAndWidgetId.widgetId}
    })
  }
}
