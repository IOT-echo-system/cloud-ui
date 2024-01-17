import type {AppProps} from 'next/app'
import React, {useEffect, useState} from 'react'

import '../../public/styles/index.css'
import StoreProvider from '../store/configureStore'
import CustomThemeProvider from '../theme/CustomThemeProvider'
import {Layout} from '../organisms'
import {Loader, ToastWrapper} from '../atoms'
import {AuthService} from '../services'
import {Config} from '../config'

const App: React.FC<AppProps> = ({Component, pageProps, router}) => {
  const authService = AuthService()
  const [isValidated, setIsValidated] = useState(false)
  useEffect(() => {
    if (!router.pathname.startsWith('/auth')) {
      authService
        .validate()
        .then(() => {
          setIsValidated(true)
        })
        .catch(() => {
          setIsValidated(false)
          return router.push(Config.LOGIN_PAGE_PATH)
        })
    } else {
      setIsValidated(true)
    }
  }, [router.pathname])

  return (
    <StoreProvider>
      <CustomThemeProvider>
        <ToastWrapper>
          <Layout>
            {isValidated ? (
              <Component {...pageProps} key={router.asPath} />
            ) : (
              <Loader page loadingText={'Loading...'} />
            )}
          </Layout>
        </ToastWrapper>
      </CustomThemeProvider>
    </StoreProvider>
  )
}
export default App
