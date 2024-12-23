import React from 'react'
import {useSelector} from '../../../hooks'
import {PremisesOverview} from './components/PremisesOverview'
import {Stack} from '@mui/material'

export const AllPremises: React.FC = () => {
  const allPremises = useSelector(state => state.premises)
  return (
    <Stack direction={'row'} flexWrap={'wrap'} gap={{xs: 2, sm: 3, lg: 3, xl: 4}}>
      {allPremises.map(premises => (
        <PremisesOverview key={premises.premisesId} premises={premises} />
      ))}
    </Stack>
  )
}
