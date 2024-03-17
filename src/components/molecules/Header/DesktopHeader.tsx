import {AppBar, Box, Stack, Toolbar, Typography} from '@mui/material'
import React, {useState} from 'react'
import {useMedia, useSelector} from '../../../hooks'
import {Menubar} from '../Menubar/Menubar'
import {Button} from '../../atoms'
import {AccountCircle} from '@mui/icons-material'
import {MobileProfile} from '../Menubar/MobileProfile'

export const DesktopHeader: React.FC = () => {
  const {site, user, project} = useSelector(state => state)
  const [open, setOpen] = useState(false)
  const media = useMedia()

  return (
    <Stack justifyContent={'center'}>
      <Stack direction={'row'} alignItems={'center'} spacing={2} ml={3} justifyContent={'space-evenly'}>
        <Typography variant={'h6'} component={'div'}>
          {project.name}
        </Typography>
        <Typography variant={'body2'}>Project Id: {project.projectId}</Typography>
      </Stack>
      <AppBar position="static">
        <Toolbar>
          <Stack direction={'row'} alignItems={'center'}>
            <Typography variant={media.lg ? 'h4' : 'h5'} noWrap component="div">
              {site.title}
            </Typography>
          </Stack>
          <Box sx={{flexGrow: 1}} />

          <Box sx={{flexGrow: 1}} />
          <Menubar />
          <Button
            onClick={() => {
              setOpen(true)
            }}
            variant={'contained'}
            color={'secondary'}
            startIcon={<AccountCircle />}
          >
            {user.name}
          </Button>
          <MobileProfile
            open={open}
            handleClose={() => {
              setOpen(false)
            }}
          />
        </Toolbar>
      </AppBar>
    </Stack>
  )
}
