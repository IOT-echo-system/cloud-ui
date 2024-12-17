import type {BoxProps, StackProps} from '@mui/material'
import {Box, Stack, styled} from '@mui/material'
import {LoadingButton} from '@mui/lab'
import NextLink from 'next/link'
import type {LinkProps} from 'next/dist/client/link'

export const Button = styled(LoadingButton)({textTransform: 'none'})

export const FormContainer = styled('form')(({theme}) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(1),
  boxShadow: theme.shadows[1],
  borderRadius: theme.spacing(1),
  margin: theme.spacing(1, 'auto'),
  justifyContent: 'center',
  width: `calc(100vw - ${theme.spacing(4)})`,
  '&>*': {
    margin: theme.spacing(1.5)
  },
  [theme.breakpoints.up('sm')]: {
    width: theme.spacing(60),
    padding: theme.spacing(4)
  }
}))

export const BoxContainer = styled(Box)<BoxProps>(({theme}) => ({
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: theme.spacing(1),
  margin: theme.spacing(1, 0),
  justifyContent: 'center',
  '&>*': {
    margin: theme.spacing(2)
  },
  [theme.breakpoints.up('sm')]: {
    '&>*': {
      margin: theme.spacing(2.5)
    }
  },
  '&>hr': {
    margin: 0
  }
}))

export const WidgetsContainer = styled(Stack)<StackProps>(({theme}) => ({
  gap: theme.spacing(2),
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: theme.spacing(2)
}))

export const WidgetContainer = styled(Stack)<StackProps>(({theme}) => ({
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  borderRadius: theme.spacing(1),
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4)
  }
}))

export const CenteredContainer = styled(Stack)(({theme}) => ({
  margin: 'auto',
  minHeight: '100vh',
  justifyContent: 'center',
  width: '100vw',
  [theme.breakpoints.up('sm')]: {
    width: theme.spacing(72)
  }
}))

export const TopCenteredContainer = styled(Stack)(({theme}) => ({
  margin: theme.spacing(4, 'auto')
}))

export const Link = styled(NextLink)<LinkProps & {underline?: 'true' | 'false'}>(
  ({theme, color, underline = 'true'}) => ({
    textDecoration: underline === 'false' ? 'none' : 'underline',
    textUnderlineOffset: theme.spacing(0.3),
    color: color ?? 'black',
    '&:hover': {
      color: theme.palette.primary.dark
    }
  })
)

export const PageContainer = styled(Stack)(({theme}) => ({
  margin: '0 auto',
  width: '95%',
  [theme.breakpoints.up('md')]: {
    width: '90%'
  },
  [theme.breakpoints.up('lg')]: {
    width: '80%'
  }
}))
