import React from 'react'
import {Breadcrumbs, PageContainer} from '../../atoms'
import {Stack} from '@mui/material'
import {Config} from '../../../config'
import {BoardDetails} from '../../organisms'
import type {Board as BoardType} from '../../../typing/board'

type BoardPropsType = {board: BoardType}

export const Board: React.FC<BoardPropsType> = ({board}) => {
  return (
    <PageContainer pt={2} spacing={2}>
      <Stack direction={{xs: 'column', sm: 'row'}} justifyContent={{sm: 'space-between'}} spacing={{xs: 2}}>
        <Breadcrumbs links={[{link: Config.BOARDS_PAGE_PATH, name: 'Boards'}]} text={board.name} />
      </Stack>
      <BoardDetails board={board} />
    </PageContainer>
  )
}
