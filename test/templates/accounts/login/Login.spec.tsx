import React from 'react'
import {render} from '@testing-library/react'
import * as UseLoginHooks from '../../../../src/templates/accounts/login/useLogin'
import {LogIn} from '../../../../src/templates/accounts'
import {Form} from '../../../../src/molecules/Form'

jest.mock('../../../../src/molecules/Form')
jest.mock('../../../../src/templates/accounts/login/useLogin')

describe('Login Template Test', () => {
  const mockUseLogin = {inputFields: [], error: '', handleSubmit: jest.fn()}

  beforeEach(() => {
    jest.resetAllMocks()

    jest.spyOn(UseLoginHooks, 'useLogin').mockReturnValue(mockUseLogin)
  })
  afterEach(jest.resetAllMocks)

  it('should match with the snapshot', () => {
    const {container} = render(<LogIn />)

    expect(UseLoginHooks.useLogin).toHaveBeenCalledTimes(1)
    expect(container).toMatchSnapshot()
    expect(Form).toHaveBeenCalledTimes(1)
    expect(Form).toHaveBeenCalledWith(
      {
        error: '',
        handleSubmit: expect.any(Function),
        inputFields: [],
        submitBtnText: 'Login',
        title: 'Login'
      },
      {}
    )
  })
})
