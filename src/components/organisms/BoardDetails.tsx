import {Chip, IconButton, Stack, Typography} from '@mui/material'
import type {Board} from '../../typing/board'
import React from 'react'
import {PolicyUtils} from '../../utils/policyUtils'
import {useSelector} from '../../hooks'
import {Edit} from '@mui/icons-material'
import {ModalForms} from './ModalForms/ModalForms'
import {EditBoardName} from './ModalForms/formFunctions'
import {widgetsMap} from './widgets'
import {WidgetsContainer} from '../atoms'

type BoardDetailsPropsType = {board: Board}
export const BoardDetails: React.FC<BoardDetailsPropsType> = ({board}) => {
  const {policies} = useSelector(state => state.project)

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
          {PolicyUtils.isValid(policies, PolicyUtils.BOARD_UPDATE) && (
            <ModalForms getFormDetails={EditBoardName} board={board}>
              <IconButton color={'primary'}>
                <Edit />
              </IconButton>
            </ModalForms>
          )}
        </Stack>
        <Chip
          label={board.status}
          color={board.status === 'HEALTHY' ? 'success' : 'error'}
          sx={{padding: {xs: '0', md: '8px 32px'}}}
        />
      </Stack>
      <WidgetsContainer>
        {board.widgets.map(widget => {
          const Component = widgetsMap[widget.widgetType]
          return <Component widget={widget} key={widget.widgetId} />
        })}
      </WidgetsContainer>
    </Stack>
  )
}
