import React from 'react'
import {List, ListItem, Stack, styled} from '@mui/material'
import {Link} from '../atoms'
import {useRouter} from 'next/router'
import type {LinkProps} from 'next/link'

const StyledLink = styled(Link)<LinkProps & {active: boolean}>(({theme, active}) => ({
  color: theme.palette.common.white,
  fontWeight: active ? 'bold' : 'normal',
  '&:hover': {
    textDecoration: 'none'
  }
}))

const menuItems = [
  {name: 'Home', link: '/'},
  {name: 'Dashboard', link: '/dashboard'}
]

export const Menubar: React.FC = () => {
  const router = useRouter()

  return (
    <Stack direction={'row'} component={List}>
      {menuItems.map(({name, link}) => (
        <ListItem key={link}>
          <StyledLink href={link} active={router.pathname.startsWith(link)}>
            {name}
          </StyledLink>
        </ListItem>
      ))}
    </Stack>
  )
}
