import React from 'react'
import {Box, IconButton, Stack, Typography} from '@mui/material'
import {Button, PolicyAllowed} from '../../../atoms'
import {PolicyUtils} from '../../../../utils/policyUtils'
import {ModalForms} from '../../../organisms'
import {AddFeed, UpdateFeedName} from '../../../organisms/ModalForms/formFunctions/premises'
import {useSelector} from '../../../../hooks'
import {Edit} from '@mui/icons-material'

export const FeedsView: React.FC = () => {
  const premises = useSelector(state => state.premises!)
  const {boards, feeds} = useSelector(state => state)
  const allFeeds = Object.keys(feeds)
    .map(feedId => feeds[feedId])
    .filter(feed => feed.premisesId === premises.premisesId)

  return (
    <Stack mt={2} gap={2}>
      <Stack direction={'row'} justifyContent={'end'} gap={2}>
        <PolicyAllowed policyId={PolicyUtils.FEED_CREATE} otherConditions={[premises.enableEdit]}>
          <ModalForms getFormDetails={AddFeed}>
            <Button variant={'contained'}>Add feed</Button>
          </ModalForms>
        </PolicyAllowed>
      </Stack>
      <Stack direction={'row'} flexWrap={'wrap'} gap={2}>
        {allFeeds.map(feed => {
          return (
            <Box
              key={feed.feedId}
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
                <Typography variant={'h5'}>{feed.name}</Typography>
                <PolicyAllowed policyId={PolicyUtils.FEED_UPDATE} otherConditions={[premises.enableEdit]}>
                  <ModalForms getFormDetails={UpdateFeedName} feed={feed}>
                    <IconButton color={'primary'}>
                      <Edit />
                    </IconButton>
                  </ModalForms>
                </PolicyAllowed>
              </Stack>
              <Typography variant={'body2'}>Feed Id: {feed.feedId}</Typography>
              <Typography>Feed type: {feed.type}</Typography>
              <Typography>
                Board: {boards[feed.boardId].name} ({feed.boardId})
              </Typography>
            </Box>
          )
        })}
      </Stack>
    </Stack>
  )
}
