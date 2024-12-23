import React from 'react'
import {Link} from '../../../atoms'
import type {Premises} from '../../../../typing/premises'
import {Config} from '../../../../config'
import {Box, Typography} from '@mui/material'

export const PremisesOverview: React.FC<{premises: Premises}> = ({premises}) => {
  return (
    <Box
      boxShadow={2}
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 1,
        padding: {xs: 2, sm: 3, md: 4},
        width: {xs: '100%', md: 'calc(50% - 76px)', lg: 'calc(33% - 77px)', xl: 'calc(25% - 88px)'},
        '&:hover': {color: 'inherit'}
      }}
      underline={'false'}
      component={Link}
      href={`${Config.PREMISES_PAGE_PATH}/${premises.premisesId}`}
    >
      <Typography>Name: {premises.name}</Typography>
      <Typography variant={'body2'}>Premises Id: {premises.premisesId}</Typography>
      <Typography>
        Location: {premises.address.address1}, {premises.address.address2}, {premises.address.city}
      </Typography>
      <Typography>
        {premises.address.district}, {premises.address.state} - {premises.address.zipCode}
      </Typography>
    </Box>
  )
}
