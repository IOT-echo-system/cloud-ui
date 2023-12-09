import {useRouter} from 'next/router'
import {ChangeEvent, useState} from 'react'
import {useDispatch, useForm} from '../../../hooks'
import {Config} from '@/config'
import {ServerError} from '@/typing/error'
import {FormInputType} from '@/atoms'
import AuthService from '@/services/authService'
import {setUser} from '@/store/actions/user'

const useLogin = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const {values, onChange, handleSubmit} = useForm({email: '', password: ''})

  const handleChange = <K extends keyof typeof values>(keyName: K) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange(keyName, event.target.value)
    }
  }

  const onSubmit = () => {
    setError('')
    AuthService.login(values)
      .then(user => {
        dispatch(setUser(user))
        return router.push(Config.HOME_PAGE_PATH)
      })
      .catch((error: ServerError) => setError(error.errorMessage))
  }

  const inputFields: Array<FormInputType> = [
    {type: 'email', value: values.email, onChange: handleChange('email'), label: 'Email', required: true},
    {type: 'password', value: values.password, onChange: handleChange('password'), label: 'Password', required: true}
  ]

  return {
    error,
    handleSubmit: handleSubmit(onSubmit),
    inputFields
  }
}

export {useLogin}
