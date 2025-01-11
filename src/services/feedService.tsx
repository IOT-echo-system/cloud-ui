import {apiConfig} from '../config/apiConfig'
import WebClient from './webClient'
import type {Feed} from '../typing/feed'

class FeedService_ {
  feedConfig = apiConfig.feed

  createFeed(premisesId: string, values: {name: string; type: string}): Promise<Feed> {
    return WebClient.post<Feed>({
      baseUrl: this.feedConfig.baseUrl,
      path: this.feedConfig.feeds,
      body: values,
      uriVariables: {premisesId}
    })
  }
}

export const FeedService = new FeedService_()
