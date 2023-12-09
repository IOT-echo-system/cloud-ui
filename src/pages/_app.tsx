import type {AppProps} from 'next/app'
import React from 'react'
import StoreProvider from '@/store/configureStore'
import CustomThemeProvider from '@/theme/CustomThemeProvider'
import {Layout} from '@/organisms'
import '../../public/styles/index.css'

const App: React.FC<AppProps> = ({Component, pageProps, router}) => {
  return (
    <StoreProvider>
      <CustomThemeProvider>
        <Layout>
          <Component {...pageProps} key={router.asPath} />
        </Layout>
      </CustomThemeProvider>
    </StoreProvider>
  )
}
export default App
