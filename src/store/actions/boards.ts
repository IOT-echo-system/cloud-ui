import {BoardsAction} from '../reducers/boards'
import type {Board} from '../../typing/board'
import type {Widget} from '../../typing/widget/widget'

export const setBoards = (boards: Board[]) => {
  return {type: BoardsAction.SET_BOARDS, payload: {boards}}
}

export const updateBoard = (board: Board) => {
  return {type: BoardsAction.UPDATE_BOARD, payload: {board}}
}

export const updateWidget = (widget: Widget, boardId: string) => {
  return {type: BoardsAction.UPDATE_WIDGET, payload: {widget, boardId}}
}

export const addWidget = (widget: Widget, boardId: string) => {
  return {type: BoardsAction.ADD_WIDGET, payload: {widget, boardId}}
}
