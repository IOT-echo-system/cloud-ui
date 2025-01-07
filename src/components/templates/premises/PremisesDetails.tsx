import React, {useEffect, useState} from 'react'
import {Breadcrumbs, PageContainer, PolicyAllowed} from '../../atoms'
import {Box, Divider, IconButton, Stack, Tab, Tabs, Typography} from '@mui/material'
import {Config} from '../../../config'
import {ModalForms} from '../../organisms'
import {PolicyUtils} from '../../../utils/policyUtils'
import {Edit} from '@mui/icons-material'
import {EditPremises} from '../../organisms/ModalForms/formFunctions/premises'
import {useSelector} from '../../../hooks'
import {getStorage, setStorage, StorageKeys} from '../../../utils/storage'
import {ZonesView} from './components/ZonesView'
import {BoardsView} from './components/BoardsView'

enum PremisesView {
  ZONE = 0,
  BOARD = 1
}

export const PremisesDetails: React.FC = () => {
  const premises = useSelector(state => state.premises)!
  const address = premises.address
  const defaultView = getStorage<{view: PremisesView}>(StorageKeys.PREMISES_VIEW)?.view ?? PremisesView.ZONE
  const [view, setView] = useState<PremisesView>(defaultView)

  useEffect(() => {
    setStorage(StorageKeys.PREMISES_VIEW, {view})
  }, [view])

  const updateView = (_event: React.SyntheticEvent, view: PremisesView) => {
    setView(view)
  }

  return (
    <PageContainer pt={2}>
      <Stack mb={2}>
        <Breadcrumbs links={[{link: Config.PREMISES_PAGE_PATH, name: 'Premises'}]} text={premises.name} />
      </Stack>
      <Box boxShadow={2} p={4} bgcolor={'background.paper'} borderRadius={1}>
        <Stack>
          <Stack>
            <Stack direction={'row'} spacing={1} alignItems={'flex-end'}>
              <Typography variant={'h4'}>{premises.name}</Typography>
              <PolicyAllowed policyId={PolicyUtils.PREMISES_UPDATE}>
                <ModalForms getFormDetails={EditPremises} premises={premises}>
                  <IconButton color={'primary'}>
                    <Edit color={'primary'} />
                  </IconButton>
                </ModalForms>
              </PolicyAllowed>
            </Stack>
            <Typography>Premises Id: {premises.premisesId}</Typography>
          </Stack>
          <Typography>
            Location: {address.address1}, {address.address2}, {address.district}, {address.state} - {address.pincode}
          </Typography>
        </Stack>
        <Tabs value={view} onChange={updateView}>
          <Tab label={'Zone'}></Tab>
          <Tab label={'Board'}></Tab>
        </Tabs>
        <Divider sx={{marginTop: '-1px'}} />
        {view === PremisesView.ZONE && <ZonesView />}
        {view === PremisesView.BOARD && <BoardsView />}
      </Box>
    </PageContainer>
  )
}
