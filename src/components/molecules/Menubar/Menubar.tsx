import React from 'react'
import {List, ListItem, Stack, styled} from '@mui/material'
import {useRouter} from 'next/router'
import type {LinkProps} from 'next/link'
import {useSelector} from '../../../hooks'
import {Link} from '../../atoms'

const StyledLink = styled(Link)<LinkProps & {active: boolean}>(({theme}) => ({
  color: theme.palette.common.white,
  '&:hover': {
    textDecoration: 'none'
  }
}))

export const Menubar: React.FC = () => {
  const {site} = useSelector(state => state)
  const router = useRouter()

  return (
    <Stack direction={'row'} component={List}>
      {site.menus.map(({name, link, exact}) => (
        <ListItem key={link}>
          <StyledLink href={link} active={exact ? router.pathname === link : router.pathname.startsWith(link)}>
            {name}
          </StyledLink>
        </ListItem>
      ))}
    </Stack>
  )
}
