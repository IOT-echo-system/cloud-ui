import React from 'react'
import {Breadcrumbs, PageContainer} from '../../atoms'
import {Stack} from '@mui/material'
import {Config} from '../../../config'
import type {Routine as RoutineType} from '../../../typing/routine'
import {RoutineDetails} from '../../organisms'

type RoutinePropsType = {routine: RoutineType}

export const Routine: React.FC<RoutinePropsType> = ({routine}) => {
  return (
    <PageContainer pt={2} spacing={2}>
      <Stack direction={{xs: 'column', sm: 'row'}} justifyContent={{sm: 'space-between'}} spacing={{xs: 2}}>
        <Breadcrumbs links={[{link: Config.ROUTINE_PAGE_PATH, name: 'Routines'}]} text={routine.name} />
      </Stack>
      <RoutineDetails routine={routine} />
    </PageContainer>
  )
}
