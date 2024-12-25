import React from 'react'
import {Breadcrumbs, Button, PageContainer, PolicyAllowed} from '../../atoms'
import {Box, IconButton, Stack, Typography} from '@mui/material'
import {Config} from '../../../config'
import {ModalForms} from '../../organisms'
import {PolicyUtils} from '../../../utils/policyUtils'
import {Edit} from '@mui/icons-material'
import {AddZone, EditPremises} from '../../organisms/ModalForms/formFunctions/premises'
import {useSelector} from '../../../hooks'
import {AddBoard} from '../../organisms/ModalForms/formFunctions/boards'

export const PremisesDetails: React.FC = () => {
  const premises = useSelector(state => state.premises)!

  return (
    <PageContainer pt={2} spacing={2}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Breadcrumbs links={[{link: Config.PREMISES_PAGE_PATH, name: 'Premises'}]} text={premises.name} />
        <Stack direction={'row'} spacing={2}>
          <PolicyAllowed policyId={PolicyUtils.ZONE_CREATE}>
            <ModalForms getFormDetails={AddZone}>
              <Button variant={'contained'}>Add zone</Button>
            </ModalForms>
          </PolicyAllowed>
          <PolicyAllowed policyId={PolicyUtils.BOARD_CREATE}>
            <ModalForms getFormDetails={AddBoard}>
              <Button variant={'contained'}>Add board</Button>
            </ModalForms>
          </PolicyAllowed>
        </Stack>
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
