import {useMediaQuery} from '@mui/material'
import theme from '../theme/light'

export const useMedia = (): {[P in 'sm' | 'md' | 'lg' | 'xl' | 'xxl']: boolean} => {
  return {
    sm: useMediaQuery(theme.breakpoints.up('xs')),
    md: useMediaQuery(theme.breakpoints.up('sm')),
    lg: useMediaQuery(theme.breakpoints.up('md')),
    xl: useMediaQuery(theme.breakpoints.up('lg')),
    xxl: useMediaQuery(theme.breakpoints.up('xl'))
  }
}
