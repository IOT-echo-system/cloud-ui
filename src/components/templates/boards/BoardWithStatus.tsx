import {Box, Chip, Stack, Typography} from '@mui/material'
import React from 'react'
import {Link} from '../../atoms'
import {Config} from '../../../config'
import type {Board} from '../../../typing/board'

export type BoardWithDevicesPropsType = {board: Board}

export const BoardWithStatus: React.FC<BoardWithDevicesPropsType> = ({board}) => {
  return (
    <Box
      boxShadow={2}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 1,
        padding: {xs: 2, sm: 3, md: 4},
        marginTop: {xs: 2, sm: 3, md: 4},
        marginLeft: {xs: 1, sm: 1.5, md: 2},
        marginRight: {xs: 1, sm: 1.5, md: 2},
        width: {xs: '100%', md: 'calc(50% - 96px)', lg: 'calc(33% - 96px)', xl: 'calc(25% - 96px)'}
      }}
      component={Link}
      href={`${Config.BOARDS_PAGE_PATH}/${board.boardId}`}
      disableunderline={'true'}
    >
      <Stack spacing={{xs: 1, sm: 2}}>
        <Stack>
          <Typography variant={'h5'} component={'div'} mr={2}>
            {board.name}
          </Typography>
          <Typography>Board Id: {board.boardId}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} sx={{pointerEvents: 'none'}} flexWrap={'wrap'}>
          <Chip
            size={'small'}
            color={board.status === 'HEALTHY' ? 'success' : 'error'}
            label={board.status}
            sx={{paddingLeft: '12px', paddingRight: '12px'}}
          />
        </Stack>
      </Stack>
    </Box>
  )
}
