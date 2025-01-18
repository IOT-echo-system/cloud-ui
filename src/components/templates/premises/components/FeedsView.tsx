import React, {useEffect, useState} from 'react'
import {Box, IconButton, Stack, Typography} from '@mui/material'
import {Button, Loader, PolicyAllowed} from '../../../atoms'
import {PolicyUtils} from '../../../../utils/policyUtils'
import {ModalForms} from '../../../organisms'
import {AddFeed, UpdateFeedName} from '../../../organisms/ModalForms/formFunctions/boards'
import {useSelector, useToast} from '../../../../hooks'
import type {Feed} from '../../../../typing/feed'
import {FeedService} from '../../../../services'
import {Edit} from '@mui/icons-material'

export const FeedsView: React.FC = () => {
  const premises = useSelector(state => state.premises!)
  const {boards} = useSelector(state => state)
  const [feeds, setFeeds] = useState<Feed[]>([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  useEffect(() => {
    FeedService.getFeeds()
      .then(setFeeds)
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const updateFeed = (feed: Feed) => {
    const index = feeds.findIndex(currentFeed => currentFeed.feedId === feed.feedId)
    if (index === -1) {
      feeds.push(feed)
    } else {
      feeds[index] = feed
    }
    setFeeds([...feeds])
  }

  return (
    <Stack mt={2} gap={2}>
      <Stack direction={'row'} justifyContent={'end'} gap={2}>
        <PolicyAllowed policyId={PolicyUtils.FEED_CREATE} otherConditions={[premises.enableEdit]}>
          <ModalForms getFormDetails={AddFeed} updateFeed={updateFeed}>
            <Button variant={'contained'}>Add feed</Button>
          </ModalForms>
        </PolicyAllowed>
      </Stack>
      <Stack direction={'row'} flexWrap={'wrap'} gap={2}>
        {loading ? (
          <Loader loadingText={'Loading feeds'} />
        ) : (
          <>
            {feeds.map(feed => {
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
                      <ModalForms getFormDetails={UpdateFeedName} feed={feed} updateFeed={updateFeed}>
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
          </>
        )}
      </Stack>
    </Stack>
  )
}
