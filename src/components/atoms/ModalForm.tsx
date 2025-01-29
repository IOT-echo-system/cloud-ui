import type {FormEventHandler} from 'react'
import React from 'react'
import {Stack, Typography} from '@mui/material'
import {Modal} from './Modal'
import type {FormInputType} from './FormInput'
import {FormInput} from './FormInput'
import {Button} from './StyledComponents'
import type {ModalFormsPropsType} from '../organisms'

type ModalFormPropsType<T extends Record<string, unknown>> = {
  open: boolean
  handleClose: () => void
} & ModalFormsPropsType<T>

export const ModalForm = <T extends Record<string, unknown>>(props: ModalFormPropsType<T>): React.JSX.Element => {
  const {open, handleClose, getFormDetails} = props

  const config = getFormDetails(handleClose, props)

  const isRequiredMissing = config.formInputs
    .filter(formInput => formInput.required)
    .some(formInput => !formInput.value)

  const isError = config.formInputs.some(formInput => formInput.error)
  const isDisabled = isRequiredMissing || isError || config.submitBtnDisabled

  return (
    <Modal open={open} handleClose={handleClose}>
      <form onSubmit={config.handleSubmit}>
        <Stack spacing={2}>
          {config.formTitle && <Typography variant={'h5'}>{config.formTitle}</Typography>}
          {config.formInputs.map((formInput, index) => {
            return <FormInput key={`form-input-${index}`} {...formInput} />
          })}
          <Stack direction={'row'} gap={2}>
            {(config.handleCancel ?? config.cancelLabel) && (
              <Button variant={'outlined'} fullWidth onClick={config.handleCancel}>
                {config.cancelLabel ?? 'Cancel'}
              </Button>
            )}
            <Button type={'submit'} variant={'contained'} loading={config.loading} fullWidth disabled={isDisabled}>
              {config.submitLabel}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Modal>
  )
}

export type FormPropsType = {
  formInputs: FormInputType[]
  submitLabel: string
  handleSubmit: FormEventHandler<HTMLFormElement>
  loading?: boolean
  formTitle?: string
  submitBtnDisabled?: boolean
  handleCancel?: () => void
  cancelLabel?: string
}
