import type React from 'react'
import type {ChangeEvent} from 'react'
import {useRouter} from 'next/router'
import type {FormInputType} from '../../../atoms'
import {useResetPassword} from '../resetPassword/useResetPassword'
import {useForm, useToast} from '../../../../hooks'
import {AuthService} from '../../../../services'
import {Config} from '../../../../config'

type UseSignUpReturnType = {
  inputFields: FormInputType[]
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  submitBtnDisabled?: boolean
}

export const useSignUp = (): UseSignUpReturnType => {
  const router = useRouter()
  const {values, onChange, handleSubmit} = useForm({name: '', email: ''})
  const {inputFields: passwordInputFields} = useResetPassword(false, '')
  const toast = useToast()

  const handleChange = <K extends keyof typeof values>(keyName: K) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange(keyName, event.target.value)
    }
  }

  const onSubmit = () => {
    const password = passwordInputFields[0].value as string
    AuthService.signUp({password, ...values})
      .then(() => router.push(Config.LOGIN_PAGE_PATH))
      .catch(toast.error)
  }

  const inputFields: FormInputType[] = [
    {value: values.name, onChange: handleChange('name'), label: 'Name', required: true},
    {type: 'email', value: values.email, onChange: handleChange('email'), label: 'Email', required: true},
    ...passwordInputFields
  ]

  return {
    handleSubmit: handleSubmit(onSubmit),
    submitBtnDisabled: inputFields.some(inputField => inputField.error),
    inputFields
  }
}
