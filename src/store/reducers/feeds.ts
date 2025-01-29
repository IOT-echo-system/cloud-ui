import type {TRootActions} from '../../typing/store'
import type {Feeds} from '../../typing/feed'

export const FeedsAction = {
  UPDATE_FEEDS: 'UPDATE_FEEDS',
  UPDATE_FEED: 'UPDATE_FEED'
} as const

export const initFeedsState: Feeds = {}

const feedsReducer = (state: Feeds, action: TRootActions): Feeds => {
  switch (action.type) {
    case FeedsAction.UPDATE_FEEDS: {
      const feeds = action.payload.feeds.reduce<Feeds>((allFeeds, feed) => {
        return {...allFeeds, [feed.feedId]: feed}
      }, {})
      return {...state, ...feeds}
    }
    case FeedsAction.UPDATE_FEED:
      return {...state, [action.payload.feed.feedId]: action.payload.feed}
    default:
      return state
  }
}

export default feedsReducer
