import React from 'react'
import {List, ListItem, Stack} from '@mui/material'
import {useSelector} from '../../../hooks'
import {Link} from '../../atoms'

export const Menubar: React.FC = () => {
  const {site} = useSelector(state => state)

  return (
    <Stack direction={'row'} component={List}>
      {site.menus.map(({name, link}) => (
        <ListItem key={link}>
          <Link href={link} underline={'false'} color={'inherit'}>
            {name}
          </Link>
        </ListItem>
      ))}
    </Stack>
  )
}
