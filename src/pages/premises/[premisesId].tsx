import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {Error, Loader} from '../../components/atoms'
import React, {useEffect, useState} from 'react'
import {PageAllowed} from '../../components/templates/PageAllowed'
import {PolicyUtils} from '../../utils/policyUtils'
import {PremisesDetails} from '../../components/templates/premises/PremisesDetails'
import type {Premises} from '../../typing/premises'
import {PremisesService} from '../../services'
import {useToast} from '../../hooks'

const BoardPage: NextPage = () => {
  const router = useRouter()
  const [premises, setPremises] = useState<Premises | null>(null)
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    setLoading(true)
    PremisesService.getPremisesDetails(router.query.premisesId as string)
      .then(setPremises)
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Loader page loadingText={'Loading...'} />
  }

  if (!premises) {
    return <Error page errorText={'Premises is not found!!'} />
  }
  return <PageAllowed Component={PremisesDetails} policy={PolicyUtils.PREMISES_READ} premises={premises} />
}

export default BoardPage
