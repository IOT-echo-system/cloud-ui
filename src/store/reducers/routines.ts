import type {TRootActions} from '../../typing/store'
import type {Routine} from '../../typing/routine'

export const RoutinesAction = {
  SET_ROUTINES: 'SET_ROUTINES',
  UPDATE_ROUTINE: 'UPDATE_ROUTINE'
} as const

export const initRoutinesState: Routine[] = []

const routinesReducer = (state: Routine[], action: TRootActions): Routine[] => {
  switch (action.type) {
    case RoutinesAction.SET_ROUTINES:
      return [...action.payload.routines]
    case RoutinesAction.UPDATE_ROUTINE:
      return state.map(routine => {
        return routine.routineId === action.payload.routine.routineId ? action.payload.routine : routine
      })
    default:
      return state
  }
}

export default routinesReducer
