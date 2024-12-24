import React from 'react'
import {PremisesOverview} from './components/PremisesOverview'
import {Stack} from '@mui/material'
import type {Premises} from '../../../typing/premises'

export const AllPremises: React.FC<{allPremises: Premises[]}> = ({allPremises}) => {
  return (
    <Stack direction={'row'} flexWrap={'wrap'} gap={{xs: 2, sm: 3, lg: 3, xl: 4}}>
      {allPremises.map(premises => (
        <PremisesOverview key={premises.premisesId} premises={premises} />
      ))}
    </Stack>
  )
}
