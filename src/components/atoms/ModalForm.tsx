import type {FormEventHandler, PropsWithChildren} from 'react'
import React from 'react'
import {Stack, Typography} from '@mui/material'
import {Modal} from './Modal'
import type {FormInputType} from './FormInput'
import {FormInput} from './FormInput'
import {Button} from './StyledComponents'

export type FormPropsType = {
  formInputs: FormInputType[]
  submitLabel: string
  loading: boolean
  formTitle?: string
  submitBtnDisabled?: boolean
  handleSubmit: FormEventHandler<HTMLFormElement>
}
type ModalFormPropsType = {open: boolean; handleClose: () => void} & FormPropsType

export const ModalForm: React.FC<PropsWithChildren<ModalFormPropsType>> = ({
  open,
  handleClose,
  formTitle,
  formInputs,
  submitLabel,
  loading,
  handleSubmit,
  submitBtnDisabled
}) => {
  return (
    <Modal open={open} handleClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {formTitle && <Typography variant={'h5'}>{formTitle}</Typography>}
          {formInputs.map((formInput, index) => {
            return <FormInput key={`form-input-${index}`} {...formInput} />
          })}
          <Button
            type={'submit'}
            variant={'contained'}
            loading={loading}
            disabled={submitBtnDisabled ?? formInputs.some(formInput => formInput.error)}
          >
            {submitLabel}
          </Button>
        </Stack>
      </form>
    </Modal>
  )
}
