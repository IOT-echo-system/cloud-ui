import {useSignUp} from './useSignUp'
import React from 'react'
import {CenteredContainer, Link} from '../../../atoms'
import {Form} from '../../../molecules/Form'
import {Stack, Typography} from '@mui/material'
import {Config} from '../../../config'

export const SignUp: React.FC = () => {
  const title = 'Sign up'
  const {handleSubmit, error, submitBtnDisabled, inputFields} = useSignUp()

  return (
    <CenteredContainer>
      <Form
        title={title}
        error={error}
        inputFields={inputFields}
        handleSubmit={handleSubmit}
        submitBtnText={'Sign up'}
        submitBtnDisabled={submitBtnDisabled}
      />
      <Stack mt={2} direction={'row'} spacing={1} alignItems={'center'}>
        <Typography>Already have an account?</Typography>
        <Link href={Config.LOGIN_PAGE_PATH}>Login</Link>
      </Stack>
    </CenteredContainer>
  )
}
