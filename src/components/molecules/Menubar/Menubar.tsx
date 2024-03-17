import React from 'react'
import {List, ListItem, Stack, styled} from '@mui/material'
import {useRouter} from 'next/router'
import type {LinkProps} from 'next/link'
import {useSelector} from '../../../hooks'
import {Link} from '../../atoms'

const StyledLink = styled(Link)<LinkProps & {active: boolean}>(({theme, active}) => ({
  color: theme.palette.common.white,
  fontWeight: active ? 'bold' : 'normal',
  '&:hover': {
    textDecoration: 'none'
  }
}))

export const Menubar: React.FC = () => {
  const {site} = useSelector(state => state)
  const router = useRouter()

  return (
    <Stack direction={'row'} component={List}>
      {site.menus.map(({name, link}) => (
        <ListItem key={link}>
          <StyledLink href={link} active={router.pathname.startsWith(link)}>
            {name}
          </StyledLink>
        </ListItem>
      ))}
    </Stack>
  )
}
