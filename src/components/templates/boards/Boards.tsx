import React from 'react'
import {useSelector} from '../../../hooks'
import {Breadcrumbs, Button, PageContainer, PolicyAllowed} from '../../atoms'
import {Stack} from '@mui/material'
import {PolicyUtils} from '../../../utils/policyUtils'
import {ModalForms} from '../../organisms'
import {BoardWithStatus} from '../../molecules/BoardWithStatus'
import {Add} from '@mui/icons-material'
import {AddBoard} from '../../organisms/ModalForms/formFunctions'

export const Boards: React.FC = () => {
  const {boards} = useSelector(state => state)

  return (
    <PageContainer pt={2}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Breadcrumbs links={[]} text={'Boards'} />
        <PolicyAllowed policyId={PolicyUtils.BOARD_CREATE}>
          <ModalForms getFormDetails={AddBoard}>
            <Button variant={'contained'} startIcon={<Add />}>
              Create board
            </Button>
          </ModalForms>
        </PolicyAllowed>
      </Stack>

      <Stack direction={'row'} flexWrap={'wrap'}>
        {boards.map(board => (
          <BoardWithStatus key={board.boardId} board={board} />
        ))}
      </Stack>
    </PageContainer>
  )
}
