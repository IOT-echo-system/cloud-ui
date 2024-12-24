import React, {useEffect, useState} from 'react'
import {Breadcrumbs, Button, Loader, PageContainer, PolicyAllowed} from '../../atoms'
import {PolicyUtils} from '../../../utils/policyUtils'
import {ModalForms} from '../../organisms'
import {Stack} from '@mui/material'
import {AllPremises} from './AllPremises'
import {PremisesService} from '../../../services'
import {AddPremises} from '../../organisms/ModalForms/formFunctions/premises'
import type {Premises as PremisesType} from '../../../typing/premises'

export const Premises: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [allPremises, setAllPremises] = useState<PremisesType[]>([])

  const addPremises = (premises: PremisesType) => {
    setAllPremises([premises, ...allPremises])
  }

  useEffect(() => {
    PremisesService.getPremises()
      .then(setAllPremises)
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
          <ModalForms getFormDetails={AddPremises} addPremises={addPremises}>
            <Button variant={'contained'}>Add premises</Button>
          </ModalForms>
        </PolicyAllowed>
      </Stack>
      {loading ? <Loader page loadingText={'Loading'} /> : <AllPremises allPremises={allPremises} />}
    </PageContainer>
  )
}
