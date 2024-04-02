import type {PropsWithChildren, SyntheticEvent} from 'react'
import type {FormEventHandler} from 'react'
import React from 'react'
import {Autocomplete, Stack, Typography} from '@mui/material'
import {Modal} from './Modal'
import type {FormInputType} from './FormInput'
import {FormInput} from './FormInput'
import {Button} from './StyledComponents'

export type ModalFormSelectInputType = FormInputType & {
  options: string[]
  handleChange: (event: SyntheticEvent, value: string | null) => void
}

export type ModalFormSelectPropsType = {
  formInputs: ModalFormSelectInputType[]
  submitLabel: string
  loading: boolean
  formTitle?: string
  handleSubmit: FormEventHandler<HTMLFormElement>
}
type ModalFormPropsType = {open: boolean; handleClose: () => void} & ModalFormSelectPropsType

export const ModalFormSelect: React.FC<PropsWithChildren<ModalFormPropsType>> = ({
  open,
  handleClose,
  formTitle,
  formInputs,
  submitLabel,
  loading,
  handleSubmit
}) => {
  return (
    <Modal open={open} handleClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {formTitle && <Typography variant={'h5'}>{formTitle}</Typography>}
          {formInputs.map((formInput, index) => {
            return (
              <Autocomplete
                key={`auto-complete-${index}`}
                options={formInput.options}
                onChange={formInput.handleChange}
                renderInput={params => <FormInput {...formInput} {...params} />}
                selectOnFocus
                clearOnBlur
                fullWidth
              />
            )
          })}
          <Button type={'submit'} variant={'contained'} size={'large'} loading={loading}>
            {submitLabel}
          </Button>
        </Stack>
      </form>
    </Modal>
  )
}
