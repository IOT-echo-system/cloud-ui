import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import {IconButton, Stack, Typography} from '@mui/material'
import {Close} from '@mui/icons-material'
import {useSelector} from '../../../hooks'

type MobileMenuPropsType = {open: boolean; handleClose: () => void}

export const MobileMenu: React.FC<MobileMenuPropsType> = ({open, handleClose}) => {
  const {project} = useSelector(state => state)
  return (
    <Drawer open={open} onClose={handleClose}>
      <Box sx={{width: 250}} role="presentation">
        <Stack direction={'row'} justifyContent={'end'} m={1}>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
        <Divider />
        <Stack m={1} flexWrap={'wrap'}>
          <Typography variant={'h5'} component={'div'}>
            {project.name}
          </Typography>
          <Typography variant={'subtitle1'} component={'div'}>
            Project Id: {project.projectId}
          </Typography>
        </Stack>
        <Divider />
      </Box>
    </Drawer>
  )
}
