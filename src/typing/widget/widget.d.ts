import type {WidgetTypes} from '../../components/organisms/ModalForms/formFunctions/premises/widgets/widgets'

export type WidgetRequest = {
  config: Record<string, unknown>
  name: string
  type: WidgetTypes
  feedId: string
  zoneId: string
}

export type Widget = WidgetRequest & {widgetId: string}

export type Widgets = Record<string, Widget>
