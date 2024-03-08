import type {PropsWithChildren} from 'react'
import React from 'react'
import {Backdrop, Box, Fade, Modal as MuiModal, styled} from '@mui/material'
import type {ResponsiveStyleValue} from '@mui/system'

type ModalProps = {width?: number | ResponsiveStyleValue<string | number>; open: boolean; handleClose: () => void}

const ModalContainer = styled(Box)(({theme}) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: theme.palette.background.paper,
  border: `2px solid ${theme.palette.grey[300]}`,
  borderRadius: '4px',
  boxShadow: theme.spacing(24),
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4)
  }
}))

export const Modal: React.FC<PropsWithChildren<ModalProps>> = ({open, handleClose, width, children}) => {
  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{backdrop: Backdrop}}
      slotProps={{backdrop: {timeout: 500}}}
    >
      <Fade in={open}>
        <ModalContainer sx={{width: width}}>{children}</ModalContainer>
      </Fade>
    </MuiModal>
  )
}
