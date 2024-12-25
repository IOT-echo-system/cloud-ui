import {apiConfig} from '../config/apiConfig'
import WebClient from './webClient'
import type {BoardType} from '../typing/master'

class MasterService_ {
  private readonly masterConfig = apiConfig.master

  getBoards(): Promise<BoardType[]> {
    return WebClient.get<BoardType[]>({baseUrl: this.masterConfig.baseUrl, path: this.masterConfig.boards})
  }
}

export const MasterService = new MasterService_()
