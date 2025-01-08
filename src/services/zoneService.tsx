import {apiConfig} from '../config/apiConfig'
import WebClient from './webClient'
import type {ZoneReqBody, ZoneResBody} from './typing/zone'

class ZoneService_ {
  private readonly zoneConfig = apiConfig.zone

  createZone(premisesId: string, values: ZoneReqBody): Promise<ZoneResBody> {
    return WebClient.post<ZoneResBody>({
      baseUrl: this.zoneConfig.baseUrl,
      path: this.zoneConfig.zones,
      body: values,
      uriVariables: {premisesId}
    })
  }

  // updateZone(premisesId: string, values: ZoneReqBody) {
  //   return WebClient.put<ZoneResBody>({
  //     baseUrl: this.premisesConfig.baseUrl,
  //     path: this.premisesConfig.premisesDetails,
  //     body: values,
  //     uriVariables: {premisesId}
  //   })
  // }
}

export const ZoneService = new ZoneService_()
