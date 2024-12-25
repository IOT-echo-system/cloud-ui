import {apiConfig} from '../config/apiConfig'
import WebClient from './webClient'
import type {BoardType, LocationResponse} from '../typing/master'

class MasterService_ {
  private readonly masterConfig = apiConfig.master

  getBoards(): Promise<BoardType[]> {
    return WebClient.get<BoardType[]>({baseUrl: this.masterConfig.baseUrl, path: this.masterConfig.boards})
  }

  getLocation(zipCode: number): Promise<LocationResponse> {
    return WebClient.get<LocationResponse>({
      baseUrl: this.masterConfig.baseUrl,
      path: this.masterConfig.locations,
      uriVariables: {pincode: zipCode}
    })
  }
}

export const MasterService = new MasterService_()
