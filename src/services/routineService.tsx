import {apiConfig} from '../config/apiConfig'
import WebClient from './webClient'
import type {Routine} from '../typing/routine'

class RoutineService_ {
  routineConfig = apiConfig.routine

  createRoutine(values: {name: string}): Promise<Routine> {
    return WebClient.post<Routine>({
      baseUrl: this.routineConfig.baseUrl,
      path: this.routineConfig.routines,
      body: values
    })
  }

  getRoutines(): Promise<Routine[]> {
    return WebClient.get<Routine[]>({baseUrl: this.routineConfig.baseUrl, path: this.routineConfig.routines})
  }

  updateRoutineName(values: {name: string}, routineId: string): Promise<{name: string}> {
    return WebClient.put<{name: string}>({
      baseUrl: this.routineConfig.baseUrl,
      path: this.routineConfig.name,
      body: values,
      uriVariables: {routineId}
    })
  }
}

export const RoutineService = new RoutineService_()
