import type {PropsWithChildren} from 'react'
import React from 'react'
import {Footer, Header} from '../molecules'
import {Box, Stack} from '@mui/material'
import {useRouter} from 'next/router'

export const Layout: React.FC<PropsWithChildren> = ({children}) => {
  const router = useRouter()
  const isUnAuthorizedPath = router.pathname.startsWith('/auth') || router.pathname === '/start'

  return (
    <Stack sx={{minHeight: '100vh'}}>
      {!isUnAuthorizedPath && (
        <header>
          <Header />
        </header>
      )}
      <main>{children}</main>
      {!isUnAuthorizedPath && (
        <>
          <Box sx={{flexGrow: 1}} />
          <footer>
            <Footer />
          </footer>
        </>
      )}
    </Stack>
  )
}
