import type {PropsWithChildren} from 'react'
import {useState} from 'react'
import React from 'react'
import {Stack} from '@mui/material'
import {Modal} from '../atoms'

type CustomModalPropsType = {ClickableComponent: React.JSX.Element}

export const CustomModal: React.FC<PropsWithChildren<CustomModalPropsType>> = ({children, ClickableComponent}) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Stack>
      <Stack
        sx={{cursor: 'pointer'}}
        onClick={() => {
          setOpen(true)
        }}
      >
        {ClickableComponent}
      </Stack>
      <Modal open={open} handleClose={handleClose}>
        {children}
      </Modal>
    </Stack>
  )
}
