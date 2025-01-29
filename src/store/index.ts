import * as siteActions from './actions/site'
import * as userActions from './actions/user'
import * as premisesActions from './actions/premises'
import * as zonesActions from './actions/zones'
import * as boardsActions from './actions/boards'
import * as routinesActions from './actions/routines'
import * as feedsActions from './actions/feeds'
import * as widgetsActions from './actions/widgets'

import siteReducer, {initSiteState} from './reducers/site'
import userReducer, {initUserState} from './reducers/user'
import type {TRootActions, TRootReducer, TRootState} from '../typing/store'
import boardsReducer, {initBoardsState} from './reducers/boards'
import routinesReducer, {initRoutinesState} from './reducers/routines'
import premisesReducer, {initPremisesState} from './reducers/premises'
import zonesReducer, {initZonesState} from './reducers/zones'
import feedsReducer, {initFeedsState} from './reducers/feeds'
import widgetsReducer, {initWidgetsState} from './reducers/widgets'

const combineReducers = <S = TRootState>(reducers: {[K in keyof S]: TRootReducer<S[K]>}): TRootReducer<S> => {
  return (state: S, action: TRootActions): S => {
    return (Object.keys(reducers) as Array<keyof S>).reduce(
      (prevState: S, key: keyof S) => ({...prevState, [key]: reducers[key](prevState[key], action)}),
      state
    )
  }
}

export const rootState = {
  site: initSiteState,
  user: initUserState,
  premises: initPremisesState,
  zones: initZonesState,
  boards: initBoardsState,
  feeds: initFeedsState,
  widgets: initWidgetsState,
  routines: initRoutinesState
}

export const rootActions = {
  site: siteActions,
  user: userActions,
  premises: premisesActions,
  zones: zonesActions,
  boards: boardsActions,
  feeds: feedsActions,
  widgets: widgetsActions,
  routines: routinesActions
}

export const rootReducer = combineReducers({
  site: siteReducer,
  user: userReducer,
  premises: premisesReducer,
  zones: zonesReducer,
  boards: boardsReducer,
  feeds: feedsReducer,
  widgets: widgetsReducer,
  routines: routinesReducer
})
