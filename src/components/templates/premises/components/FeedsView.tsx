import React from 'react'
import {Stack} from '@mui/material'
import {Button, PolicyAllowed} from '../../../atoms'
import {PolicyUtils} from '../../../../utils/policyUtils'
import {ModalForms} from '../../../organisms'
import {AddFeed} from '../../../organisms/ModalForms/formFunctions/boards'
import {useSelector} from '../../../../hooks'

export const FeedsView: React.FC = () => {
  const premises = useSelector(state => state.premises!)
  return (
    <Stack mt={2} gap={2}>
      <Stack direction={'row'} justifyContent={'end'} gap={2}>
        <PolicyAllowed policyId={PolicyUtils.DEVICE_CREATE} otherConditions={[premises.enableEdit]}>
          <ModalForms getFormDetails={AddFeed}>
            <Button variant={'contained'}>Add feed</Button>
          </ModalForms>
        </PolicyAllowed>
      </Stack>
      <Stack direction={'row'} flexWrap={'wrap'} gap={2}></Stack>
    </Stack>
  )
}
