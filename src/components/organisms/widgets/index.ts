import {Invoice} from './invoice/Invoice'
import {CollectionOfButtons} from './collectionsOfButtons/CollectionOfButtons'
import type React from 'react'
import type {Widget, WidgetType} from '../../../typing/widget/widget'

export const widgetsNameMap: Record<WidgetType, string> = {
  INVOICE: 'Invoice',
  COLLECTION_OF_BUTTONS: 'Collection of buttons'
} as const

export type WidgetPropsType<P extends WidgetType> = {widget: Widget<P>}

export const widgetsMap: {[P in WidgetType]: React.FC<WidgetPropsType<P>>} = {
  INVOICE: Invoice,
  COLLECTION_OF_BUTTONS: CollectionOfButtons
}
