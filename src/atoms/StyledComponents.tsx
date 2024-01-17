import {Button as MUIButton, Stack, styled} from '@mui/material'
import NextLink from 'next/link'

export const Button = styled(MUIButton)({textTransform: 'none'})

export const FormContainer = styled('form')(({theme}) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(1),
  boxShadow: theme.shadows[1],
  borderRadius: theme.spacing(1),
  margin: theme.spacing(1),
  justifyContent: 'center',
  width: `calc(100vw - ${theme.spacing(4)})`,
  '&>*': {
    margin: theme.spacing(1.5)
  },
  '&.light': {
    border: `1px solid ${theme.palette.grey[300]}`
  },
  '&.dark': {
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[700]}`
  },
  [theme.breakpoints.up('sm')]: {
    width: theme.spacing(60),
    padding: theme.spacing(4)
  }
}))

export const CenteredContainer = styled(Stack)(() => ({
  margin: 'auto'
}))

export const Link = styled(NextLink)(() => ({
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
}))
