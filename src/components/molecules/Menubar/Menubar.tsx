import React from 'react'
import {Avatar, IconButton, List, ListItem, Stack, styled} from '@mui/material'
import {useSelector} from '../../../hooks'
import {Link} from '../../atoms'

const NavLink = styled(Link)(({theme}) => ({
  padding: theme.spacing(1, 0.25),
  borderBottom: '2px solid transparent',
  borderTop: '2px solid transparent',
  '&:hover': {
    color: theme.palette.common.white,
    borderBottom: `2px solid ${theme.palette.common.white}`
  }
}))

export const Menubar: React.FC = () => {
  const {site} = useSelector(state => state)

  return (
    <Stack direction={'row'} component={List}>
      {site.menus.map(({name, link}) => (
        <ListItem key={link}>
          <NavLink href={link} underline={'false'} color={'inherit'}>
            {name}
          </NavLink>
        </ListItem>
      ))}
      <IconButton>
        <Avatar />
      </IconButton>
    </Stack>
  )
}
