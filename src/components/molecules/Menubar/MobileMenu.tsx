import * as React from 'react'
import {Box, Divider, Drawer, IconButton, Stack, Typography} from '@mui/material'
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
