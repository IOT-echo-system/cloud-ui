import type {Board} from '../../../typing/board'
import {useBoardSecretKey} from './useBoardSecretKey'
import React from 'react'
import {IconButton, Stack, Typography} from '@mui/material'
import {Button, Loader} from '../../atoms'
import {CopyAll} from '@mui/icons-material'
import {useSelector} from '../../../hooks'

export type BoardSecretKeyPropsType = {board: Board}

export const BoardSecretKey: React.FC<BoardSecretKeyPropsType> = ({board}) => {
  const {secretKey, loading, updateSecretKey, copyToClipboard, copied} = useBoardSecretKey(board.boardId)
  const {site} = useSelector(state => state)

  return (
    <Stack spacing={2}>
      <Typography variant={'h4'} component={'div'}>
        Secret key
      </Typography>

      <Stack spacing={2}>
        <Typography textAlign={'justify'}>
          Your {site.title} secret key should be kept in a safe place and treated with the same care as your{' '}
          {site.title} username and password. People who have access to your {site.title} secret key can view all of
          your data, create new feeds for your account, and manipulate your active feeds.
        </Typography>
        <Typography textAlign={'justify'}>
          If you need to regenerate a new {site.title} secret key, all of your existing programs and scripts will need
          to be manually changed to the new key.
        </Typography>
      </Stack>

      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{
          color: 'grey.800',
          border: '1px solid',
          borderColor: copied ? 'grey.800' : 'grey.300',
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700'
        }}
      >
        <Typography ml={2}>{loading ? <Loader /> : secretKey}</Typography>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Typography variant={'body2'}>{copied ? 'copied...' : 'copy'}</Typography>
          <IconButton onClick={copyToClipboard} title={'Copy to clipboard'}>
            <CopyAll />
          </IconButton>
        </Stack>
      </Stack>

      <Stack direction={'row'}>
        <Button variant={'contained'} onClick={updateSecretKey} loading={loading}>
          Regenerate secret key
        </Button>
      </Stack>
    </Stack>
  )
}
