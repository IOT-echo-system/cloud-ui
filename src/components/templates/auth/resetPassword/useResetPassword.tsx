import {useRouter} from 'next/router'
import type React from 'react'
import type {ChangeEvent} from 'react'
import {useState} from 'react'
import type {FormInputType} from '../../../atoms'
import {useForm, useToast} from '../../../../hooks'
import {AuthService} from '../../../../services'

type UseLoginReturnType = {
  inputFields: FormInputType[]
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const useResetPassword = (withOldPassword: boolean, redirectTo: string): UseLoginReturnType => {
  const router = useRouter()
  const initValues = withOldPassword ? {currentPassword: '', password: ''} : {password: ''}
  const [confirmPassword, setConfirmPassword] = useState('')
  const {values, onChange, handleSubmit} = useForm(initValues)
  const [errorOnPassword, setErrorOnPassword] = useState(false)
  const [passwordHelperText, setPasswordHelperText] = useState('')
  const toast = useToast()

  const handleChange = <K extends keyof typeof values>(keyName: K) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange(keyName, event.target.value)
    }
  }

  const onSubmit = () => {
    AuthService.resetPassword(values)
      .then(() => router.push(redirectTo))
      .catch(toast.error)
  }

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

  const errorOnConfirmPassword = confirmPassword.length !== 0 && values.password !== confirmPassword

  const inputFields: FormInputType[] = [
    {
      inputType: 'textField',
      type: 'password',
      value: values.password,
      onChange: handlePasswordChange,
      label: 'Password',
      required: true,
      error: errorOnPassword,
      helperText: passwordHelperText
    },
    {
      inputType: 'textField',
      type: 'password',
      value: confirmPassword,
      onChange: (event: ChangeEvent<HTMLInputElement>): void => {
        setConfirmPassword(event.target.value)
      },
      label: 'Confirm password',
      required: true,
      error: errorOnConfirmPassword,
      helperText: errorOnConfirmPassword ? 'password and confirm password should match.' : ''
    }
  ]

  const inputFieldsWithOldPassword: FormInputType[] = [
    {
      inputType: 'textField',
      type: 'password',
      value: values.currentPassword,
      onChange: handleChange('currentPassword'),
      label: 'Current password',
      required: true
    },
    {
      inputType: 'textField',
      type: 'password',
      value: values.password,
      onChange: handlePasswordChange,
      label: 'New password',
      required: true,
      error: errorOnPassword,
      helperText: passwordHelperText
    },
    {
      inputType: 'textField',
      type: 'password',
      value: confirmPassword,
      onChange: (event: ChangeEvent<HTMLInputElement>): void => {
        setConfirmPassword(event.target.value)
      },
      label: 'Confirm new password',
      required: true,
      error: errorOnConfirmPassword,
      helperText: errorOnConfirmPassword ? 'password and confirm password should match.' : ''
    }
  ]

  return {
    handleSubmit: handleSubmit(onSubmit),
    inputFields: withOldPassword ? inputFieldsWithOldPassword : inputFields
  }
}

export {useResetPassword}
