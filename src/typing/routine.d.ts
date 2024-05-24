export type Routine = {
  projectId: string
  routineId: string
  name: string
  description: string
  enable: boolean
  events: RoutineEvent[]
  tasks: Task[]
}
