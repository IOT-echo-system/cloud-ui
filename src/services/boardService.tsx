import {apiConfig} from '../config/apiConfig'
import WebClient from './webClient'
import type {Board} from '../typing/board'
import type {BoardSecretKeyResponse} from './typing/board'

const boardConfig = apiConfig.board

export const BoardService = {
  createBoard(values: {name: string}): Promise<Board> {
    return WebClient.post<Board>({
      baseUrl: boardConfig.baseUrl,
      path: boardConfig.boards,
      body: values
    })
  },

  getBoards(): Promise<Board[]> {
    return WebClient.get<Board[]>({baseUrl: boardConfig.baseUrl, path: boardConfig.boards})
  },

  updateBoardName(values: {name: string}, boardId: string) {
    return WebClient.put<Board>({
      baseUrl: boardConfig.baseUrl,
      path: boardConfig.updateBoardName,
      body: values,
      uriVariables: {boardId}
    })
  },

  getSecretKey(boardId: string): Promise<BoardSecretKeyResponse> {
    return WebClient.get<BoardSecretKeyResponse>({
      baseUrl: boardConfig.baseUrl,
      path: boardConfig.secretKey,
      uriVariables: {boardId}
    })
  },

  updateSecretKey(boardId: string): Promise<BoardSecretKeyResponse> {
    return WebClient.put<BoardSecretKeyResponse>({
      baseUrl: boardConfig.baseUrl,
      path: boardConfig.secretKey,
      uriVariables: {boardId}
    })
  }
}
