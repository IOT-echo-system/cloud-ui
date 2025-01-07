import type {TRootActions} from '../../typing/store'
import type {Boards} from '../../typing/board'

export const BoardsAction = {
  UPDATE_BOARDS: 'UPDATE_BOARDS',
  UPDATE_BOARD: 'UPDATE_BOARD'
} as const

export const initBoardsState: Boards = {}

const boardsReducer = (state: Boards, action: TRootActions): Boards => {
  switch (action.type) {
    case BoardsAction.UPDATE_BOARDS: {
      const boards = action.payload.boards.reduce<Boards>((allBoards, board) => {
        return {...allBoards, [board.boardId]: board}
      }, {})
      return {...state, ...boards}
    }
    case BoardsAction.UPDATE_BOARD:
      return {...state, [action.payload.board.boardId]: action.payload.board}
    default:
      return state
  }
}

export default boardsReducer
