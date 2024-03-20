import * as siteActions from './actions/site'
import * as userActions from './actions/user'
import * as projectActions from './actions/project'
import * as boardsActions from './actions/boards'
import siteReducer, {initSiteState} from './reducers/site'

import userReducer, {initUserState} from './reducers/user'
import type {TRootActions, TRootReducer, TRootState} from '../typing/store'
import projectReducer, {initProjectState} from './reducers/project'
import boardsReducer, {initBoardsState} from './reducers/boards'

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
  project: initProjectState,
  boards: initBoardsState
}

export const rootActions = {
  site: siteActions,
  user: userActions,
  project: projectActions,
  boards: boardsActions
}

export const rootReducer = combineReducers({
  site: siteReducer,
  user: userReducer,
  project: projectReducer,
  boards: boardsReducer
})
