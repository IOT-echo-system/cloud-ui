import React from 'react'
import {useSelector} from '../../../hooks'
import {Breadcrumbs, Button, PageContainer} from '../../atoms'
import {Stack} from '@mui/material'
import {Config} from '../../../config'
import {PolicyUtils} from '../../../utils/policyUtils'
import {BoardDetails, ModalForms} from '../../organisms'
import type {Board as BoardType} from '../../../typing/board'
import {Add} from '@mui/icons-material'
import {AddDevice} from '../../organisms/ModalForms/formFunctions'

type BoardPropsType = {board: BoardType}

export const Board: React.FC<BoardPropsType> = ({board}) => {
  const {project} = useSelector(state => state)
  return (
    <PageContainer pt={2} spacing={2}>
      <Stack direction={{xs: 'column', sm: 'row'}} justifyContent={{sm: 'space-between'}} spacing={{xs: 2}}>
        <Breadcrumbs links={[{link: Config.BOARDS_PAGE_PATH, name: 'Boards'}]} text={board.name} />
        {PolicyUtils.isValid(project.policies, PolicyUtils.DEVICE_CREATE) && (
          <ModalForms getFormDetails={AddDevice}>
            <Button variant={'contained'} startIcon={<Add />}>
              Add device
            </Button>
          </ModalForms>
        )}
      </Stack>

      <BoardDetails board={board} />
    </PageContainer>
  )
}
