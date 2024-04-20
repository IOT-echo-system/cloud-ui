import type {WidgetType} from '../components/organisms/widgets'
import type {Invoice} from './invoice'
import type {Buttons} from './collectionOfButtons'

type BaseWidget = {widgetId: string; boardId: string; widgetType: WidgetType; title: string}
export type InvoiceWidget = BaseWidget & Invoice
export type CollectionOfButtonsWidget = BaseWidget & Buttons

export type Widget = {
  INVOICE: InvoiceWidget
  COLLECTION_OF_BUTTONS: CollectionOfButtonsWidget
}
