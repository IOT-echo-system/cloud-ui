import React from 'react'
import {Box, Stack, Typography} from '@mui/material'
import {Button, PolicyAllowed} from '../../../atoms'
import {PolicyUtils} from '../../../../utils/policyUtils'
import {ModalForms} from '../../../organisms'
import {AddBoard} from '../../../organisms/ModalForms/formFunctions/boards'
import {useBoards} from '../../../../hooks'

export const BoardsView: React.FC = () => {
  const {boards} = useBoards()

  return (
    <Stack mt={2} gap={2}>
      <Stack direction={'row'} justifyContent={'end'}>
        <PolicyAllowed policyId={PolicyUtils.DEVICE_CREATE}>
          <ModalForms getFormDetails={AddBoard}>
            <Button variant={'contained'}>Add board</Button>
          </ModalForms>
        </PolicyAllowed>
      </Stack>
      <Stack direction={'row'} flexWrap={'wrap'} gap={2}>
        {boards.map(board => {
          return (
            <Box
              key={board.boardId}
              border={1}
              borderColor={'action.disabled'}
              sx={{
                borderRadius: 1,
                padding: {xs: 1, sm: 1.5, md: 2},
                width: {xs: '100%', md: 'calc(50% - 42px)', lg: 'calc(33% - 42px)', xl: 'calc(25% - 46px)'},
                '&:hover': {color: 'inherit'}
              }}
            >
              <Typography>{board.name}</Typography>
              <Typography variant={'body2'}>Board Id: {board.boardId}</Typography>
              <Typography variant={'body2'}>Board type: {board.type}</Typography>
            </Box>
          )
        })}
      </Stack>
    </Stack>
  )
}
