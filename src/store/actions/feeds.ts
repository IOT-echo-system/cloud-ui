import {FeedsAction} from '../reducers/feeds'
import type {Feed} from '../../typing/feed'

export const updateFeeds = (feeds: Feed[]) => {
  return {type: FeedsAction.UPDATE_FEEDS, payload: {feeds}}
}

export const updateFeed = (feed: Feed) => {
  return {type: FeedsAction.UPDATE_FEED, payload: {feed}}
}
