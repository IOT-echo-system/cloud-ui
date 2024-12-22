import React from 'react'
import {Breadcrumbs, Button, PageContainer, PolicyAllowed} from '../../atoms'
import {PolicyUtils} from '../../../utils/policyUtils'
import {ModalForms} from '../../organisms'
import {Stack} from '@mui/material'
import {AddPremises} from '../../organisms/ModalForms/formFunctions'
import {AllPremises} from './AllPremises'

export const Premises: React.FC = () => {
  return (
    <PageContainer pt={2} spacing={2}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Breadcrumbs links={[]} text={'Premises'} />
        <PolicyAllowed policyId={PolicyUtils.PREMISES_CREATE}>
          <ModalForms getFormDetails={AddPremises}>
            <Button variant={'contained'}>Add premises</Button>
          </ModalForms>
        </PolicyAllowed>
      </Stack>
      <AllPremises />
    </PageContainer>
  )
}
