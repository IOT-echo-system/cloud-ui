import {Chip, Fab, IconButton, Stack, Typography} from '@mui/material'
import type {Board} from '../../typing/board'
import React from 'react'
import {PolicyUtils} from '../../utils/policyUtils'
import {Edit, Key} from '@mui/icons-material'
import {ModalForms} from './ModalForms/ModalForms'
import {EditBoardName} from './ModalForms/formFunctions'
import type {WidgetPropsType, WidgetType} from './widgets'
import {widgetsMap} from './widgets'
import {PolicyAllowed, WidgetsContainer} from '../atoms'
import {BoardSecretKey, CustomModal} from '../molecules'

type BoardDetailsPropsType = {board: Board}
export const BoardDetails: React.FC<BoardDetailsPropsType> = ({board}) => {
  return (
    <Stack>
      <Stack direction={{xs: 'column', sm: 'row'}} alignItems={'start'} justifyContent={'space-between'} spacing={2}>
        <Stack direction={'row'} alignItems={'start'} spacing={2}>
          <Stack>
            <Typography component={'div'} variant={'h4'}>
              {board.name}
            </Typography>
            <Typography>Board Id: {board.boardId}</Typography>
          </Stack>
          <PolicyAllowed policyId={PolicyUtils.BOARD_UPDATE}>
            <ModalForms getFormDetails={EditBoardName} board={board}>
              <IconButton color={'primary'}>
                <Edit />
              </IconButton>
            </ModalForms>
          </PolicyAllowed>
        </Stack>
        <Stack direction={{xs: 'row-reverse', sm: 'row'}} spacing={2} alignItems={'center'}>
          <PolicyAllowed policyId={PolicyUtils.BOARD_UPDATE}>
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
          <Chip
            label={board.status}
            color={board.status === 'HEALTHY' ? 'success' : 'error'}
            sx={{padding: {xs: '0', md: '8px 32px'}}}
          />
        </Stack>
      </Stack>
      <WidgetsContainer>
        {board.widgets.map(widget => {
          const Component = widgetsMap[widget.widgetType as WidgetType] as React.FC<
            WidgetPropsType<typeof widget.widgetType>
          >
          return <Component widget={widget} key={widget.widgetId} />
        })}
      </WidgetsContainer>
    </Stack>
  )
}
