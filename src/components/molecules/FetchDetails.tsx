import type {PropsWithChildren} from 'react'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from '../../hooks'
import {BoardService} from '../../services/boardService'
import {setBoards} from '../../store/actions/boards'

export const FetchDetails: React.FC<PropsWithChildren> = ({children}) => {
  const dispatch = useDispatch()
  const {user, project} = useSelector(state => state)

  useEffect(() => {
    if (user.userId && project.projectId) {
      BoardService.getBoards().then(boards => {
        dispatch(setBoards(boards))
      })
    }
  }, [user.userId, project.projectId])

  return <>{children}</>
}
