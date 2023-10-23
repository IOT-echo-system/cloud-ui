import type {PropsWithChildren} from 'react'
import React from 'react'
import {Button, Stack, styled} from '@mui/material'
import {useDispatch, useSelector} from '@/hooks'
import {updateTheme} from '@/store/actions/site'

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  const dispatch = useDispatch()
  const {theme} = useSelector(state => state.site)
  const handleUpdateTheme = () => {
    dispatch(updateTheme(theme === 'dark' ? 'light' : 'dark'))
  }
  return <Container className={theme}>
    <Button variant={'contained'} onClick={handleUpdateTheme}>Change Theme</Button>
    {children}
  </Container>
}

export default Layout

const Container = styled(Stack)(({theme}) => ({
  background: theme.palette.background.default,
  minHeight: '100vh'
}))
