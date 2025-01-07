import React from 'react'
import {Box, Stack, Typography} from '@mui/material'
import {useZones} from '../../../../hooks'
import {Button, PolicyAllowed} from '../../../atoms'
import {ModalForms} from '../../../organisms'
import {PolicyUtils} from '../../../../utils/policyUtils'
import {AddZone} from '../../../organisms/ModalForms/formFunctions/premises'

export const ZonesView: React.FC = () => {
  const {zones} = useZones()

  return (
    <Stack mt={2} gap={2}>
      <Stack direction={'row'} justifyContent={'end'}>
        <PolicyAllowed policyId={PolicyUtils.ZONE_CREATE}>
          <ModalForms getFormDetails={AddZone}>
            <Button variant={'contained'}>Add zone</Button>
          </ModalForms>
        </PolicyAllowed>
      </Stack>
      <Stack direction={'row'} flexWrap={'wrap'} gap={2}>
        {zones.map(zone => {
          return (
            <Box
              key={zone.zoneId}
              border={1}
              borderColor={'action.disabled'}
              sx={{
                borderRadius: 1,
                padding: {xs: 1, sm: 1.5, md: 2},
                width: {xs: '100%', md: 'calc(50% - 42px)', lg: 'calc(33% - 42px)', xl: 'calc(25% - 46px)'},
                '&:hover': {color: 'inherit'}
              }}
            >
              <Typography>{zone.name}</Typography>
              <Typography variant={'body2'}>Zone Id: {zone.zoneId} </Typography>
            </Box>
          )
        })}
      </Stack>
    </Stack>
  )
}
