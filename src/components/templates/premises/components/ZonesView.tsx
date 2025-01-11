import React from 'react'
import {Box, IconButton, Stack, Typography} from '@mui/material'
import {useSelector, useZones} from '../../../../hooks'
import {Button, PolicyAllowed} from '../../../atoms'
import {ModalForms} from '../../../organisms'
import {PolicyUtils} from '../../../../utils/policyUtils'
import {AddZone, UpdateZoneName} from '../../../organisms/ModalForms/formFunctions/premises'
import {Edit} from '@mui/icons-material'

export const ZonesView: React.FC = () => {
  const {zones} = useZones()
  const premises = useSelector(state => state.premises!)

  return (
    <Stack mt={2} gap={2}>
      <Stack direction={'row'} justifyContent={'end'} gap={2}>
        <PolicyAllowed policyId={PolicyUtils.ZONE_CREATE} otherConditions={[premises.enableEdit]}>
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
              <Stack gap={2} direction={'row'} alignItems={'baseline'}>
                <Typography variant={'h5'}>{zone.name}</Typography>
                <PolicyAllowed policyId={PolicyUtils.ZONE_UPDATE} otherConditions={[premises.enableEdit]}>
                  <ModalForms getFormDetails={UpdateZoneName} zone={zone}>
                    <IconButton color={'primary'}>
                      <Edit />
                    </IconButton>
                  </ModalForms>
                </PolicyAllowed>
              </Stack>
              <Typography variant={'body2'}>Zone Id: {zone.zoneId} </Typography>
            </Box>
          )
        })}
      </Stack>
    </Stack>
  )
}
