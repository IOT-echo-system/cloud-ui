import type {WidgetType} from '../../../typing/widget'

export type BoardIdWithWidgetId = {boardId: string; widgetId: string; widgetType: WidgetType}

export type AddWidgetResponse = {
  boardId: string
  widgetId: string
  widgetType: WidgetType
}
