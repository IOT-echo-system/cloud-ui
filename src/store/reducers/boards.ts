import type {TRootActions} from '../../typing/store'
import type {Board} from '../../typing/board'
import {unique} from '../../utils/utils'

export const BoardsAction = {
  SET_BOARDS: 'SET_BOARDS',
  UPDATE_BOARD: 'UPDATE_BOARD',
  ADD_WIDGET: 'ADD_WIDGET',
  UPDATE_WIDGET: 'UPDATE_WIDGET'
} as const

export const initBoardsState: Board[] = []

const boardsReducer = (state: Board[], action: TRootActions): Board[] => {
  switch (action.type) {
    case BoardsAction.SET_BOARDS:
      return [...action.payload.boards]
    case BoardsAction.UPDATE_BOARD:
      return state.map(board => (board.boardId === action.payload.board.boardId ? action.payload.board : board))
    case BoardsAction.ADD_WIDGET:
      return state.map(board => {
        if (board.boardId !== action.payload.boardId) {
          return board
        }
        board.widgets = unique(board.widgets.concat(action.payload.widget))
        return board
      })
    case BoardsAction.UPDATE_WIDGET:
      return state.map(board => {
        if (board.boardId !== action.payload.boardId) {
          return board
        }
        board.widgets = board.widgets.map(widget =>
          widget.widgetId === action.payload.widget.widgetId ? action.payload.widget : widget
        )
        return board
      })
    default:
      return state
  }
}

export default boardsReducer
