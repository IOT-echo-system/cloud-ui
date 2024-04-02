import {apiConfig} from '../../config/apiConfig'
import WebClient from '../webClient'
import type {Widget} from '../../typing/widget'

const widgetConfig = apiConfig.widget

export const WidgetService = {
  addWidget(values: {type: string; boardId: string}): Promise<Widget> {
    return WebClient.post<Widget>({
      baseUrl: widgetConfig.baseUrl,
      path: widgetConfig.widgets,
      headers: {boardId: values.boardId},
      body: values
    })
  }
}
