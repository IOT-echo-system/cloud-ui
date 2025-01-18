import React, {useEffect, useState} from 'react'
import {Breadcrumbs, Button, PageContainer, PolicyAllowed} from '../../atoms'
import {Box, Divider, IconButton, Stack, Tab, Tabs, Typography} from '@mui/material'
import {Config} from '../../../config'
import {ModalForms} from '../../organisms'
import {PolicyUtils} from '../../../utils/policyUtils'
import {Done, Edit} from '@mui/icons-material'
import {EditPremises} from '../../organisms/ModalForms/formFunctions/premises'
import {useDispatch, useSelector} from '../../../hooks'
import {getStorage, setStorage, StorageKeys} from '../../../utils/storage'
import {ZonesView} from './components/ZonesView'
import {BoardsView} from './components/BoardsView'
import {FeedsView} from './components/FeedsView'
import {usePremisesUserRole} from './hooks/usePremisesUserRole'
import {toggleEdit} from '../../../store/actions/premises'

enum PremisesView {
  ZONE = 0,
  BOARD = 1,
  FEED = 2
}

export const PremisesDetails: React.FC = () => {
  const premises = useSelector(state => state.premises)!
  const address = premises.address
  const defaultView = getStorage<{view: PremisesView}>(StorageKeys.PREMISES_VIEW)?.view ?? PremisesView.ZONE
  const [view, setView] = useState<PremisesView>(defaultView)
  const {isOwner} = usePremisesUserRole()
  const dispatch = useDispatch()

  useEffect(() => {
    setStorage(StorageKeys.PREMISES_VIEW, {view})
  }, [view])

  useEffect(() => {
    if (!premises.enableEdit && view === PremisesView.FEED) {
      setView(PremisesView.ZONE)
    }
  }, [view, premises.enableEdit])

  const updateView = (_event: React.SyntheticEvent, view: PremisesView) => {
    setView(view)
  }

  const handleToggleEdit = () => {
    dispatch(toggleEdit())
  }

  return (
    <PageContainer pt={2}>
      <Stack mb={2} direction={'row'} justifyContent={'space-between'}>
        <Breadcrumbs links={[{link: Config.PREMISES_PAGE_PATH, name: 'Premises'}]} text={premises.name} />
        <PolicyAllowed policyId={PolicyUtils.PREMISES_CREATE} otherConditions={[isOwner]}>
          <Button
            variant={'contained'}
            startIcon={premises.enableEdit ? <Done /> : <Edit />}
            onClick={handleToggleEdit}
          >
            {premises.enableEdit ? 'Done' : 'Edit'}
          </Button>
        </PolicyAllowed>
      </Stack>
      <Box boxShadow={2} p={4} bgcolor={'background.paper'} borderRadius={1}>
        <Stack>
          <Stack>
            <Stack direction={'row'} spacing={1} alignItems={'flex-end'}>
              <Typography variant={'h4'}>{premises.name}</Typography>
              <PolicyAllowed policyId={PolicyUtils.PREMISES_UPDATE} otherConditions={[premises.enableEdit]}>
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
          {premises.enableEdit && <Tab label={'Feed'}></Tab>}
        </Tabs>
        <Divider sx={{marginTop: '-1px'}} />
        {view === PremisesView.ZONE && <ZonesView />}
        {view === PremisesView.BOARD && <BoardsView />}
        {view === PremisesView.FEED && <FeedsView />}
      </Box>
    </PageContainer>
  )
}
