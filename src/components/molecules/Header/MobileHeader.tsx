import {AppBar, Box, IconButton, Stack, Toolbar, Typography} from '@mui/material'
import React, {useState} from 'react'
import {useSelector} from '../../../hooks'
import {AccountCircle, Menu} from '@mui/icons-material'
import {MobileMenu} from '../Menubar/MobileMenu'
import {Profile} from '../Menubar/Profile'
import {Link} from '../../atoms'
import {Config} from '../../../config'

export const MobileHeader: React.FC = () => {
  const site = useSelector(state => state.site)
  const [openMenu, setMenuOpen] = useState(false)
  const [openProfile, setProfileOpen] = useState(false)

  return (
    <Stack justifyContent={'center'} alignItems={'center'}>
      <AppBar position="static">
        <Toolbar>
          <Stack direction={'row'} alignItems={'center'}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{mr: 1}}
              onClick={() => {
                setMenuOpen(true)
              }}
            >
              <Menu />
            </IconButton>
            <Typography variant={'h5'} noWrap component="div">
              <Link href={Config.HOME_PAGE_PATH} color={'inherit'} disableUnderline>
                {site.title}
              </Link>
            </Typography>
          </Stack>
          <Box sx={{flexGrow: 1}} />
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ml: 1}}
            onClick={() => {
              setProfileOpen(true)
            }}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MobileMenu
        open={openMenu}
        handleClose={() => {
          setMenuOpen(false)
        }}
      />
      <Profile
        open={openProfile}
        handleClose={() => {
          setProfileOpen(false)
        }}
      />
    </Stack>
  )
}
