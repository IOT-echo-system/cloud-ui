import React from 'react'
import {render} from '@testing-library/react'
import * as UseSignUpHooks from '../../../../src/templates/accounts/signup/useSignUp'
import {SignUp} from '../../../../src/templates/accounts'
import {Form} from '../../../../src/molecules/Form'

jest.mock('../../../../src/molecules/Form')
jest.mock('../../../../src/templates/accounts/signup/useSignUp')

describe('SignUp Template Test', () => {
  beforeEach(() => {
    jest.resetAllMocks()

    jest
      .spyOn(UseSignUpHooks, 'useSignUp')
      .mockReturnValue({inputFields: [], error: '', handleSubmit: jest.fn(), submitBtnDisabled: false})
  })

  afterEach(jest.resetAllMocks)

  it('should match with the snapshot', () => {
    const {container} = render(<SignUp />)

    expect(container).toMatchSnapshot()

    expect(UseSignUpHooks.useSignUp).toHaveBeenCalledTimes(1)
    expect(Form).toHaveBeenCalledTimes(1)
    expect(Form).toHaveBeenCalledWith(
      {
        error: '',
        handleSubmit: expect.any(Function),
        inputFields: [],
        submitBtnText: 'Sign up',
        title: 'Sign up',
        submitBtnDisabled: false
      },
      {}
    )
  })
})
