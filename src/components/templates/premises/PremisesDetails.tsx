import React from 'react'
import {Breadcrumbs, Button, PageContainer, PolicyAllowed} from '../../atoms'
import {Box, IconButton, Stack, Typography} from '@mui/material'
import {Config} from '../../../config'
import {ModalForms} from '../../organisms'
import {PolicyUtils} from '../../../utils/policyUtils'
import {Done, Edit} from '@mui/icons-material'
import {EditPremises} from '../../organisms/ModalForms/formFunctions/premises'
import {useDispatch, useSelector} from '../../../hooks'
import {usePremisesUserRole} from './hooks/usePremisesUserRole'
import {toggleEdit} from '../../../store/actions/premises'
import {PremisesView} from './PremisesView'
import type {ViewType} from '../../molecules'
import {MenuItems} from '../../molecules'
import {useRouter} from 'next/router'

export const PremisesDetails: React.FC = () => {
  const premises = useSelector(state => state.premises)!
  const address = premises.address
  const {isOwner} = usePremisesUserRole()
  const dispatch = useDispatch()
  const router = useRouter()

  const handleToggleEdit = () => {
    dispatch(toggleEdit())
  }

  return (
    <PageContainer pt={2}>
      <Stack mb={2} direction={'row'} justifyContent={'space-between'}>
        <Breadcrumbs
          links={[
            {link: Config.PREMISES_PAGE_PATH, name: 'Premises'},
            {link: Config.PREMISES_PAGE_PATH + `/${premises.premisesId}/zones`, name: premises.name}
          ]}
          text={MenuItems[router.query.views as ViewType]}
        />
        <PolicyAllowed policyId={PolicyUtils.PREMISES_CREATE} otherConditions={[isOwner]}>
          <Button
            variant={'contained'}
            startIcon={premises.enableEdit ? <Done /> : <Edit />}
            onClick={handleToggleEdit}
          >
            {premises.enableEdit ? 'Done' : 'Edit'}
          </Button>
        </PolicyAllowed>
      </Stack>
      <Box boxShadow={2} p={4} bgcolor={'background.paper'} borderRadius={1}>
        <Stack>
          <Stack>
            <Stack direction={'row'} spacing={1} alignItems={'flex-end'}>
              <Typography variant={'h4'}>{premises.name}</Typography>
              <PolicyAllowed policyId={PolicyUtils.PREMISES_UPDATE} otherConditions={[premises.enableEdit]}>
                <ModalForms getFormDetails={EditPremises} premises={premises}>
                  <IconButton color={'primary'}>
                    <Edit color={'primary'} />
                  </IconButton>
                </ModalForms>
              </PolicyAllowed>
            </Stack>
            <Typography>Premises Id: {premises.premisesId}</Typography>
          </Stack>
          <Typography>
            Location: {address.address1}, {address.address2}, {address.district}, {address.state} - {address.pincode}
          </Typography>
        </Stack>
        <PremisesView />
      </Box>
    </PageContainer>
  )
}
