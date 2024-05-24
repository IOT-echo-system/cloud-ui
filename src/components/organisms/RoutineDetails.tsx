import {Chip, Stack, Typography} from '@mui/material'
import type {Routine} from '../../typing/routine'
import React from 'react'
import {EditRoutineName} from './ModalForms/formFunctions'
import {BoxContainer, EditableTitleWithId} from '../atoms'
import {PolicyUtils} from '../../utils/policyUtils'

type RoutineDetailsPropsType = {routine: Routine}
export const RoutineDetails: React.FC<RoutineDetailsPropsType> = ({routine}) => {
  return (
    <Stack>
      <Stack direction={{xs: 'column', sm: 'row'}} alignItems={'start'} justifyContent={'space-between'} spacing={2}>
        <EditableTitleWithId
          policyId={PolicyUtils.ROUTINE_UPDATE}
          getFormDetails={EditRoutineName}
          routine={routine}
          title={routine.name}
          id={routine.routineId}
          idLabel={'Routine Id'}
        />
        <Stack direction={{xs: 'row-reverse', sm: 'row'}} spacing={2} alignItems={'center'}>
          <Chip
            label={routine.enable ? 'Active' : 'Inactive'}
            color={routine.enable ? 'success' : 'error'}
            sx={{padding: {xs: '0', md: '8px 32px'}}}
          />
        </Stack>
      </Stack>
      <BoxContainer>
        <Typography>Name</Typography>
      </BoxContainer>
    </Stack>
  )
}
