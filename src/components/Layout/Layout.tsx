import type {PropsWithChildren} from 'react'
import React from 'react'
import {Stack, styled} from '@mui/material'
import {useSelector} from '@/hooks'

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  const {theme} = useSelector(state => state.site)

  return <Container className={theme}>{children}</Container>
}

export default Layout

const Container = styled(Stack)(({theme}) => ({
  background: theme.palette.background.default,
  minHeight: '100vh'
}))
