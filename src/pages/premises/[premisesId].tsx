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

const BoardPage: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const toast = useToast()
  const dispatch = useDispatch()
  const premises = useSelector(state => state.premises)

  useEffect(() => {
    setLoading(true)
    dispatch(unsetPremises())
    if (router.query.premisesId) {
      PremisesService.getPremisesDetails(router.query.premisesId as string)
        .then(premises => {
          dispatch(setPremises(premises))
        })
        .catch(toast.error)
        .finally(() => {
          setLoading(false)
        })
    }
  }, [])

  if (loading) {
    return <Loader page loadingText={'Loading...'} />
  }

  if (!premises) {
    return <Error page errorText={'Premises is not found!!'} />
  }
  return <PageAllowed Component={PremisesDetails} policy={PolicyUtils.PREMISES_READ} />
}

export default BoardPage
