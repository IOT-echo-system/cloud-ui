import React from 'react'
import {Breadcrumbs, Button, PageContainer} from '../../atoms'
import {Stack} from '@mui/material'
import {Config} from '../../../config'
import type {Board as BoardType} from '../../../typing/board'
import {PolicyUtils} from '../../../utils/policyUtils'
import {useSelector} from '../../../hooks'
import {Add} from '@mui/icons-material'
import {BoardDetails} from '../../organisms'

type BoardPropsType = {board: BoardType}

export const BoardTemplate: React.FC<BoardPropsType> = ({board}) => {
  const {project} = useSelector(state => state)

  const handleOpen = () => {}

  return (
    <PageContainer pt={2} spacing={2}>
      <Stack direction={{xs: 'column', sm: 'row'}} justifyContent={{sm: 'space-between'}} spacing={{xs: 2}}>
        <Breadcrumbs links={[{link: Config.BOARDS_PAGE_PATH, name: 'Boards'}]} text={board.name} />
        {PolicyUtils.isValid(project.policies, PolicyUtils.DEVICE_CREATE) && (
          <Button startIcon={<Add />} variant={'contained'} onClick={handleOpen}>
            Add device
          </Button>
        )}
      </Stack>

      <BoardDetails board={board} />

      {/*<Modal open={modalOpen} handleClose={handleClose}>*/}
      {/*  <form onSubmit={handleSubmit(onSubmit)}>*/}
      {/*    <Stack spacing={2}>*/}
      {/*      <Typography variant={'h5'}>Create BoardTemplate</Typography>*/}
      {/*      <FormInput*/}
      {/*        value={values.name}*/}
      {/*        onChange={event => {*/}
      {/*          onChange('name', event.target.value)*/}
      {/*        }}*/}
      {/*        required*/}
      {/*        label={'BoardTemplate name'}*/}
      {/*      />*/}
      {/*      <Button type={'submit'} variant={'contained'} size={'large'} loading={loading}>*/}
      {/*        Create*/}
      {/*      </Button>*/}
      {/*    </Stack>*/}
      {/*  </form>*/}
      {/*</Modal>*/}
    </PageContainer>
  )
}
