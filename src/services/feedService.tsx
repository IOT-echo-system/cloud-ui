import {apiConfig} from '../config/apiConfig'
import WebClient from './webClient'
import type {Feed} from '../typing/feed'

class FeedService_ {
  feedConfig = apiConfig.feed

  createFeed(values: {name: string; type: string}): Promise<Feed> {
    return WebClient.post<Feed>({
      baseUrl: this.feedConfig.baseUrl,
      path: this.feedConfig.feeds,
      body: values
    })
  }

  getFeeds(): Promise<Feed[]> {
    return WebClient.get<Feed[]>({
      baseUrl: this.feedConfig.baseUrl,
      path: this.feedConfig.feeds
    })
  }

  updateName(feedId: string, values: {name: string}): Promise<Feed> {
    return WebClient.put<Feed>({
      baseUrl: this.feedConfig.baseUrl,
      path: this.feedConfig.updateName,
      uriVariables: {feedId},
      body: values
    })
  }

  updateValue(feedId: string, value: number): Promise<Feed> {
    return WebClient.put<Feed>({
      baseUrl: this.feedConfig.baseUrl,
      path: this.feedConfig.updateValue,
      uriVariables: {feedId},
      body: {value}
    })
  }
}

export const FeedService = new FeedService_()
