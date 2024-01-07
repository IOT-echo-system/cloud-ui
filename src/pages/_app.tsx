import type {AppProps} from 'next/app'
import React from 'react'

import '../../public/styles/index.css'
import StoreProvider from '../store/configureStore'
import CustomThemeProvider from '../theme/CustomThemeProvider'
import {Layout} from '../organisms'
import {ToastWrapper} from '../atoms'

const App: React.FC<AppProps> = ({Component, pageProps, router}) => {
  return (
    <StoreProvider>
      <CustomThemeProvider>
        <ToastWrapper>
          <Layout>
            <Component {...pageProps} key={router.asPath} />
          </Layout>
        </ToastWrapper>
      </CustomThemeProvider>
    </StoreProvider>
  )
}
export default App
