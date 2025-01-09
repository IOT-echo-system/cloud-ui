import {apiConfig} from '../config/apiConfig'
import WebClient from './webClient'
import type {ZoneReqBody} from './typing/zone'
import type {Zone} from '../typing/zones'

class ZoneService_ {
  private readonly zoneConfig = apiConfig.zone

  createZone(premisesId: string, values: ZoneReqBody): Promise<Zone> {
    return WebClient.post<Zone>({
      baseUrl: this.zoneConfig.baseUrl,
      path: this.zoneConfig.zones,
      body: values,
      uriVariables: {premisesId}
    })
  }

  updateName(premisesId: string, zoneId: string, values: ZoneReqBody): Promise<Zone> {
    return WebClient.put<Zone>({
      baseUrl: this.zoneConfig.baseUrl,
      path: this.zoneConfig.updateName,
      body: values,
      uriVariables: {premisesId, zoneId}
    })
  }
}

export const ZoneService = new ZoneService_()
