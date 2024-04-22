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

  updateButton(values: AddButtonRequest, widget: CollectionOfButtonsWidget, buttonId: string) {
    return WebClient.put<CollectionOfButtonsWidget>({
      baseUrl: this.collectionOfButtonsConfig.baseUrl,
      path: this.collectionOfButtonsConfig.button,
      headers: {boardId: widget.boardId},
      uriVariables: {widgetId: widget.widgetId, buttonId},
      body: values
    })
  }

  deleteButton(buttonId: string, widget: CollectionOfButtonsWidget) {
    return WebClient.deleteAPI<CollectionOfButtonsWidget>({
      baseUrl: this.collectionOfButtonsConfig.baseUrl,
      path: this.collectionOfButtonsConfig.button,
      headers: {boardId: widget.boardId},
      uriVariables: {widgetId: widget.widgetId, buttonId}
    })
  }

  updateButtonValue(value: number, buttonId: string, widget: CollectionOfButtonsWidget) {
    return WebClient.put<CollectionOfButtonsWidget>({
      baseUrl: this.collectionOfButtonsConfig.baseUrl,
      path: this.collectionOfButtonsConfig.buttonValue,
      headers: {boardId: widget.boardId},
      uriVariables: {widgetId: widget.widgetId, buttonId},
      body: {value}
    })
  }
}

export const CollectionOfButtonsService = new CollectionOfButtonsServiceWidget()
