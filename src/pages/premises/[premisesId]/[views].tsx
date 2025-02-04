import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {Error, Loader} from '../../../components/atoms'
import React, {useEffect, useState} from 'react'
import {PageAllowed} from '../../../components/templates/PageAllowed'
import {PolicyUtils} from '../../../utils/policyUtils'
import {PremisesDetails} from '../../../components/templates/premises/PremisesDetails'
import {PremisesService} from '../../../services'
import {useDispatch, useSelector, useToast} from '../../../hooks'
import {setPremises, unsetPremises} from '../../../store/actions/premises'
import {setStorage, StorageKeys} from '../../../utils/storage'

const PremisesPage: NextPage = () => {
  const router = useRouter()
  const premisesId = router.query.premisesId as string
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  const premises = useSelector(state => state.premises)

  useEffect(() => {
    if (premisesId && premisesId !== premises?.premisesId) {
      dispatch(unsetPremises())
    }

    if (premisesId) {
      setStorage(StorageKeys.PREMISES_ID, {premisesId: router.query.premisesId})
      setLoading(true)
      PremisesService.getPremisesDetails(premisesId)
        .then(premises => {
          dispatch(setPremises({...premises, enableEdit: false}))
        })
        .catch(toast.error)
        .finally(() => {
          setLoading(false)
        })
    }
  }, [premisesId])

  if (loading && !premisesId) {
    return <Loader page loadingText={'Loading...'} />
  }

  if (!premises) {
    return <Error page errorText={'Premises is not found!!'} />
  }

  return <PageAllowed Component={PremisesDetails} policy={PolicyUtils.PREMISES_READ} />
}

export default PremisesPage
