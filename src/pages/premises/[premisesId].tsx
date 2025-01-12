import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {Error, Loader} from '../../components/atoms'
import React, {useEffect, useState} from 'react'
import {PageAllowed} from '../../components/templates/PageAllowed'
import {PolicyUtils} from '../../utils/policyUtils'
import {PremisesDetails} from '../../components/templates/premises/PremisesDetails'
import {PremisesService} from '../../services'
import {useDispatch, useSelector, useToast} from '../../hooks'
import {setPremises, unsetPremises} from '../../store/actions/premises'
import {updateZones} from '../../store/actions/zones'
import {updateBoards} from '../../store/actions/boards'
import {setStorage, StorageKeys} from '../../utils/storage'

const PremisesPage: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const toast = useToast()
  const dispatch = useDispatch()
  const premises = useSelector(state => state.premises)

  useEffect(() => {
    setLoading(true)
    dispatch(unsetPremises())
    if (router.query.premisesId) {
      setStorage(StorageKeys.PREMISES_ID, {premisesId: router.query.premisesId})
      PremisesService.getPremisesDetails(router.query.premisesId as string)
        .then(premises => {
          const {zones, boards, ...rest} = premises
          dispatch(setPremises(rest))
          dispatch(updateZones(zones))
          dispatch(updateBoards(boards))
        })
        .catch(toast.error)
        .finally(() => {
          setLoading(false)
        })
    }
  }, [router.query.premisesId])

  if (loading) {
    return <Loader page loadingText={'Loading...'} />
  }

  if (!premises) {
    return <Error page errorText={'Premises is not found!!'} />
  }
  return <PageAllowed Component={PremisesDetails} policy={PolicyUtils.PREMISES_READ} />
}

export default PremisesPage
