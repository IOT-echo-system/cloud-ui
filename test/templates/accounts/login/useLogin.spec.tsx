import {act, renderHook} from '@testing-library/react'
import {useLogin} from '@/templates/accounts/login/useLogin'
import * as NextRouter from 'next/router'
import AuthService from '@/services/authService'
import type {Router} from 'next/router'
import type {ChangeEvent, FormEvent} from 'react'
import {userBuilder} from '../../../builders/stateBuilder'

describe('Use Login Hook Test', () => {
  const mockRouter = {} as unknown as Router
  beforeEach(() => {
    jest.resetAllMocks()
    jest.spyOn(NextRouter, 'useRouter').mockReturnValue(mockRouter)
  })
  afterEach(jest.resetAllMocks)

  it('should get initial values', () => {
    const {result} = renderHook(useLogin)

    expect(result.current).toStrictEqual({
      error: '',
      handleSubmit: expect.any(Function),
      inputFields: [
        {
          label: 'Email',
          onChange: expect.any(Function),
          required: true,
          type: 'email',
          value: ''
        },
        {
          label: 'Password',
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
    const {result} = renderHook(useLogin)

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
    const mockUser = userBuilder({name: 'name'})
    jest.spyOn(AuthService, 'login').mockResolvedValue(mockUser)

    const {result} = renderHook(useLogin)

    act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
      result.current.inputFields[1].onChange!({target: {value: 'password'}} as unknown as ChangeEvent<HTMLInputElement>)
    })

    await act(() => {
      result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(AuthService.login).toHaveBeenCalledTimes(1)
    expect(AuthService.login).toHaveBeenCalledWith({email: 'email', password: 'password'})
  })

  it('should give error on failure of form submit', async () => {
    jest.spyOn(AuthService, 'login').mockRejectedValue({errorMessage: 'already registered'})

    const {result} = renderHook(useLogin)

    act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
      result.current.inputFields[1].onChange!({target: {value: 'password'}} as unknown as ChangeEvent<HTMLInputElement>)
    })

    await act(() => {
      result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(AuthService.login).toHaveBeenCalledTimes(1)
    expect(AuthService.login).toHaveBeenCalledWith({email: 'email', password: 'password'})

    expect(result.current.error).toStrictEqual('already registered')
  })
})
