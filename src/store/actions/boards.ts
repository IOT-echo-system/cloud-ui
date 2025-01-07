import {BoardsAction} from '../reducers/boards'
import type {Board} from '../../typing/board'

export const updateBoards = (boards: Board[]) => {
  return {type: BoardsAction.UPDATE_BOARDS, payload: {boards}}
}

export const updateBoard = (board: Board) => {
  return {type: BoardsAction.UPDATE_BOARD, payload: {board}}
}
