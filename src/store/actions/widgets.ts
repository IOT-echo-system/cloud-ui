import {WidgetsAction} from '../reducers/widgets'
import type {Widget} from '../../typing/widget/widget'

export const updateWidgets = (widgets: Widget[]) => {
  return {type: WidgetsAction.UPDATE_WIDGETS, payload: {widgets}}
}

export const updateWidget = (widget: Widget) => {
  return {type: WidgetsAction.UPDATE_WIDGET, payload: {widget}}
}
