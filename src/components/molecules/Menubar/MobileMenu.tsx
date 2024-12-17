import * as React from 'react'
import {Box, Divider, Drawer, IconButton, MenuItem, Stack, Typography} from '@mui/material'
import {Close} from '@mui/icons-material'
import {useSelector} from '../../../hooks'
import {Link} from '../../atoms'
import {Config} from '../../../config'

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
        <Link href={Config.PROJECT_PAGE_PATH} underline={'false'} onClick={handleClose}>
          <Stack m={2} flexWrap={'wrap'}>
            <Typography variant={'h5'} component={'div'}>
              {project.name}
            </Typography>
            <Typography variant={'subtitle1'} component={'div'}>
              Project Id: {project.projectId}
            </Typography>
          </Stack>
        </Link>
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
