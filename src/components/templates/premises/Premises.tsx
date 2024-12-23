import React, {useEffect, useState} from 'react'
import {Breadcrumbs, Button, Loader, PageContainer, PolicyAllowed} from '../../atoms'
import {PolicyUtils} from '../../../utils/policyUtils'
import {ModalForms} from '../../organisms'
import {Stack} from '@mui/material'
import {AllPremises} from './AllPremises'
import {PremisesService} from '../../../services'
import {useDispatch} from '../../../hooks'
import {setPremises} from '../../../store/actions/premises'
import {AddPremises} from '../../organisms/ModalForms/formFunctions/premises'

export const Premises: React.FC = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    PremisesService.getPremises()
      .then(allPremises => {
        dispatch(setPremises(allPremises))
      })
      .catch()
      .finally(() => {
        setLoading(false)
      })
  }, [])

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
      {loading ? <Loader page loadingText={'Loading'} /> : <AllPremises />}
    </PageContainer>
  )
}
