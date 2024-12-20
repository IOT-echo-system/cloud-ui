import type {AppProps} from 'next/app'
import React from 'react'

import '../../public/styles/index.css'
import StoreProvider from '../store/configureStore'
import CustomThemeProvider from '../theme/CustomThemeProvider'
import {ToastWrapper} from '../components/atoms'
import {Layout} from '../components/organisms'
import {ValidatedProfile, WebSocketProvider} from '../components/molecules'

const App: React.FC<AppProps> = ({Component, pageProps, router}) => {
  return (
    <StoreProvider>
      <WebSocketProvider>
        <CustomThemeProvider>
          <ToastWrapper>
            <ValidatedProfile>
              <Layout>
                <Component {...pageProps} key={router.asPath} />
              </Layout>
            </ValidatedProfile>
          </ToastWrapper>
        </CustomThemeProvider>
      </WebSocketProvider>
    </StoreProvider>
  )
}
export default App
