import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import {Error, Loader} from '../../components/atoms'
import React, {useEffect, useState} from 'react'
import {PageAllowed} from '../../components/templates/PageAllowed'
import {PolicyUtils} from '../../utils/policyUtils'
import {PremisesDetails} from '../../components/templates/premises/PremisesDetails'
import {BoardService, FeedService, PremisesService, WidgetService} from '../../services'
import {useDispatch, useSelector, useToast} from '../../hooks'
import {setPremises, unsetPremises} from '../../store/actions/premises'
import {setStorage, StorageKeys} from '../../utils/storage'
import {ZoneService} from '../../services/zoneService'
import {updateZones} from '../../store/actions/zones'
import {updateBoards} from '../../store/actions/boards'
import type {ServerError} from '../../typing/error'
import {updateFeeds} from '../../store/actions/feeds'
import {updateWidgets} from '../../store/actions/widgets'

const PremisesPage: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const toast = useToast()
  const dispatch = useDispatch()
  const premises = useSelector(state => state.premises)

  useEffect(() => {
    setLoading(true)
    dispatch(unsetPremises())
    const fetchData = async () => {
      try {
        const [premises, zones, boards, feeds, widgets] = await Promise.all([
          PremisesService.getPremisesDetails(router.query.premisesId as string),
          ZoneService.getZones(),
          BoardService.getBoards(),
          FeedService.getFeeds(),
          WidgetService.getWidgets()
        ])
        dispatch(setPremises({...premises, enableEdit: false}))
        dispatch(updateZones(zones))
        dispatch(updateBoards(boards))
        dispatch(updateFeeds(feeds))
        dispatch(updateWidgets(widgets))
      } catch (error) {
        toast.error(error as ServerError)
      } finally {
        setLoading(false)
      }
    }

    if (router.query.premisesId) {
      setStorage(StorageKeys.PREMISES_ID, {premisesId: router.query.premisesId})
      fetchData()
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
