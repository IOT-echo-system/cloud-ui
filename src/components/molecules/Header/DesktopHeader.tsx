import {AppBar, Box, Stack, Toolbar, Typography} from '@mui/material'
import React, {useState} from 'react'
import {useMedia, useSelector} from '../../../hooks'
import {Menubar} from '../Menubar/Menubar'
import {Button, Link, PageContainer} from '../../atoms'
import {AccountCircle} from '@mui/icons-material'
import {Profile} from '../Menubar/Profile'
import {Config} from '../../../config'

export const DesktopHeader: React.FC = () => {
  const {site, user, project} = useSelector(state => state)
  const [open, setOpen] = useState(false)
  const media = useMedia()

  return (
    <Stack justifyContent={'center'}>
      <PageContainer direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Link href={Config.PROJECT_PAGE_PATH} underline={'false'}>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Typography variant={'h6'} component={'div'}>
              {project.name}
            </Typography>
            <Typography variant={'body2'}>Project Id: {project.projectId}</Typography>
          </Stack>
        </Link>
        <Button
          onClick={() => {
            setOpen(true)
          }}
          startIcon={<AccountCircle />}
        >
          {user.name}
        </Button>
      </PageContainer>
      <AppBar position="static">
        <Toolbar sx={{width: {md: '90%', lg: '80%'}, margin: 'auto'}}>
          <Stack direction={'row'} alignItems={'center'}>
            <Typography variant={media.lg ? 'h4' : 'h5'} noWrap component="div">
              <Link href={Config.HOME_PAGE_PATH} underline={'false'} color={'inherit'}>
                {site.title}
              </Link>
            </Typography>
          </Stack>
          <Box sx={{flexGrow: 1}} />
          <Menubar />
        </Toolbar>
      </AppBar>
      <Profile
        open={open}
        handleClose={() => {
          setOpen(false)
        }}
      />
    </Stack>
  )
}
