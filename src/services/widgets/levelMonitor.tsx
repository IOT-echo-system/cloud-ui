import {widgetConfig} from './widgetConfig'
import WebClient from '../webClient'
import type {LevelMonitorWidget} from '../../typing/widget/widget'
import type {LevelMonitorValues} from './typing/levelMonitor'

class LevelMonitorServiceWidget {
  levelMonitorConfig = widgetConfig.levelMonitor

  updateValues(values: LevelMonitorValues, widget: LevelMonitorWidget): Promise<LevelMonitorWidget> {
    return WebClient.put<LevelMonitorWidget>({
      baseUrl: this.levelMonitorConfig.baseUrl,
      path: this.levelMonitorConfig.values,
      headers: {boardId: widget.boardId},
      uriVariables: {widgetId: widget.widgetId},
      body: values
    })
  }

  captureValue(type: 'min' | 'max', widget: LevelMonitorWidget): Promise<LevelMonitorWidget> {
    return WebClient.put<LevelMonitorWidget>({
      baseUrl: this.levelMonitorConfig.baseUrl,
      path: this.levelMonitorConfig.captureValue,
      headers: {boardId: widget.boardId},
      uriVariables: {widgetId: widget.widgetId},
      body: {type}
    })
  }
}

export const LevelMonitorService = new LevelMonitorServiceWidget()
