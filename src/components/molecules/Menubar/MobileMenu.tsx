import * as React from 'react'
import {Box, Divider, Drawer, IconButton, MenuItem, Stack, Typography} from '@mui/material'
import {Close} from '@mui/icons-material'
import {useSelector} from '../../../hooks'
import {Link} from '../../atoms'

type MobileMenuPropsType = {open: boolean; handleClose: () => void}

export const MobileMenu: React.FC<MobileMenuPropsType> = ({open, handleClose}) => {
  const {project, site} = useSelector(state => state)
  return (
    <Drawer open={open} onClose={handleClose}>
      <Box sx={{width: 250}} role="presentation">
        <Stack direction={'row'} justifyContent={'end'} m={1}>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
        <Divider />
        <Stack m={2} flexWrap={'wrap'}>
          <Typography variant={'h5'} component={'div'}>
            {project.name}
          </Typography>
          <Typography variant={'subtitle1'} component={'div'}>
            Project Id: {project.projectId}
          </Typography>
        </Stack>
        <Divider />
        <Stack>
          {site.menus.map(({name, link}) => (
            <Link href={link} key={link} disableUnderline onClick={handleClose}>
              <MenuItem>{name}</MenuItem>
            </Link>
          ))}
        </Stack>
      </Box>
    </Drawer>
  )
}
