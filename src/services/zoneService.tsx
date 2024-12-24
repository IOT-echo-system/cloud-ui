import {apiConfig} from '../config/apiConfig'
import WebClient from './webClient'
import type {ZoneReqBody, ZoneResBody} from './typing/zone'

class ZoneService_ {
  private readonly zoneConfig = apiConfig.zone

  createZone(values: ZoneReqBody): Promise<ZoneResBody> {
    return WebClient.post<ZoneResBody>({
      baseUrl: this.zoneConfig.baseUrl,
      path: this.zoneConfig.zones,
      body: values
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
