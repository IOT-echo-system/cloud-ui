import type {TRootActions} from '../../typing/store'
import type {Premises} from '../../typing/premises'

export const PremisesAction = {
  SET_PREMISES: 'SET_PREMISES',
  UNSET_PREMISES: 'UNSET_PREMISES',
  UPDATE_PREMISES: 'UPDATE_PREMISES',
  ADD_BOARD: 'ADD_BOARD',
  ADD_ZONE: 'ADD_ZONE'
} as const

export const initPremisesState: Premises | null = null

const premisesReducer = (state: Premises | null, action: TRootActions): Premises | null => {
  switch (action.type) {
    case PremisesAction.SET_PREMISES:
    case PremisesAction.UPDATE_PREMISES:
      return {...action.payload.premises}
    case PremisesAction.UNSET_PREMISES:
      return null
    case PremisesAction.ADD_BOARD:
      if (state) {
        return {...state, boardIds: [...new Set(state.boardIds.concat(action.payload.boardId))]}
      }
      return state
    case PremisesAction.ADD_ZONE:
      if (state) {
        return {...state, zoneIds: [...new Set(state.zoneIds.concat(action.payload.zoneId))]}
      }
      return state
    default:
      return state
  }
}

export default premisesReducer
