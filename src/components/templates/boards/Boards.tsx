import React from 'react'
import {useSelector} from '../../../hooks'
import {Breadcrumbs, PageContainer} from '../../atoms'
import {Stack} from '@mui/material'
import {BoardWithStatus} from './BoardWithStatus'

export const Boards: React.FC = () => {
  const {boards} = useSelector(state => state)

  return (
    <PageContainer pt={2}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Breadcrumbs links={[]} text={'Boards'} />
        {/*<PolicyAllowed policyId={PolicyUtils.BOARD_CREATE}>*/}
        {/*  <ModalForms getFormDetails={AddBoard}>*/}
        {/*    <Button variant={'contained'} startIcon={<Add />}>*/}
        {/*      Create board*/}
        {/*    </Button>*/}
        {/*  </ModalForms>*/}
        {/*</PolicyAllowed>*/}
      </Stack>

      <Stack direction={'row'} flexWrap={'wrap'}>
        {boards.map(board => (
          <BoardWithStatus key={board.boardId} board={board} />
        ))}
      </Stack>
    </PageContainer>
  )
}
