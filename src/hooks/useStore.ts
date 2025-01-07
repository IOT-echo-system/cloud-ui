import type {Dispatch} from 'react'
import {useCallback, useContext, useMemo} from 'react'
import type {TRootActions, TRootState} from '../typing/store'
import {GlobalContext} from '../store/configureStore'

type TypedUseSelectorHook = <U>(cb: (state: TRootState) => U) => U

export const useSelector: TypedUseSelectorHook = cb => {
  const {state} = useContext(GlobalContext)
  return useMemo(() => cb(state), [cb, state])
}

export const useDispatch = (): Dispatch<TRootActions> => {
  const {dispatch} = useContext(GlobalContext)
  return useCallback(
    (action: TRootActions) => {
      dispatch(action)
    },
    [dispatch]
  )
}
