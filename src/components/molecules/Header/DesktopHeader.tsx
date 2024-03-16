import {AppBar, Box, Stack, styled, Toolbar, Typography} from '@mui/material'
import React from 'react'
import {useMedia, useSelector} from '../../../hooks'

export const HeaderContainer = styled(Stack)(({theme}) => ({
  background: theme.palette.primary.main,
  minHeight: theme.spacing(8)
}))

export const DesktopHeader: React.FC = () => {
  const site = useSelector(state => state.site)
  const media = useMedia()

  return (
    <HeaderContainer justifyContent={'center'}>
      <AppBar position="static">
        <Toolbar>
          <Stack direction={'row'} alignItems={'center'}>
            <Typography variant={media.lg ? 'h4' : 'h5'} noWrap component="div">
              {site.title}
            </Typography>
          </Stack>
          <Box sx={{flexGrow: 1}} />
          {/*<Menubar/>*/}
        </Toolbar>
      </AppBar>
    </HeaderContainer>
  )
}
