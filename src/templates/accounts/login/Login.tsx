import {useLogin} from './useLogin'
import React from 'react'
import {Form} from '@/molecules/Form'
import {CenteredContainer} from '@/atoms'

export const LogIn: React.FC = () => {
  const {handleSubmit, error, inputFields} = useLogin()
  const title = 'Login'
  return (
    <CenteredContainer>
      <Form title={title} error={error} inputFields={inputFields} handleSubmit={handleSubmit} submitBtnText={'Login'} />
    </CenteredContainer>
  )
}
