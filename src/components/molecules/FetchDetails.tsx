import type {PropsWithChildren} from 'react'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from '../../hooks'
import {BoardService, RoutineService} from '../../services'
import {setBoards} from '../../store/actions/boards'
import {setRoutines} from '../../store/actions/routines'

export const FetchDetails: React.FC<PropsWithChildren> = ({children}) => {
  const dispatch = useDispatch()
  const {user, project} = useSelector(state => state)

  useEffect(() => {
    if (user.userId && project.projectId) {
      BoardService.getBoards().then(boards => {
        dispatch(setBoards(boards))
      })
      RoutineService.getRoutines().then(routines => {
        dispatch(setRoutines(routines))
      })
    }
  }, [user.userId, project.projectId])

  return <>{children}</>
}
