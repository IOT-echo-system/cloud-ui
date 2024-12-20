import React from 'react'
import {Button, PageContainer, PolicyAllowed} from '../../atoms'
import {PolicyUtils} from '../../../utils/policyUtils'
import {ModalForms} from '../../organisms'
import {Add} from '@mui/icons-material'
import {Stack} from '@mui/material'
import {AddPremises} from '../../organisms/ModalForms/formFunctions'

export const Premises: React.FC = () => {
  return (
    <PageContainer pt={2} spacing={2}>
      <PolicyAllowed policyId={PolicyUtils.PREMISES_CREATE}>
        <Stack direction={'row'} justifyContent={'right'}>
          <ModalForms getFormDetails={AddPremises}>
            <Button variant={'contained'} startIcon={<Add />}>
              Add premises
            </Button>
          </ModalForms>
        </Stack>
      </PolicyAllowed>
    </PageContainer>
  )
}
