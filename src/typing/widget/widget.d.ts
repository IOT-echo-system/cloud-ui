import type {Invoice} from './invoice'
import type {ButtonType} from './collectionOfButtons'
import type {LevelMonitor} from './levelMonitor'

type BaseWidget = {widgetId: string; boardId: string; widgetType: WidgetType; title: string}
export type InvoiceWidget = BaseWidget & Invoice
export type CollectionOfButtonsWidget = BaseWidget & {buttons: ButtonType[]}
export type LevelMonitorWidget = BaseWidget & LevelMonitor

type WidgetMap = {
  INVOICE: InvoiceWidget
  COLLECTION_OF_BUTTONS: CollectionOfButtonsWidget
  LEVEL_MONITOR: LevelMonitorWidget
}

export type WidgetType = keyof WidgetMap
export type Widget<P extends WidgetType = WidgetType> = WidgetMap[P]
