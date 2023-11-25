import type {NextPage} from 'next'
import type {ChangeEvent} from 'react'
import React, {useState} from 'react'
import {Stack, TextField, Typography} from '@mui/material'
import {useForm, useSelector} from '@/hooks'
import {Button} from '@/components'
import WebClient from 'web-client-starter/lib'
import {useRouter} from 'next/router'
import {Config} from '@/config'
import type {ServerError} from '@/typing/error'
import { AuthFormContainer } from '@/modules/login/AuthFormContainer'

const SignUp: NextPage = () => {
  const site = useSelector(state => state.site)
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
    WebClient.post({
      baseUrl: Config.BACKEND_BASE_URL,
      path: Config.SIGN_UP_PATH,
      body: values
    })
      .then(() => router.push('/login'))
      .catch((error: ServerError) => {
        setError(error.errorMessage)
      })
  }

  const handleConfPassword = (event: ChangeEvent<HTMLInputElement>): void => {
    setConfPassword(event.target.value)
  }

  const errorOnPassword = confPassword.length !== 0 && values.password !== confPassword

  return (
    <AuthFormContainer onSubmit={handleSubmit(onSubmit)} className={site.theme}>
      <Stack spacing={2}>
        <Typography variant={'h5'}>{site.title} Sign up</Typography>
        {error && (
          <Typography variant={'body1'} color={'error'}>
            {error}
          </Typography>
        )}
        <TextField
          value={values.name}
          onChange={handleChange('name')}
          label='Name'
          variant='outlined'
          required
        />
        <TextField
          type={'email'}
          value={values.email}
          onChange={handleChange('email')}
          label='Email'
          variant='outlined'
          required
        />
        <TextField
          type={'password'}
          value={values.password}
          onChange={handleChange('password')}
          label='Password'
          variant='outlined'
          required
        />
        <TextField
          type={'password'}
          value={confPassword}
          onChange={handleConfPassword}
          label='Confirm Password'
          variant='outlined'
          required
          error={errorOnPassword}
          helperText={errorOnPassword ? 'password and confirm password should match.' : ''}
        />
        <Button
          type={'submit'}
          variant={'contained'}
          size={'large'}
          disabled={values.password.length < 6 || values.password !== confPassword}
        >
          Sign up
        </Button>
      </Stack>
    </AuthFormContainer>
  )
}

export default SignUp
