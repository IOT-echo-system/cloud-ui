import {BoardsAction} from '../reducers/boards'
import type {Board} from '../../typing/board'

export const setBoards = (boards: Board[]) => {
  return {type: BoardsAction.SET_BOARDS, payload: {boards}}
}
