import {styled, Button as MUIButton, Stack} from '@mui/material'

export const Button = styled(MUIButton)({textTransform: 'none'})

export const FormContainer = styled('form')(({theme}) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(4),
  boxShadow: theme.shadows[1],
  borderRadius: theme.spacing(1),
  width: theme.spacing(60),
  '&>*': {
    margin: theme.spacing(1.5)
  },
  '&.light': {
    border: `1px solid ${theme.palette.grey[300]}`
  },
  '&.dark': {
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[700]}`
  }
}))

export const CenteredContainer = styled(Stack)(() => ({
  margin: 'auto'
}))
