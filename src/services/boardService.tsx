import {apiConfig} from '../config/apiConfig'
import WebClient from './webClient'
import type {Board} from '../typing/board'
import type {BoardSecretKeyResponse} from './typing/board'

class BoardService_ {
  boardConfig = apiConfig.board

  createBoard(premisesId: string, values: {name: string; type: string}): Promise<Board> {
    return WebClient.post<Board>({
      baseUrl: this.boardConfig.baseUrl,
      path: this.boardConfig.boards,
      body: values,
      uriVariables: {premisesId}
    })
  }

  getBoards(): Promise<Board[]> {
    return WebClient.get<Board[]>({baseUrl: this.boardConfig.baseUrl, path: this.boardConfig.boards})
  }

  updateBoardName(values: {name: string}, boardId: string): Promise<{name: string}> {
    return WebClient.put<{name: string}>({
      baseUrl: this.boardConfig.baseUrl,
      path: this.boardConfig.updateBoardName,
      body: values,
      uriVariables: {boardId}
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
}

export const BoardService = new BoardService_()
