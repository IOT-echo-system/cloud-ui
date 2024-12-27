import {Fab, Stack} from '@mui/material'
import type {Board} from '../../typing/board'
import React from 'react'
import {PolicyUtils} from '../../utils/policyUtils'
import {Key} from '@mui/icons-material'
import {PolicyAllowed, WidgetsContainer} from '../atoms'
import {BoardSecretKey, CustomModal} from '../molecules'

type BoardDetailsPropsType = {board: Board}
export const BoardDetails: React.FC<BoardDetailsPropsType> = ({board}) => {
  return (
    <Stack>
      <Stack direction={{xs: 'column', sm: 'row'}} alignItems={'start'} justifyContent={'space-between'} spacing={2}>
        {/*<EditableTitleWithId*/}
        {/*  policyId={PolicyUtils.BOARD_UPDATE}*/}
        {/*  getFormDetails={EditBoardName}*/}
        {/*  board={board}*/}
        {/*  title={board.name}*/}
        {/*  id={board.boardId}*/}
        {/*  idLabel={'Board Id'}*/}
        {/*/>*/}
        <Stack direction={{xs: 'row-reverse', sm: 'row'}} spacing={2} alignItems={'center'}>
          <PolicyAllowed policyId={PolicyUtils.DEVICE_UPDATE}>
            <CustomModal
              ClickableComponent={
                <Fab color={'primary'} size={'small'}>
                  <Key />
                </Fab>
              }
            >
              <BoardSecretKey board={board} />
            </CustomModal>
          </PolicyAllowed>
          {/*<Chip*/}
          {/*  label={board.status}*/}
          {/*  color={board.status === 'HEALTHY' ? 'success' : 'error'}*/}
          {/*  sx={{padding: {xs: '0', md: '8px 32px'}}}*/}
          {/*/>*/}
        </Stack>
      </Stack>
      <WidgetsContainer></WidgetsContainer>
    </Stack>
  )
}
