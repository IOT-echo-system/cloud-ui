import * as React from 'react'
import {Box, Divider, Drawer, IconButton, MenuItem, Stack} from '@mui/material'
import {Close} from '@mui/icons-material'
import {useSelector} from '../../../hooks'
import {Link} from '../../atoms'

type MobileMenuPropsType = {open: boolean; handleClose: () => void}

export const MobileMenu: React.FC<MobileMenuPropsType> = ({open, handleClose}) => {
  const {site} = useSelector(state => state)
  return (
    <Drawer open={open} onClose={handleClose}>
      <Box sx={{width: 250}} role="presentation">
        <Stack direction={'row'} justifyContent={'end'} m={1}>
          <IconButton onClick={handleClose}>
            <Close color={'error'} />
          </IconButton>
        </Stack>
        <Divider />
        <Stack mt={1}>
          {site.menus.map(({name, link}) => (
            <Link href={link} key={link} underline={'false'} onClick={handleClose}>
              <MenuItem>{name}</MenuItem>
            </Link>
          ))}
        </Stack>
      </Box>
    </Drawer>
  )
}
