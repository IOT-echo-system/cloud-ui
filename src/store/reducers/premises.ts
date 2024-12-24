import type {TRootActions} from '../../typing/store'
import type {Premises} from '../../typing/premises'

export const PremisesAction = {
  SET_PREMISES: 'SET_PREMISES',
  UNSET_PREMISES: 'UNSET_PREMISES',
  UPDATE_PREMISES: 'UPDATE_PREMISES',
  ADD_WIDGET: 'ADD_WIDGET',
  UPDATE_WIDGET: 'UPDATE_WIDGET'
} as const

export const initPremisesState: Premises | null = null

const premisesReducer = (state: Premises | null, action: TRootActions): Premises | null => {
  switch (action.type) {
    case PremisesAction.SET_PREMISES:
    case PremisesAction.UPDATE_PREMISES:
      return {...action.payload.premises}
    case PremisesAction.UNSET_PREMISES:
      return null
    default:
      return state
  }
}

export default premisesReducer
