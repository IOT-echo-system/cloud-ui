import React from 'react'
import {render} from '@testing-library/react'
import * as UseLoginHooks from '../../../../src/templates/accounts/login/useLogin'
import {LogIn} from '../../../../src/templates/accounts'
import {Form} from '../../../../src/molecules/Form'
import * as MediaHook from '../../../../src/hooks/useMedia'

jest.mock('../../../../src/molecules/Form')
jest.mock('../../../../src/templates/accounts/login/useLogin')
jest.mock('../../../../src/hooks/useMedia')

describe('Login Template Test', () => {
  const mockUseLogin = {inputFields: [], error: '', handleSubmit: jest.fn()}

  beforeEach(() => {
    jest.resetAllMocks()

    jest.spyOn(UseLoginHooks, 'useLogin').mockReturnValue(mockUseLogin)
  })
  afterEach(jest.resetAllMocks)

  it('should match with the snapshot', () => {
    jest.spyOn(MediaHook, 'useMedia').mockReturnValue({md: true, sm: true, xl: false, xxl: false, lg: false})

    const {container} = render(<LogIn />)

    expect(UseLoginHooks.useLogin).toHaveBeenCalledTimes(1)
    expect(container).toMatchSnapshot()
    expect(MediaHook.useMedia).toBeCalledTimes(1)
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

  it('should match with the snapshot for mobile', () => {
    jest.spyOn(MediaHook, 'useMedia').mockReturnValue({md: false, sm: true, xl: false, xxl: false, lg: false})

    const {container} = render(<LogIn />)

    expect(UseLoginHooks.useLogin).toHaveBeenCalledTimes(1)
    expect(container).toMatchSnapshot()
    expect(MediaHook.useMedia).toBeCalledTimes(1)
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
