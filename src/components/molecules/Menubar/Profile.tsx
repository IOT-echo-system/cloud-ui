import * as React from 'react'
import {Box, Divider, Drawer, IconButton, MenuItem, Stack, Typography} from '@mui/material'
import {Close} from '@mui/icons-material'
import {useSelector, useToast} from '../../../hooks'
import {Link} from '../../atoms'
import {AuthService} from '../../../services'
import {useRouter} from 'next/router'
import {Config} from '../../../config'

type MobileProfilePropsType = {open: boolean; handleClose: () => void}

export const Profile: React.FC<MobileProfilePropsType> = ({open, handleClose}) => {
  const {user} = useSelector(state => state)
  const toast = useToast()
  const router = useRouter()

  const handleSignOut = () => {
    AuthService.logout().then(router.reload).catch(toast.error)
  }

  return (
    <Drawer open={open} onClose={handleClose} anchor={'right'}>
      <Box sx={{width: 250}} role="presentation">
        <Stack direction={'row'} justifyContent={'end'} m={1}>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
        <Divider />
        <Stack m={2} flexWrap={'wrap'}>
          <Typography variant={'h5'} component={'div'}>
            {user.name}
          </Typography>
          <Typography variant={'subtitle1'} component={'div'}>
            User Id: {user.userId}
          </Typography>
          <Stack direction={'row'} alignItems={'center'}>
            <Typography variant={'subtitle1'} component={'div'}>
              Role:
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack mt={1}>
          <Link href={Config.PROFILE_PAGE_PATH} underline={'false'} color={'inherit'} onClick={handleClose}>
            <MenuItem>Profile</MenuItem>
          </Link>
          <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
        </Stack>
      </Box>
    </Drawer>
  )
}
