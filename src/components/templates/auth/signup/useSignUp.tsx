import type {ChangeEvent} from 'react'
import type React from 'react'
import {useState} from 'react'
import {useRouter} from 'next/router'
import type {FormInputType} from '../../../atoms'
import {useResetPassword} from '../resetPassword/useResetPassword'
import {useForm, useToast} from '../../../../hooks'
import {UserService} from '../../../../services'
import {Config} from '../../../../config'

type UseSignUpReturnType = {
  inputFields: FormInputType[]
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  submitBtnDisabled: boolean
  loading: boolean
}

export const useSignUp = (): UseSignUpReturnType => {
  const router = useRouter()
  const {values, onChange, handleSubmit} = useForm({name: '', email: ''})
  const {inputFields: passwordInputFields} = useResetPassword(false, '')
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleChange = <K extends keyof typeof values>(keyName: K) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange(keyName, event.target.value)
    }
  }

  const onSubmit = () => {
    const password = passwordInputFields[0].value as string
    setLoading(true)
    UserService.registration({password, ...values})
      .then(() => {
        toast.success('Your account has been created successfully')
        return router.push(Config.LOGIN_PAGE_PATH)
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  const inputFields: FormInputType[] = [
    {inputType: 'textField', value: values.name, onChange: handleChange('name'), label: 'Name', required: true},
    {
      inputType: 'textField',
      type: 'email',
      value: values.email,
      onChange: handleChange('email'),
      label: 'Email',
      required: true
    },
    ...passwordInputFields
  ]

  return {
    handleSubmit: handleSubmit(onSubmit),
    submitBtnDisabled: inputFields.some(inputField => inputField.error),
    inputFields,
    loading
  }
}
