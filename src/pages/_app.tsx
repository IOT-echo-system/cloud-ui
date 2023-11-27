import type {AppProps} from 'next/app'
import React from 'react'
import StoreProvider from '@/store/configureStore'
import {useRouter} from 'next/router'
import {Layout, SiteWrapper} from '@/components'
import CustomThemeProvider from '@/theme/CustomThemeProvider'

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  const router = useRouter()

  return (
    <StoreProvider>
      <SiteWrapper>
        <CustomThemeProvider>
          <Layout>
            <Component {...pageProps} key={router.asPath} />
          </Layout>
        </CustomThemeProvider>
      </SiteWrapper>
    </StoreProvider>
  )
}
export default App
