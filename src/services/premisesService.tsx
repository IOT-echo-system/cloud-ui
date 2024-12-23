import {apiConfig} from '../config/apiConfig'
import WebClient from './webClient'
import type {PremisesReqBody, PremisesResBody} from './typing/premises'

class PremisesService_ {
  private readonly premisesConfig = apiConfig.premises

  createPremises(values: PremisesReqBody): Promise<PremisesResBody> {
    return WebClient.post<PremisesResBody>({
      baseUrl: this.premisesConfig.baseUrl,
      path: this.premisesConfig.premises,
      body: values
    })
  }

  getPremises() {
    return WebClient.get<PremisesResBody[]>({
      baseUrl: this.premisesConfig.baseUrl,
      path: this.premisesConfig.premises
    })
  }
}

export const PremisesService = new PremisesService_()
