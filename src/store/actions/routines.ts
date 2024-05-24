import {RoutinesAction} from '../reducers/routines'
import type {Routine} from '../../typing/routine'

export const setRoutines = (routines: Routine[]) => {
  return {type: RoutinesAction.SET_ROUTINES, payload: {routines}}
}

export const updateRoutine = (routine: Routine) => {
  return {type: RoutinesAction.UPDATE_ROUTINE, payload: {routine}}
}
