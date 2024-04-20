import {widgetConfig} from './widgetConfig'
import WebClient from '../webClient'
import type {InvoiceSeed} from './typing/invoice'
import type {InvoiceWidget} from '../../typing/widget/widget'

class InvoiceServiceWidget {
  invoiceConfig = widgetConfig.invoice

  getSeedData(widget: InvoiceWidget): Promise<InvoiceSeed[]> {
    return WebClient.get<InvoiceSeed[]>({
      baseUrl: this.invoiceConfig.baseUrl,
      path: this.invoiceConfig.seed,
      headers: {boardId: widget.boardId},
      uriVariables: {widgetId: widget.widgetId}
    })
  }

  addSeedItem(values: InvoiceSeed, widget: InvoiceWidget): Promise<InvoiceSeed> {
    return WebClient.post<InvoiceSeed>({
      baseUrl: this.invoiceConfig.baseUrl,
      path: this.invoiceConfig.seed,
      headers: {boardId: widget.boardId},
      uriVariables: {widgetId: widget.widgetId},
      body: values
    })
  }

  updateSeedItem(values: InvoiceSeed & {oldCode: string}, widget: InvoiceWidget): Promise<InvoiceSeed> {
    return WebClient.put<InvoiceSeed>({
      baseUrl: this.invoiceConfig.baseUrl,
      path: this.invoiceConfig.updateSeed,
      headers: {boardId: widget.boardId},
      uriVariables: {widgetId: widget.widgetId, itemCode: values.oldCode},
      body: values
    })
  }

  updatePayment(paid: boolean, widget: InvoiceWidget): Promise<InvoiceWidget> {
    return WebClient.put<InvoiceWidget>({
      baseUrl: this.invoiceConfig.baseUrl,
      path: this.invoiceConfig.payment,
      headers: {boardId: widget.boardId},
      uriVariables: {widgetId: widget.widgetId},
      body: {paid}
    })
  }
}

export const InvoiceService = new InvoiceServiceWidget()
