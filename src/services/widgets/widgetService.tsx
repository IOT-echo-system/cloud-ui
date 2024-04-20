import {apiConfig} from '../../config/apiConfig'
import WebClient from '../webClient'
import type {Widget} from '../../typing/widget/widget'

class WidgetService_ {
  widgetConfig = apiConfig.widget

  addWidget(values: {type: string; boardId: string}): Promise<Widget> {
    return WebClient.post<Widget>({
      baseUrl: this.widgetConfig.baseUrl,
      path: this.widgetConfig.widgets,
      headers: {boardId: values.boardId},
      body: values
    })
  }

  updateTitle(values: {name: string}, widget: Widget): Promise<{title: string}> {
    return WebClient.put<{title: string}>({
      baseUrl: this.widgetConfig.baseUrl,
      path: this.widgetConfig.title,
      headers: {boardId: widget.boardId},
      body: values,
      uriVariables: {widgetId: widget.widgetId}
    })
  }
}

export const WidgetService = new WidgetService_()
