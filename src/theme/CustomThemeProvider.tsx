import type {PropsWithChildren} from 'react'
import React from 'react'
import {ThemeProvider} from '@mui/system'
import {useSelector} from '@/hooks'
import dark from './dark'
import light from './light'

const CustomThemeProvider: React.FC<PropsWithChildren> = ({children}) => {
  const site = useSelector(state => state.site)
  return <ThemeProvider theme={site.theme === 'dark' ? dark : light}>{children}</ThemeProvider>
}

export default CustomThemeProvider
