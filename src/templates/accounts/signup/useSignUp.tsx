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
  const [errorOnPassword, setErrorOnPassword] = useState(false)
  const [passwordHelperText, setPasswordHelperText] = useState('')

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
        setError(error.message)
      })
  }

  const handleConfPassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setConfPassword(event.target.value)
  }
  const errorOnConfirmPassword = confPassword.length !== 0 && values.password !== confPassword

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const password = event.target.value
    onChange('password', password)
    if (password.length < 8) {
      setPasswordHelperText('Password must be at least 8 characters long')
      setErrorOnPassword(true)
      return
    }

    if (!/[A-Z]/.test(password)) {
      setPasswordHelperText('Password must contain at least one uppercase letter')
      setErrorOnPassword(true)
      return
    }

    if (!/[a-z]/.test(password)) {
      setPasswordHelperText('Password must contain at least one lowercase letter')
      setErrorOnPassword(true)
      return
    }

    if (!/\d/.test(password)) {
      setPasswordHelperText('Password must contain at least one digit')
      setErrorOnPassword(true)
      return
    }

    setPasswordHelperText('')
    setErrorOnPassword(false)
  }

  const inputFields: FormInputType[] = [
    {value: values.name, onChange: handleChange('name'), label: 'Name', required: true},
    {type: 'email', value: values.email, onChange: handleChange('email'), label: 'Email', required: true},
    {
      type: 'password',
      value: values.password,
      onChange: handlePasswordChange,
      label: 'Password',
      required: true,
      error: errorOnPassword,
      helperText: passwordHelperText
    },
    {
      type: 'password',
      value: confPassword,
      onChange: handleConfPassword,
      label: 'Confirm Password',
      required: true,
      error: errorOnConfirmPassword,
      helperText: errorOnConfirmPassword ? 'password and confirm password should match.' : ''
    }
  ]

  return {
    error,
    handleSubmit: handleSubmit(onSubmit),
    submitBtnDisabled: errorOnConfirmPassword,
    inputFields
  }
}
