import {AppBar, Avatar, Box, IconButton, Stack, styled, Toolbar, Typography} from '@mui/material'
import React, {useState} from 'react'
import {useMedia, useSelector} from '../../../hooks'
import {Menu} from '@mui/icons-material'
import {MobileMenu} from '../Menubar/MobileMenu'
import {MobileProfile} from '../Menubar/MobileProfile'
import {Link} from '../../atoms'

export const HeaderContainer = styled(Stack)(({theme}) => ({
  background: theme.palette.primary.main,
  minHeight: theme.spacing(8)
}))

export const MobileHeader: React.FC = () => {
  const site = useSelector(state => state.site)
  const media = useMedia()
  const [openMenu, setMenuOpen] = useState(false)
  const [openProfile, setProfileOpen] = useState(false)

  return (
    <HeaderContainer justifyContent={'center'}>
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
            <Typography variant={media.lg ? 'h4' : 'h5'} noWrap component="div">
              <Link href={'/'} color={'inherit'} disableUnderline>
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
            <Avatar />
          </IconButton>
        </Toolbar>
      </AppBar>
      <MobileMenu
        open={openMenu}
        handleClose={() => {
          setMenuOpen(false)
        }}
      />
      <MobileProfile
        open={openProfile}
        handleClose={() => {
          setProfileOpen(false)
        }}
      />
    </HeaderContainer>
  )
}
