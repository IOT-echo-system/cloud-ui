import type {Premises} from '../../typing/premises'
import {PremisesAction} from '../reducers/premises'

export const setPremises = (premises: Premises[]) => {
  return {type: PremisesAction.SET_PREMISES, payload: {premises}}
}
