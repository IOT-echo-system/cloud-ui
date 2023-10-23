import type {NextPage} from 'next'
import type {ChangeEvent} from 'react'
import React, {useState} from 'react'
import {Button, Stack, TextField, styled, Typography} from '@mui/material'
import {useForm, useSelector} from '@/hooks'

const Login: NextPage = () => {
  const site = useSelector(state => state.site)
  const [error, setError] = useState('')
  const {values, onChange, handleSubmit} = useForm({email: '', password: ''})

  const handleChange = <K extends keyof typeof values>(keyName: K) => {
    return (event: ChangeEvent<HTMLInputElement>) => {
      onChange(keyName, event.target.value)
    }
  }

  const onSubmit = () => {
    setError('')
    // AuthorGateway.login(values)
    //   .then(token => {
    //     setStorage(StorageKeys.AUTH, token)
    //     return router.push('/author')
    //   })
    //   .catch((error: ServerError) => {
    //     setError(error.errorMessage)
    //   })
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} className={site.theme}>
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
        <Button type={'submit'} variant={'contained'} size={'large'}>
          Login
        </Button>
      </Stack>
    </FormContainer>
  )
}

export default Login

const FormContainer = styled('form')(({theme}) => ({
  margin: theme.spacing(4, 'auto'),
  background: theme.palette.background.paper,
  padding: theme.spacing(4),
  boxShadow: theme.shadows[1],
  borderRadius: theme.spacing(1),
  width: theme.spacing(60),
  '&>*': {
    margin: theme.spacing(1.5)
  },
  '&.light': {
    border: `1px solid ${theme.palette.grey[300]}`
  },
  '&.dark': {
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.grey[700]}`
  }
}))
