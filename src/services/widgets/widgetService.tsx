import {apiConfig} from '../../config/apiConfig'
import WebClient from '../webClient'
import type {WidgetType} from '../../components/organisms/widgets'
import type {Widget} from '../../typing/widget/widget'

const widgetConfig = apiConfig.widget

export const WidgetService = {
  addWidget(values: {type: string; boardId: string}): Promise<Widget[WidgetType]> {
    return WebClient.post<Widget[WidgetType]>({
      baseUrl: widgetConfig.baseUrl,
      path: widgetConfig.widgets,
      headers: {boardId: values.boardId},
      body: values
    })
  }
}
