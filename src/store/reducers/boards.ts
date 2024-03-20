import type {TRootActions} from '../../typing/store'
import type {Board} from '../../typing/board'

export const BoardsAction = {
  SET_BOARDS: 'SET_BOARDS'
} as const

export const initBoardsState: Board[] = []

const boardsReducer = (state: Board[], action: TRootActions): Board[] => {
  switch (action.type) {
    case BoardsAction.SET_BOARDS:
      return [...action.payload.boards]
    default:
      return state
  }
}

export default boardsReducer
