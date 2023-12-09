import {useLogin} from './useLogin'
import React from 'react'
import {CenteredContainer} from '../../../atoms'
import {Form} from '../../../molecules/Form'

export const LogIn: React.FC = () => {
  const {handleSubmit, error, inputFields} = useLogin()
  const title = 'Login'
  return (
    <CenteredContainer>
      <Form title={title} error={error} inputFields={inputFields} handleSubmit={handleSubmit} submitBtnText={'Login'} />
    </CenteredContainer>
  )
}
