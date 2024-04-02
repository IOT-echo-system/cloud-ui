import type {Widget} from './widget'

export type Board = {
  boardId: string
  name: string
  status: 'HEALTHY' | 'UNHEALTHY'
  widgets: Widget[]
}
