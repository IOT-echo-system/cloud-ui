import {AppBar, Box, Stack, Toolbar, Typography} from '@mui/material'
import React, {useState} from 'react'
import {useMedia, useSelector} from '../../../hooks'
import {Menubar} from '../Menubar/Menubar'
import {Link} from '../../atoms'
import {Profile} from '../Menubar/Profile'
import {Config} from '../../../config'

export const DesktopHeader: React.FC = () => {
  const {site} = useSelector(state => state)
  const [open, setOpen] = useState(false)
  const media = useMedia()

  return (
    <Stack justifyContent={'center'}>
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
