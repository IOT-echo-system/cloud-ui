import type React from 'react'
import {useState} from 'react'
import {useRouter} from 'next/router'
import type {ChangeEvent} from 'react'
import type {FormInputType} from '../../../atoms'
import {useForm} from '../../../hooks'
import AuthService from '../../../services/authService'
import type {ServerError} from '../../../typing/error'
import {Config} from '../../../config'

type UseSignUpReturnType = {
  inputFields: FormInputType[]
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  submitBtnDisabled?: boolean
  error: string
}

export const useSignUp = (): UseSignUpReturnType => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const {values, onChange, handleSubmit} = useForm({name: '', email: '', password: ''})

  const handleChange = <K extends keyof typeof values>(keyName: K) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange(keyName, event.target.value)
    }
  }

  const onSubmit = () => {
    setError('')
    AuthService.signUp(values)
      .then(() => router.push(Config.LOGIN_PAGE_PATH))
      .catch((error: ServerError) => {
        setError(error.errorMessage)
      })
  }

  const handleConfPassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setConfPassword(event.target.value)
  }
  const errorOnPassword = confPassword.length !== 0 && values.password !== confPassword

  const inputFields: FormInputType[] = [
    {value: values.name, onChange: handleChange('name'), label: 'Name', required: true},
    {type: 'email', value: values.email, onChange: handleChange('email'), label: 'Email', required: true},
    {type: 'password', value: values.password, onChange: handleChange('password'), label: 'Password', required: true},
    {
      type: 'password',
      value: confPassword,
      onChange: handleConfPassword,
      label: 'Confirm Password',
      required: true,
      error: errorOnPassword,
      helperText: errorOnPassword ? 'password and confirm password should match.' : ''
    }
  ]

  return {
    error,
    handleSubmit: handleSubmit(onSubmit),
    submitBtnDisabled: errorOnPassword,
    inputFields
  }
}
