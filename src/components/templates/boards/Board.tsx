import React from 'react'
import {Breadcrumbs, Button, PageContainer, PolicyAllowed} from '../../atoms'
import {Stack} from '@mui/material'
import {Config} from '../../../config'
import {PolicyUtils} from '../../../utils/policyUtils'
import {BoardDetails, AddWidget, ModalForms} from '../../organisms'
import type {Board as BoardType} from '../../../typing/board'
import {Add} from '@mui/icons-material'

type BoardPropsType = {board: BoardType}

export const Board: React.FC<BoardPropsType> = ({board}) => {
  return (
    <PageContainer pt={2} spacing={2}>
      <Stack direction={{xs: 'column', sm: 'row'}} justifyContent={{sm: 'space-between'}} spacing={{xs: 2}}>
        <Breadcrumbs links={[{link: Config.BOARDS_PAGE_PATH, name: 'Boards'}]} text={board.name} />
        <PolicyAllowed policyId={PolicyUtils.WIDGET_CREATE}>
          <ModalForms getFormDetails={AddWidget} board={board}>
            <Button variant={'contained'} startIcon={<Add />}>
              Add Widget
            </Button>
          </ModalForms>
        </PolicyAllowed>
      </Stack>
      <BoardDetails board={board} />
    </PageContainer>
  )
}
