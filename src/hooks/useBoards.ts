import {useSelector} from './useStore'
import type {Board} from '../typing/board'
import {useMemo} from 'react'

export const useBoards = (): {boards: Board[]} => {
  const {boards: allBoards, premises} = useSelector(state => state)

  const boards = useMemo((): Board[] => {
    if (!premises) {
      return []
    }
    const currentBoards = premises.boardIds.reduce<Set<Board>>((currentBoards, boardId) => {
      const board = allBoards[boardId] as Board | undefined
      return board ? currentBoards.add(board) : currentBoards
    }, new Set())

    return [...currentBoards] as Board[]
  }, [allBoards, premises?.boardIds])

  return {boards}
}
