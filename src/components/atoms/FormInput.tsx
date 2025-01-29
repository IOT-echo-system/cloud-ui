import React, {type SyntheticEvent} from 'react'
import type {TextFieldProps} from '@mui/material'
import {Autocomplete, TextField} from '@mui/material'

export type FormSelectOption = {label: string; value: string}
export type FormSelectInputType = TextFieldProps & {
  inputType: 'selectField'
  options: FormSelectOption[]
  handleChange: <T>(value: T) => void
}

type FormInputTypeMap = {
  textField: TextFieldProps & {inputType: 'textField'}
  selectField: FormSelectInputType
}

export type FormInputType<P extends keyof FormInputTypeMap = keyof FormInputTypeMap> = FormInputTypeMap[P]

export const FormInput: React.FC<FormInputType> = props => {
  const {inputType, ...formInput} = props
  if (inputType === 'selectField') {
    const {options, handleChange, ...selectInput} = formInput as FormSelectInputType
    const onChange = (_event: SyntheticEvent, option: FormSelectOption | null) => {
      if (option !== null) {
        handleChange(option.value)
      }
    }

    const allOptions = options.find(option => option.value === '')
      ? options
      : [{label: 'Select an option', value: ''}, ...options]

    return (
      <Autocomplete
        options={allOptions}
        onChange={onChange}
        value={allOptions.find(option => option.value === selectInput.value)}
        getOptionKey={option => option.value}
        getOptionLabel={option => option.label}
        getOptionDisabled={option => !option.value}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={params => <TextField {...selectInput} {...params} />}
        selectOnFocus
        autoSelect
        clearOnBlur
        fullWidth
      />
    )
  }
  return <TextField variant={formInput.variant ?? 'outlined'} {...formInput} />
}
