import {act, renderHook} from '@testing-library/react'
import * as NextRouter from 'next/router'
import AuthService from '@/services/authService'
import {Router} from 'next/router'
import {ChangeEvent, FormEvent} from 'react'
import {userBuilder} from '../../../builders/stateBuilder'
import {useSignUp} from '@/templates/accounts/signup/useSignUp'

describe('Use SignUp Hook Test', () => {
  const mockRouter = {} as unknown as Router
  beforeEach(() => {
    jest.resetAllMocks()
    jest.spyOn(NextRouter, 'useRouter').mockReturnValue(mockRouter)
  })
  afterEach(jest.resetAllMocks)

  it('should get initial values', () => {
    const {result} = renderHook(useSignUp)

    expect(result.current).toStrictEqual({
      error: '',
      handleSubmit: expect.any(Function),
      submitBtnDisabled: false,
      inputFields: [
        {label: 'Name', onChange: expect.any(Function), required: true, value: ''},
        {label: 'Email', onChange: expect.any(Function), required: true, type: 'email', value: ''},
        {label: 'Password', onChange: expect.any(Function), required: true, type: 'password', value: ''},
        {
          label: 'Confirm Password',
          helperText: '',
          error: false,
          onChange: expect.any(Function),
          required: true,
          type: 'password',
          value: ''
        }
      ]
    })

    expect(NextRouter.useRouter).toHaveBeenCalledTimes(1)
    expect(NextRouter.useRouter).toHaveBeenCalledWith()
  })

  it('should update email and password value on handle change', () => {
    const {result} = renderHook(useSignUp)

    expect(result.current.inputFields[0].value).toStrictEqual('')
    expect(result.current.inputFields[1].value).toStrictEqual('')

    act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.inputFields[0].value).toStrictEqual('email')

    act(() => {
      result.current.inputFields[1].onChange!({target: {value: 'name'}} as unknown as ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.inputFields[1].value).toStrictEqual('name')
  })

  it('should submit form on handleSubmit', async () => {
    jest.spyOn(AuthService, 'signUp').mockResolvedValue()

    const {result} = renderHook(useSignUp)

    act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'name'}} as unknown as ChangeEvent<HTMLInputElement>)
      result.current.inputFields[1].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
      result.current.inputFields[2].onChange!({target: {value: 'password'}} as unknown as ChangeEvent<HTMLInputElement>)
    })

    await act(() => {
      result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(AuthService.signUp).toHaveBeenCalledTimes(1)
    expect(AuthService.signUp).toHaveBeenCalledWith({name: 'name', email: 'email', password: 'password'})
  })

  it('should give error on failure of form submit', async () => {
    jest.spyOn(AuthService, 'signUp').mockRejectedValue({errorMessage: 'already registered'})

    const {result} = renderHook(useSignUp)

    act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'name'}} as unknown as ChangeEvent<HTMLInputElement>)
      result.current.inputFields[1].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
      result.current.inputFields[2].onChange!({target: {value: 'password'}} as unknown as ChangeEvent<HTMLInputElement>)
      result.current.inputFields[3].onChange!({target: {value: 'passwo'}} as unknown as ChangeEvent<HTMLInputElement>)
    })

    await act(() => {
      result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(AuthService.signUp).toHaveBeenCalledTimes(1)
    expect(AuthService.signUp).toHaveBeenCalledWith({name: 'name', email: 'email', password: 'password'})

    expect(result.current.error).toStrictEqual('already registered')
    expect(result.current.inputFields[3].helperText).toStrictEqual('password and confirm password should match.')
  })
})
