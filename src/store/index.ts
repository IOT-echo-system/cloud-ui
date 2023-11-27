import type {TRootActions, TRootReducer, TRootState} from '@/typing/store'
import * as siteActions from './actions/site'
import * as userActions from './actions/user'
import siteReducer, {initSiteState} from './reducers/site'
import userReducer, {initUserState} from '@/store/reducers/user'

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
  user: initUserState
}

export const rootActions = {
  site: siteActions,
  user: userActions
}

export const rootReducer = combineReducers({
  site: siteReducer,
  user: userReducer
})
