import * as siteActions from './actions/site'
import * as userActions from './actions/user'
import * as premisesActions from './actions/premises'
import * as boardsActions from './actions/boards'
import * as routinesActions from './actions/routines'

import siteReducer, {initSiteState} from './reducers/site'
import userReducer, {initUserState} from './reducers/user'
import type {TRootActions, TRootReducer, TRootState} from '../typing/store'
import boardsReducer, {initBoardsState} from './reducers/boards'
import routinesReducer, {initRoutinesState} from './reducers/routines'
import premisesReducer, {initPremisesState} from './reducers/premises'

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
  boards: initBoardsState,
  routines: initRoutinesState
}

export const rootActions = {
  site: siteActions,
  user: userActions,
  premises: premisesActions,
  boards: boardsActions,
  routines: routinesActions
}

export const rootReducer = combineReducers({
  site: siteReducer,
  user: userReducer,
  premises: premisesReducer,
  boards: boardsReducer,
  routines: routinesReducer
})
