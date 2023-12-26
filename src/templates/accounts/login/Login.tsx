import {useLogin} from './useLogin'
import React from 'react'
import {CenteredContainer, Link} from '../../../atoms'
import {Form} from '../../../molecules/Form'
import {Stack, Typography} from '@mui/material'
import {Config} from '../../../config'

export const LogIn: React.FC = () => {
  const {handleSubmit, error, inputFields} = useLogin()
  const title = 'Login'
  return (
    <CenteredContainer>
      <Form title={title} error={error} inputFields={inputFields} handleSubmit={handleSubmit} submitBtnText={'Login'} />
      <Stack mt={2} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          <Typography>Don't have an account?</Typography>
          <Link href={Config.SIGN_UP_PAGE_PATH}>Signup</Link>
        </Stack>
        <Link href={Config.FORGOT_PASSWORD_PAGE_PATH}>Forgot password</Link>
      </Stack>
    </CenteredContainer>
  )
}
