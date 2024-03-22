import React from 'react'
import {Breadcrumbs, Button, FormInput, Modal, PageContainer} from '../../atoms'
import {Stack, Typography} from '@mui/material'
import {Add} from '@mui/icons-material'
import {createBoard} from './createBoard'
import {useForm, useSelector} from '../../../hooks'
import {PolicyUtils} from '../../../utils/policyUtils'
import {BoardWithStatus} from '../../molecules/BoardWithStatus'

export const Boards: React.FC = () => {
  const {project, boards} = useSelector(state => state)
  const {values, onChange, onClear, handleSubmit} = useForm({name: ''})
  const {modalOpen, handleOpen, handleClose, loading, onSubmit} = createBoard(onClear)
  return (
    <PageContainer pt={2}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Breadcrumbs links={[]} text={'Boards'} />
        {PolicyUtils.isValid(project.policies, PolicyUtils.BOARD_CREATE) && (
          <Button startIcon={<Add />} variant={'contained'} onClick={handleOpen}>
            Create Board
          </Button>
        )}
      </Stack>

      <Stack direction={'row'} flexWrap={'wrap'}>
        {boards.map(board => (
          <BoardWithStatus key={board.boardId} board={board} />
        ))}
      </Stack>

      <Modal open={modalOpen} handleClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Typography variant={'h5'}>Create Board</Typography>
            <FormInput
              value={values.name}
              onChange={event => {
                onChange('name', event.target.value)
              }}
              required
              label={'BoardTemplate name'}
            />
            <Button type={'submit'} variant={'contained'} size={'large'} loading={loading}>
              Create
            </Button>
          </Stack>
        </form>
      </Modal>
    </PageContainer>
  )
}
