import {useSelector} from '../../hooks'
import {Stack} from '@mui/material'
import React from 'react'
import {BoardWithDevices} from '../molecules/BoardWithDevices'

export const BoardsWithDevices: React.FC = () => {
  const {boards} = useSelector(state => state)
  return (
    <Stack direction={'row'} flexWrap={'wrap'}>
      {boards.map(board => (
        <BoardWithDevices key={board.boardId} board={board} />
      ))}
    </Stack>
  )
}
