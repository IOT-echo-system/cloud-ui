import type {Widget} from './widget/widget'
import type {WidgetType} from '../components/organisms/widgets'

export type Board = {
  boardId: string
  name: string
  status: 'HEALTHY' | 'UNHEALTHY'
  widgets: Array<Widget[WidgetType]>
}
