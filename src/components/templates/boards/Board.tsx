import React from 'react'
import {Breadcrumbs, PageContainer} from '../../atoms'
import {Stack} from '@mui/material'
import {Config} from '../../../config'
import type {Board as BoardType} from '../../../typing/board'

type BoardPropsType = {board: BoardType}

export const Board: React.FC<BoardPropsType> = ({board}) => {
  return (
    <PageContainer pt={2}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Breadcrumbs links={[{link: Config.BOARDS_PAGE_PATH, name: 'Boards'}]} text={board.name} />
        {/*{PolicyUtils.isValid(project.policies, PolicyUtils.BOARD_CREATE) && (*/}
        {/*  <Button startIcon={<Add />} variant={'contained'} onClick={handleOpen}>*/}
        {/*    Create Board*/}
        {/*  </Button>*/}
        {/*)}*/}
      </Stack>

      {/*<Modal open={modalOpen} handleClose={handleClose}>*/}
      {/*  <form onSubmit={handleSubmit(onSubmit)}>*/}
      {/*    <Stack spacing={2}>*/}
      {/*      <Typography variant={'h5'}>Create Board</Typography>*/}
      {/*      <FormInput*/}
      {/*        value={values.name}*/}
      {/*        onChange={event => {*/}
      {/*          onChange('name', event.target.value)*/}
      {/*        }}*/}
      {/*        required*/}
      {/*        label={'Board name'}*/}
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
