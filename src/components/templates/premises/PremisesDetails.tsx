import React from 'react'
import {Breadcrumbs, PageContainer, PolicyAllowed} from '../../atoms'
import {Box, IconButton, Stack, Typography} from '@mui/material'
import type {Premises} from '../../../typing/premises'
import {Config} from '../../../config'
import {ModalForms} from '../../organisms'
import {PolicyUtils} from '../../../utils/policyUtils'
import {Edit} from '@mui/icons-material'
import {EditPremises} from '../../organisms/ModalForms/formFunctions/premises'

export const PremisesDetails: React.FC<{premises: Premises}> = ({premises}) => {
  return (
    <PageContainer pt={2} spacing={2}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Breadcrumbs links={[{link: Config.PREMISES_PAGE_PATH, name: 'Premises'}]} text={premises.name} />
      </Stack>
      <Box boxShadow={2} bgcolor={'background.paper'} p={4} borderRadius={1}>
        <Stack direction={'row'} gap={2} alignItems={'baseline'}>
          <Typography variant={'h5'}>{premises.name}</Typography>
          <Typography variant={'body1'}>Premises Id: {premises.premisesId}</Typography>
          <PolicyAllowed policyId={PolicyUtils.PREMISES_UPDATE}>
            <ModalForms getFormDetails={EditPremises} premises={premises}>
              <IconButton color={'primary'}>
                <Edit color={'primary'} />
              </IconButton>
            </ModalForms>
          </PolicyAllowed>
        </Stack>
        <Typography>
          Location: {premises.address.address1}, {premises.address.address2}, {premises.address.city}
        </Typography>
        <Typography>
          {premises.address.district}, {premises.address.state} - {premises.address.zipCode}
        </Typography>
      </Box>
    </PageContainer>
  )
}