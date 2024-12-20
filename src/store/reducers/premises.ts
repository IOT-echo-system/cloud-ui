import type {TRootActions} from '../../typing/store'
import type {Premises} from '../../typing/premises'

export const PremisesAction = {
  SET_PREMISES: 'SET_PREMISES',
  UPDATE_PREMISES: 'UPDATE_PREMISES',
  ADD_WIDGET: 'ADD_WIDGET',
  UPDATE_WIDGET: 'UPDATE_WIDGET'
} as const

export const initPremisesState: Premises[] = []

const premisesReducer = (state: Premises[], action: TRootActions): Premises[] => {
  switch (action.type) {
    case PremisesAction.SET_PREMISES:
      return [...action.payload.premises]
    default:
      return state
  }
}

export default premisesReducer
