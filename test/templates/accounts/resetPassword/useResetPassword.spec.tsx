import {act, renderHook} from '@testing-library/react'
import * as NextRouter from 'next/router'
import type {Router} from 'next/router'
import type {ChangeEvent, FormEvent} from 'react'
import {useResetPassword} from '../../../../src/templates/accounts/resetPassword/useResetPassword'
import AuthService from '../../../../src/services/authService'

describe('Use reset password Hook Test', () => {
  const mockRouter = {} as unknown as Router
  beforeEach(() => {
    jest.resetAllMocks()
    jest.spyOn(NextRouter, 'useRouter').mockReturnValue(mockRouter)
  })
  afterEach(jest.resetAllMocks)

  it('should get initial values', () => {
    const {result} = renderHook(() => useResetPassword(false, '/'))

    expect(result.current).toStrictEqual({
      error: '',
      handleSubmit: expect.any(Function),
      inputFields: [
        {
          label: 'Password',
          onChange: expect.any(Function),
          required: true,
          type: 'password',
          value: '',
          error: false,
          helperText: ''
        },
        {
          label: 'Confirm password',
          onChange: expect.any(Function),
          required: true,
          type: 'password',
          value: '',
          helperText: '',
          error: false
        }
      ]
    })

    expect(NextRouter.useRouter).toHaveBeenCalledTimes(1)
    expect(NextRouter.useRouter).toHaveBeenCalledWith()
  })

  it('should get initial values with old password', () => {
    const {result} = renderHook(() => useResetPassword(true, '/'))

    expect(result.current).toStrictEqual({
      error: '',
      handleSubmit: expect.any(Function),
      inputFields: [
        {
          label: 'Current password',
          onChange: expect.any(Function),
          required: true,
          type: 'password',
          value: ''
        },
        {
          label: 'New password',
          onChange: expect.any(Function),
          required: true,
          type: 'password',
          value: '',
          error: false,
          helperText: ''
        },
        {
          label: 'Confirm new password',
          onChange: expect.any(Function),
          required: true,
          type: 'password',
          value: '',
          helperText: '',
          error: false
        }
      ]
    })

    expect(NextRouter.useRouter).toHaveBeenCalledTimes(1)
    expect(NextRouter.useRouter).toHaveBeenCalledWith()
  })

  it('should update password and confirm password value on handle change', () => {
    const {result} = renderHook(() => useResetPassword(false, '/'))

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
    jest.spyOn(AuthService, 'resetPassword').mockResolvedValue({success: true})

    const {result} = renderHook(() => useResetPassword(false, '/'))

    act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'password'}} as unknown as ChangeEvent<HTMLInputElement>)
      result.current.inputFields[1].onChange!({target: {value: 'password'}} as unknown as ChangeEvent<HTMLInputElement>)
    })

    await act(() => {
      result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(AuthService.resetPassword).toHaveBeenCalledTimes(1)
    expect(AuthService.resetPassword).toHaveBeenCalledWith({password: 'password'})
  })

  it('should submit form on handleSubmit with old password', async () => {
    jest.spyOn(AuthService, 'resetPassword').mockResolvedValue({success: true})

    const {result} = renderHook(() => useResetPassword(true, '/'))

    act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'password'}} as unknown as ChangeEvent<HTMLInputElement>)
      result.current.inputFields[1].onChange!({target: {value: 'password'}} as unknown as ChangeEvent<HTMLInputElement>)
      result.current.inputFields[2].onChange!({target: {value: 'password'}} as unknown as ChangeEvent<HTMLInputElement>)
    })

    await act(() => {
      result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(AuthService.resetPassword).toHaveBeenCalledTimes(1)
    expect(AuthService.resetPassword).toHaveBeenCalledWith({currentPassword: 'password', password: 'password'})
  })

  it('should give error on failure of form submit', async () => {
    jest.spyOn(AuthService, 'resetPassword').mockRejectedValue({message: 'Failed to reset'})

    const {result} = renderHook(() => useResetPassword(false, '/'))

    act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'password'}} as unknown as ChangeEvent<HTMLInputElement>)
      result.current.inputFields[1].onChange!({target: {value: 'password'}} as unknown as ChangeEvent<HTMLInputElement>)
    })

    await act(() => {
      result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(AuthService.resetPassword).toHaveBeenCalledTimes(1)
    expect(AuthService.resetPassword).toHaveBeenCalledWith({password: 'password'})

    expect(result.current.error).toStrictEqual('Failed to reset')
  })
})
