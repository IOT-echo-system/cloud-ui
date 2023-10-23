import type {AppProps} from 'next/app'
import {ThemeProvider} from '@mui/material'
import theme from '@/theme'
import React from 'react'
import StoreProvider from '@/store/configureStore'
import {useRouter} from 'next/router'
import {Layout, SiteWrapper} from '@/components'

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  const router = useRouter()

  return <StoreProvider>
    <SiteWrapper>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} key={router.asPath} />
        </Layout>
      </ThemeProvider>
    </SiteWrapper>
  </StoreProvider>
}
export default App
