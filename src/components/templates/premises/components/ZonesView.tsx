import React, {useEffect, useState} from 'react'
import {Box, IconButton, Stack, Typography} from '@mui/material'
import {useDispatch, useSelector, useToast, useZones} from '../../../../hooks'
import {Button, Loader, PolicyAllowed} from '../../../atoms'
import {ModalForms} from '../../../organisms'
import {PolicyUtils} from '../../../../utils/policyUtils'
import {AddWidget, AddZone, UpdateZoneName} from '../../../organisms/ModalForms/formFunctions/premises'
import {Edit} from '@mui/icons-material'
import {Widgets} from './Widgets'
import {FeedService, WidgetService, ZoneService} from '../../../../services'
import {updateWidgets} from '../../../../store/actions/widgets'
import {updateFeeds} from '../../../../store/actions/feeds'
import type {ServerError} from '../../../../typing/error'
import '../../../../utils/extenstions'
import {updateZones} from '../../../../store/actions/zones'

export const ZonesView: React.FC = () => {
  const {zones} = useZones()
  const premises = useSelector(state => state.premises!)
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()
  const toast = useToast()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [zones, widgets, feeds] = await Promise.all([
          ZoneService.getZones(),
          WidgetService.getWidgets(),
          FeedService.getFeeds()
        ])
        dispatch(updateZones(zones))
        dispatch(updateWidgets(widgets))
        dispatch(updateFeeds(feeds))
      } catch (error) {
        toast.error(error as ServerError)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading && zones.isEmpty()) {
    return <Loader loadingText={'Loading'} mt={4} />
  }

  return (
    <Stack mt={2} gap={2}>
      <Stack direction={'row'} justifyContent={'end'} gap={2}>
        <PolicyAllowed policyId={PolicyUtils.ZONE_CREATE} otherConditions={[premises.enableEdit]}>
          <ModalForms getFormDetails={AddZone}>
            <Button variant={'contained'}>Add zone</Button>
          </ModalForms>
        </PolicyAllowed>
      </Stack>
      <Stack direction={'row'} flexWrap={'wrap'} gap={2}>
        {zones.map(zone => {
          return (
            <Box
              key={zone.zoneId}
              border={1}
              borderColor={'action.disabled'}
              sx={{
                borderRadius: 1,
                padding: {xs: 1, sm: 1.5, md: 2},
                width: {xs: '100%', md: 'calc(50% - 42px)', lg: 'calc(33% - 42px)', xl: 'calc(25% - 46px)'},
                '&:hover': {color: 'inherit'}
              }}
            >
              <Stack gap={2} direction={'row'} alignItems={'baseline'}>
                <Typography variant={'h5'}>{zone.name}</Typography>
                <PolicyAllowed policyId={PolicyUtils.ZONE_UPDATE} otherConditions={[premises.enableEdit]}>
                  <ModalForms getFormDetails={UpdateZoneName} zone={zone}>
                    <IconButton color={'primary'}>
                      <Edit />
                    </IconButton>
                  </ModalForms>
                </PolicyAllowed>
              </Stack>
              <Typography variant={'body2'}>Zone Id: {zone.zoneId} </Typography>
              <Widgets widgetIds={zone.widgets} />
              <PolicyAllowed policyId={PolicyUtils.WIDGET_CREATE} otherConditions={[premises.enableEdit]}>
                <ModalForms getFormDetails={AddWidget} zoneId={zone.zoneId}>
                  <Stack direction={'row'} mt={1}>
                    <Button variant={'contained'} color={'secondary'}>
                      Add widget
                    </Button>
                  </Stack>
                </ModalForms>
              </PolicyAllowed>
            </Box>
          )
        })}
      </Stack>
    </Stack>
  )
}
