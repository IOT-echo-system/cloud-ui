import React, {useEffect, useState} from 'react'
import {Box, IconButton, Stack, Typography} from '@mui/material'
import {Button, Loader, PolicyAllowed} from '../../../atoms'
import {PolicyUtils} from '../../../../utils/policyUtils'
import {ModalForms} from '../../../organisms'
import {AddBoard, UpdateBoardName} from '../../../organisms/ModalForms/formFunctions/premises'
import {useBoards, useDispatch, useSelector, useToast} from '../../../../hooks'
import {Edit} from '@mui/icons-material'
import {BoardService} from '../../../../services'
import {updateBoards} from '../../../../store/actions/boards'

export const BoardsView: React.FC = () => {
  const {boards} = useBoards()
  const premises = useSelector(state => state.premises!)
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    setLoading(true)
    BoardService.getBoards()
      .then(boards => {
        dispatch(updateBoards(boards))
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading && boards.isEmpty()) {
    return <Loader loadingText={'Loading'} mt={4} />
  }

  return (
    <Stack mt={2} gap={2}>
      <Stack direction={'row'} justifyContent={'end'} gap={2}>
        <PolicyAllowed policyId={PolicyUtils.BOARD_CREATE} otherConditions={[premises.enableEdit]}>
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
              <Stack gap={2} direction={'row'} alignItems={'baseline'}>
                <Typography variant={'h5'}>{board.name}</Typography>
                <PolicyAllowed policyId={PolicyUtils.BOARD_UPDATE} otherConditions={[premises.enableEdit]}>
                  <ModalForms getFormDetails={UpdateBoardName} board={board}>
                    <IconButton color={'primary'}>
                      <Edit />
                    </IconButton>
                  </ModalForms>
                </PolicyAllowed>
              </Stack>
              <Typography variant={'body2'}>Board Id: {board.boardId}</Typography>
              <Typography>Board type: {board.type}</Typography>
            </Box>
          )
        })}
      </Stack>
    </Stack>
  )
}
