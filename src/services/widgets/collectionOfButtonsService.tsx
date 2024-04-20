import {widgetConfig} from './widgetConfig'
import WebClient from '../webClient'
import type {CollectionOfButtonsWidget} from '../../typing/widget/widget'
import type {AddButtonRequest} from './typing/collectionOfButtons'

class CollectionOfButtonsServiceWidget {
  collectionOfButtonsConfig = widgetConfig.collectionOfButtons

  addButton(values: AddButtonRequest, widget: CollectionOfButtonsWidget): Promise<CollectionOfButtonsWidget> {
    return WebClient.post<CollectionOfButtonsWidget>({
      baseUrl: this.collectionOfButtonsConfig.baseUrl,
      path: this.collectionOfButtonsConfig.buttons,
      headers: {boardId: widget.boardId},
      uriVariables: {widgetId: widget.widgetId},
      body: values
    })
  }
}

export const CollectionOfButtonsService = new CollectionOfButtonsServiceWidget()
