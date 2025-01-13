import {apiConfig} from '../config/apiConfig'
import WebClient from './webClient'
import type {Board} from '../typing/board'
import type {BoardSecretKeyResponse} from './typing/board'

class BoardService_ {
  boardConfig = apiConfig.board

  createBoard(values: {name: string; type: string}): Promise<Board> {
    return WebClient.post<Board>({
      baseUrl: this.boardConfig.baseUrl,
      path: this.boardConfig.boards,
      body: values
    })
  }

  getSecretKey(boardId: string): Promise<BoardSecretKeyResponse> {
    return WebClient.get<BoardSecretKeyResponse>({
      baseUrl: this.boardConfig.baseUrl,
      path: this.boardConfig.secretKey,
      uriVariables: {boardId}
    })
  }

  updateSecretKey(boardId: string): Promise<BoardSecretKeyResponse> {
    return WebClient.put<BoardSecretKeyResponse>({
      baseUrl: this.boardConfig.baseUrl,
      path: this.boardConfig.secretKey,
      uriVariables: {boardId}
    })
  }

  updateName(premisesId: string, boardId: string, values: {name: string}): Promise<Board> {
    return WebClient.put<Board>({
      baseUrl: this.boardConfig.baseUrl,
      path: this.boardConfig.updateBoardName,
      uriVariables: {boardId, premisesId},
      body: values
    })
  }

  getBoards(): Promise<Board[]> {
    return WebClient.get<Board[]>({
      baseUrl: this.boardConfig.baseUrl,
      path: this.boardConfig.boards
    })
  }
}

export const BoardService = new BoardService_()
