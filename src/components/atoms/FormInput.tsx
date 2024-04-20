import React, {type SyntheticEvent} from 'react'
import type {TextFieldProps} from '@mui/material'
import {Autocomplete} from '@mui/material'
import {TextField} from '@mui/material'

type Option = {label: string; value: string}
export type FormSelectInputType = TextFieldProps & {
  options: Option[]
  handleChange: (event: SyntheticEvent, value: Option | null) => void
}

type FormInputTypeMap = {
  textField: TextFieldProps & {inputType: 'textField'}
  selectField: FormSelectInputType & {
    inputType: 'selectField'
  }
}

export type FormInputType<P extends keyof FormInputTypeMap = keyof FormInputTypeMap> = FormInputTypeMap[P]

export const FormInput: React.FC<FormInputType> = props => {
  const {inputType, ...formInput} = props
  if (inputType === 'selectField') {
    const {options, handleChange, ...selectInput} = formInput as FormSelectInputType
    return (
      <Autocomplete
        options={options}
        onChange={handleChange}
        getOptionLabel={option => option.label}
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
