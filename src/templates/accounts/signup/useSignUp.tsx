import type React from 'react'
import {useState} from 'react'
import {useRouter} from 'next/router'
import type {ChangeEvent} from 'react'
import type {FormInputType} from '../../../atoms'
import {useForm} from '../../../hooks'
import AuthService from '../../../services/authService'
import type {ServerError} from '../../../typing/error'
import {Config} from '../../../config'
import {useResetPassword} from '../resetPassword/useResetPassword'

type UseSignUpReturnType = {
  inputFields: FormInputType[]
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  submitBtnDisabled?: boolean
  error: string
}

export const useSignUp = (): UseSignUpReturnType => {
  const router = useRouter()
  const [error, setError] = useState('')
  const {values, onChange, handleSubmit} = useForm({name: '', email: ''})
  const {inputFields: passwordInputFields} = useResetPassword(false, '')

  const handleChange = <K extends keyof typeof values>(keyName: K) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange(keyName, event.target.value)
    }
  }

  const onSubmit = () => {
    setError('')
    const password = passwordInputFields[0].value as string
    AuthService.signUp({password, ...values})
      .then(() => router.push(Config.LOGIN_PAGE_PATH))
      .catch((error: ServerError) => {
        setError(error.message)
      })
  }

  const inputFields: FormInputType[] = [
    {value: values.name, onChange: handleChange('name'), label: 'Name', required: true},
    {type: 'email', value: values.email, onChange: handleChange('email'), label: 'Email', required: true},
    ...passwordInputFields
  ]

  return {
    error,
    handleSubmit: handleSubmit(onSubmit),
    submitBtnDisabled: inputFields.some(inputField => inputField.error),
    inputFields
  }
}
