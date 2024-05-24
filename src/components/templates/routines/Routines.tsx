import React from 'react'
import {Breadcrumbs, Button, PageContainer, PolicyAllowed} from '../../atoms'
import {Stack} from '@mui/material'
import {PolicyUtils} from '../../../utils/policyUtils'
import {ModalForms} from '../../organisms'
import {Add} from '@mui/icons-material'
import {AddRoutine} from '../../organisms/ModalForms/formFunctions'
import {useSelector} from '../../../hooks'
import {RoutineView} from './RoutineView'

export const Routines: React.FC = () => {
  const {routines} = useSelector(state => state)

  return (
    <PageContainer pt={2}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Breadcrumbs links={[]} text={'Routines'} />
        <PolicyAllowed policyId={PolicyUtils.ROUTINE_CREATE}>
          <ModalForms getFormDetails={AddRoutine}>
            <Button variant={'contained'} startIcon={<Add />}>
              Create Routine
            </Button>
          </ModalForms>
        </PolicyAllowed>
      </Stack>

      <Stack direction={'row'} flexWrap={'wrap'}>
        {routines.map(routine => (
          <RoutineView key={routine.routineId} routine={routine} />
        ))}
      </Stack>
    </PageContainer>
  )
}
