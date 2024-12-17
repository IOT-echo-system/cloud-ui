import React from 'react'
import {Link} from '../../atoms'
import type {Routine} from '../../../typing/routine'
import {Config} from '../../../config'
import {Box, Chip, Stack, Typography} from '@mui/material'

type BoardPropsType = {routine: Routine}

export const RoutineView: React.FC<BoardPropsType> = ({routine}) => {
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
      href={`${Config.ROUTINE_PAGE_PATH}/${routine.routineId}`}
      underline={'false'}
    >
      <Stack spacing={{xs: 1, sm: 2}}>
        <Typography variant={'body2'}>Routine Id: {routine.routineId}</Typography>
        <Stack>
          <Typography variant={'h5'} component={'div'}>
            {routine.name}
          </Typography>
          <Typography>{routine.description}</Typography>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} sx={{pointerEvents: 'none'}} flexWrap={'wrap'}>
          <Chip
            size={'small'}
            color={routine.enable ? 'success' : 'error'}
            label={routine.enable ? 'Active' : 'Inactive'}
            sx={{paddingLeft: '12px', paddingRight: '12px'}}
          />
        </Stack>
      </Stack>
    </Box>
  )
}
