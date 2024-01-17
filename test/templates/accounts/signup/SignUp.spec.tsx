import React from 'react'
import {render} from '@testing-library/react'
import * as UseSignUpHooks from '../../../../src/templates/accounts/signup/useSignUp'
import {SignUp} from '../../../../src/templates/accounts'
import {Form} from '../../../../src/molecules/Form'
import * as MediaHook from '../../../../src/hooks/useMedia'

jest.mock('../../../../src/molecules/Form')
jest.mock('../../../../src/templates/accounts/signup/useSignUp')
jest.mock('../../../../src/hooks/useMedia')

describe('SignUp Template Test', () => {
  beforeEach(() => {
    jest.resetAllMocks()

    jest
      .spyOn(UseSignUpHooks, 'useSignUp')
      .mockReturnValue({inputFields: [], error: '', handleSubmit: jest.fn(), submitBtnDisabled: false})
  })

  afterEach(jest.resetAllMocks)

  it('should match with the snapshot', () => {
    jest.spyOn(MediaHook, 'useMedia').mockReturnValue({md: true, sm: true, xl: false, xxl: false, lg: false})

    const {container} = render(<SignUp />)

    expect(container).toMatchSnapshot()

    expect(UseSignUpHooks.useSignUp).toHaveBeenCalledTimes(1)
    expect(MediaHook.useMedia).toHaveBeenCalledTimes(1)
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

  it('should match with the snapshot for mobile', () => {
    jest.spyOn(MediaHook, 'useMedia').mockReturnValue({md: false, sm: true, xl: false, xxl: false, lg: false})

    const {container} = render(<SignUp />)

    expect(container).toMatchSnapshot()

    expect(UseSignUpHooks.useSignUp).toHaveBeenCalledTimes(1)
    expect(MediaHook.useMedia).toHaveBeenCalledTimes(1)
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
