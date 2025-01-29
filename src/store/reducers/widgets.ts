import type {TRootActions} from '../../typing/store'
import type {Widgets} from '../../typing/widget/widget'

export const WidgetsAction = {
  UPDATE_WIDGETS: 'UPDATE_WIDGETS',
  UPDATE_WIDGET: 'UPDATE_WIDGET'
} as const

export const initWidgetsState: Widgets = {}

const widgetsReducer = (state: Widgets, action: TRootActions): Widgets => {
  switch (action.type) {
    case WidgetsAction.UPDATE_WIDGETS: {
      const widgets = action.payload.widgets.reduce<Widgets>((allWidgets, widget) => {
        return {...allWidgets, [widget.widgetId]: widget}
      }, {})
      return {...state, ...widgets}
    }
    case WidgetsAction.UPDATE_WIDGET:
      return {...state, [action.payload.widget.widgetId]: action.payload.widget}
    default:
      return state
  }
}

export default widgetsReducer
