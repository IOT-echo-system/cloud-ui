import type {TRootActions} from '../../typing/store'
import type {Board} from '../../typing/board'

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
    default:
      return state
  }
}

export default boardsReducer
