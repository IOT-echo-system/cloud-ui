import type {PropsWithChildren} from 'react'
import React, {useState} from 'react'
import {Stack} from '@mui/material'
import type { ConfirmationModalPropsType} from '../atoms'
import {ConfirmationModal as ConfirmationModalUnit} from '../atoms'

export type GetConfirmationModalPropsTypeFunction<T extends Record<string, unknown> = Record<string, unknown>> = (
  handleClose: () => void,
  props: T
) => ConfirmationModalPropsType

type ConfirmationModalsPropsType<T extends Record<string, unknown>> = {
  getConfirmationModalDetails: GetConfirmationModalPropsTypeFunction<T>
} & T

export const ConfirmationModals = <T extends Record<string, unknown>>(
  props: PropsWithChildren<ConfirmationModalsPropsType<T>>
): React.JSX.Element => {
  const {children, getConfirmationModalDetails} = props
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  const {title, description, loading, cancelText, confirmText, onCancel, onConfirm, cancelColor, confirmColor} =
    getConfirmationModalDetails(handleClose, props)

  return (
    <Stack>
      <Stack
        onClick={() => {
          setOpen(true)
        }}
      >
        {children}
      </Stack>
      <ConfirmationModalUnit
        open={open}
        handleClose={handleClose}
        title={title}
        description={description}
        loading={loading}
        cancelText={cancelText}
        confirmText={confirmText}
        cancelColor={cancelColor}
        confirmColor={confirmColor}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </Stack>
  )
}
