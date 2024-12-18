import {useRouter} from 'next/router'
import type React from 'react'
import type {ChangeEvent} from 'react'
import {useState} from 'react'
import type {FormInputType} from '../../../atoms'
import {useForm, useToast} from '../../../../hooks'
import {AuthService} from '../../../../services'
import {Config} from '../../../../config'

type UseLoginReturnType = {
  inputFields: FormInputType[]
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  loading: boolean
}
const useLogin = (): UseLoginReturnType => {
  const router = useRouter()
  const {values, onChange, handleSubmit} = useForm({email: '', password: ''})
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const handleChange = <K extends keyof typeof values>(keyName: K) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange(keyName, event.target.value)
    }
  }

  const onSubmit = () => {
    setLoading(true)
    AuthService.login(values)
      .then(() => router.push(Config.HOME_PAGE_PATH))
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  const inputFields: FormInputType[] = [
    {
      inputType: 'textField',
      type: 'email',
      value: values.email,
      onChange: handleChange('email'),
      label: 'Email',
      required: true
    },
    {
      inputType: 'textField',
      type: 'password',
      value: values.password,
      onChange: handleChange('password'),
      label: 'Password',
      required: true
    }
  ]

  return {
    handleSubmit: handleSubmit(onSubmit),
    inputFields,
    loading
  }
}

export {useLogin}
