import {apiConfig} from '../config/apiConfig'
import WebClient from './webClient'
import type {Widget, WidgetRequest} from '../typing/widget/widget'

class WidgetService_ {
  widgetConfig = apiConfig.widget

  addWidget(values: WidgetRequest): Promise<Widget> {
    return WebClient.post<Widget>({
      baseUrl: this.widgetConfig.baseUrl,
      path: this.widgetConfig.widgets,
      body: values
    })
  }

  // updateTitle(values: {name: string}, widget: Widget): Promise<{title: string}> {
  //   return WebClient.put<{title: string}>({
  //     baseUrl: this.widgetConfig.baseUrl,
  //     path: this.widgetConfig.title,
  //     headers: {boardId: widget.boardId},
  //     body: values,
  //     uriVariables: {widgetId: widget.widgetId}
  //   })
  // }
  getWidgets(): Promise<Widget[]> {
    return WebClient.get<Widget[]>({
      baseUrl: this.widgetConfig.baseUrl,
      path: this.widgetConfig.widgets
    })
  }
}

export const WidgetService = new WidgetService_()
