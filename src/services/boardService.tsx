import {apiConfig} from '../config/apiConfig'
import WebClient from './webClient'
import type {BoardResponse} from './typing/board'

const boardConfig = apiConfig.board

export const BoardService = {
  createBoard(values: {name: string}): Promise<BoardResponse> {
    return WebClient.post<BoardResponse>({
      baseUrl: boardConfig.baseUrl,
      path: boardConfig.boards,
      body: values
    })
  }
}
