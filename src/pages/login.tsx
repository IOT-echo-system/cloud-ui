import type {NextPage} from 'next'
import type {ChangeEvent} from 'react'
import React, {useState} from 'react'
import {Stack, TextField, Typography} from '@mui/material'
import {useDispatch, useForm, useSelector} from '@/hooks'
import {AuthFormContainer} from '@/modules/login/AuthFormContainer'
import WebClient from 'web-client-starter/lib'
import {Config} from '@/config'
import {useRouter} from 'next/router'
import type {ServerError} from '@/typing/error'
import {setStorage, StorageKeys} from '@/utils/storage'
import type {User} from '@/typing/user'
import {setUser} from '@/store/actions/user'
import {Button} from '@/components'

const Login: NextPage = () => {
  const site = useSelector(state => state.site)
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
    WebClient.post<{authToken: string; user: User}>({
      baseUrl: Config.BACKEND_BASE_URL,
      path: Config.LOGIN_PATH,
      body: values
    })
      .then(({authToken, user}) => {
        setStorage(StorageKeys.AUTH, {token: authToken})
        dispatch(setUser(user))
        return router.push(Config.HOME_PAGE_PATH)
      })
      .catch((error: ServerError) => {
        setError(error.errorMessage)
      })
  }

  return (
    <AuthFormContainer onSubmit={handleSubmit(onSubmit)} className={site.theme}>
      <Stack spacing={2}>
        <Typography variant={'h5'}>{site.title} Login</Typography>
        {error && (
          <Typography variant={'body1'} color={'error'}>
            {error}
          </Typography>
        )}
        <TextField
          type={'email'}
          value={values.email}
          onChange={handleChange('email')}
          label="Email"
          variant="outlined"
          required
        />
        <TextField
          type={'password'}
          value={values.password}
          onChange={handleChange('password')}
          label="Password"
          variant="outlined"
          required
        />
        <Button
          type={'submit'}
          variant={'contained'}
          size={'large'}
          disabled={Boolean(!values.email || values.password.length < 6)}
        >
          Login
        </Button>
      </Stack>
    </AuthFormContainer>
  )
}

export default Login
