import {useSignUp} from './useSignUp'
import React from 'react'
import {CenteredContainer} from '../../../atoms'
import {Form} from '../../../molecules/Form'

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
    </CenteredContainer>
  )
}
