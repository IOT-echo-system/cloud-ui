import type {Premises} from '../../typing/premises'
import {PremisesAction} from '../reducers/premises'

export const setPremises = (premises: Premises) => {
  return {type: PremisesAction.SET_PREMISES, payload: {premises}}
}

export const unsetPremises = () => {
  return {type: PremisesAction.UNSET_PREMISES}
}

export const updatePremises = (premises: Premises) => {
  return {type: PremisesAction.UPDATE_PREMISES, payload: {premises}}
}

export const addBoardInPremises = (boardId: string) => {
  return {type: PremisesAction.ADD_BOARD, payload: {boardId}}
}

export const addZoneInPremises = (zoneId: string) => {
  return {type: PremisesAction.ADD_ZONE, payload: {zoneId}}
}
