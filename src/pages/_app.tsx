import type {AppProps} from 'next/app'
import React, {useEffect, useState} from 'react'

import '../../public/styles/index.css'
import StoreProvider from '../store/configureStore'
import CustomThemeProvider from '../theme/CustomThemeProvider'
import {AuthService} from '../services'
import {Config} from '../config'
import {Loader, ToastWrapper} from '../components/atoms'
import {Layout} from '../components/organisms'

const App: React.FC<AppProps> = ({Component, pageProps, router}) => {
  const authService = AuthService()
  const [isValidated, setIsValidated] = useState(false)
  useEffect(() => {
    if (!router.pathname.startsWith('/auth') && router.pathname !== '/start') {
      authService
        .validate()
        .then(res => {
          if (!res.projectId) {
            return router.push('/start')
          }
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
