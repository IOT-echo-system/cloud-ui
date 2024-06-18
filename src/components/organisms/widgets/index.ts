import {Invoice} from './invoice/Invoice'
import {CollectionOfButtons} from './collectionsOfButtons/CollectionOfButtons'
import type React from 'react'
import type {Widget, WidgetType} from '../../../typing/widget/widget'
import {LevelMonitor} from './levelMonitor/LevelMonitor'

export const widgetsNameMap: Record<WidgetType, string> = {
  INVOICE: 'Invoice',
  COLLECTION_OF_BUTTONS: 'Collection of buttons',
  LEVEL_MONITOR: 'Level monitor'
} as const

export type WidgetPropsType<P extends WidgetType = WidgetType> = {widget: Widget<P>}

export const widgetsMap: {[P in WidgetType]: React.FC<WidgetPropsType<P>>} = {
  INVOICE: Invoice,
  COLLECTION_OF_BUTTONS: CollectionOfButtons,
  LEVEL_MONITOR: LevelMonitor
}
