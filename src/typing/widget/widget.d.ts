import type {Invoice} from './invoice'
import type {ButtonType} from './collectionOfButtons'

type BaseWidget = {widgetId: string; boardId: string; widgetType: WidgetType; title: string}
export type InvoiceWidget = BaseWidget & Invoice
export type CollectionOfButtonsWidget = BaseWidget & {buttons: ButtonType[]}

type WidgetMap = {
  INVOICE: InvoiceWidget
  COLLECTION_OF_BUTTONS: CollectionOfButtonsWidget
}

export type WidgetType = keyof WidgetMap
export type Widget<P extends WidgetType = WidgetType> = WidgetMap[P]
