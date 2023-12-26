import {act, renderHook} from '@testing-library/react'
import type {ChangeEvent, FormEvent} from 'react'
import {useVerifyOtp} from '../../../../src/templates/accounts/verifyOtp/useVerifyOtp'
import AuthService from '../../../../src/services/authService'

describe('Use verify otp Hook Test', () => {
  beforeEach(jest.resetAllMocks)
  afterEach(jest.resetAllMocks)

  it('should get initial values', () => {
    const {result} = renderHook(() => useVerifyOtp(jest.fn()))

    expect(result.current).toStrictEqual({
      error: '',
      handleSubmit: expect.any(Function),
      otpGenerated: false,
      resendOtp: expect.any(Function),
      countDownTimer: {
        time: 60,
        isRunning: expect.any(Function),
        pause: expect.any(Function),
        play: expect.any(Function),
        reset: expect.any(Function),
        resetAndPlay: expect.any(Function)
      },
      inputFields: [{label: 'Email', onChange: expect.any(Function), required: true, type: 'email', value: ''}]
    })
  })

  it('should update email value on handle change', () => {
    const {result} = renderHook(() => useVerifyOtp(jest.fn()))

    expect(result.current.inputFields[0].value).toStrictEqual('')

    act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.inputFields[0].value).toStrictEqual('email')
  })

  it('should generate otp on handleSubmit', async () => {
    jest.spyOn(AuthService, 'generateOTP').mockResolvedValue({success: true, otpId: 'otpId', generatedAt: new Date()})

    const {result} = renderHook(() => useVerifyOtp(jest.fn()))

    act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
    })

    await act(async () => {
      await result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(AuthService.generateOTP).toHaveBeenCalledTimes(1)
    expect(AuthService.generateOTP).toHaveBeenCalledWith('email')
  })

  it('should give error on generate otp on submit', async () => {
    jest.spyOn(AuthService, 'generateOTP').mockRejectedValue({message: 'Failed to generate otp'})

    const {result} = renderHook(() => useVerifyOtp(jest.fn()))

    await act(() => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
    })

    await act(() => {
      result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(AuthService.generateOTP).toHaveBeenCalledTimes(1)
    expect(AuthService.generateOTP).toHaveBeenCalledWith('email')

    expect(result.current.error).toStrictEqual('Failed to generate otp')
  })

  it('should get state for verify otp', async () => {
    jest.spyOn(AuthService, 'generateOTP').mockResolvedValue({success: true, otpId: 'otpId', generatedAt: new Date()})

    const {result} = renderHook(() => useVerifyOtp(jest.fn()))

    await act(async () => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
      await result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(result.current).toStrictEqual({
      error: '',
      handleSubmit: expect.any(Function),
      otpGenerated: true,
      resendOtp: expect.any(Function),
      countDownTimer: {
        time: 60,
        isRunning: expect.any(Function),
        pause: expect.any(Function),
        play: expect.any(Function),
        reset: expect.any(Function),
        resetAndPlay: expect.any(Function)
      },
      inputFields: [
        {type: 'email', value: 'email', onChange: expect.any(Function), label: 'Email', required: true, disabled: true},
        {type: 'number', value: '', onChange: expect.any(Function), label: 'Enter OTP', required: true}
      ]
    })
  })

  it('should update otp on change', async () => {
    jest.spyOn(AuthService, 'generateOTP').mockResolvedValue({success: true, otpId: 'otpId', generatedAt: new Date()})

    const {result} = renderHook(() => useVerifyOtp(jest.fn()))

    await act(async () => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
      await result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    await act(() =>
      result.current.inputFields[1].onChange!({target: {value: '123456'}} as unknown as ChangeEvent<HTMLInputElement>)
    )

    expect(result.current.inputFields[1].value).toStrictEqual('123456')
  })

  it('should verify otp on handleSubmit', async () => {
    const callback = jest.fn()
    jest.spyOn(AuthService, 'generateOTP').mockResolvedValue({success: true, otpId: 'otpId', generatedAt: new Date()})
    jest.spyOn(AuthService, 'verifyOTP').mockResolvedValue({success: true, token: 'token'})

    const {result} = renderHook(() => useVerifyOtp(callback))

    await act(async () => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
      await result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    await act(() => {
      result.current.inputFields[1].onChange!({target: {value: '123456'}} as unknown as ChangeEvent<HTMLInputElement>)
    })

    await act(async () => {
      await result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    expect(AuthService.verifyOTP).toHaveBeenCalledTimes(1)
    expect(AuthService.verifyOTP).toHaveBeenCalledWith({email: 'email', otp: '123456', otpId: 'otpId'})
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(true)
  })

  it('should resend otp', async () => {
    jest.spyOn(AuthService, 'generateOTP').mockResolvedValue({success: true, otpId: 'otpId', generatedAt: new Date()})

    const {result} = renderHook(() => useVerifyOtp(jest.fn()))

    await act(async () => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
      await result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    await act(async () => {
      await result.current.resendOtp()
    })

    expect(AuthService.generateOTP).toHaveBeenCalledTimes(2)
    expect(AuthService.generateOTP).toHaveBeenCalledWith('email')
  })

  it('should resend otp', async () => {
    jest.spyOn(AuthService, 'generateOTP').mockRejectedValue({message: 'Wait util 60 seconds to generate new OTP'})

    const {result} = renderHook(() => useVerifyOtp(jest.fn()))

    await act(async () => {
      result.current.inputFields[0].onChange!({target: {value: 'email'}} as unknown as ChangeEvent<HTMLInputElement>)
      await result.current.handleSubmit({preventDefault: jest.fn()} as unknown as FormEvent<HTMLFormElement>)
    })

    await act(async () => {
      await result.current.resendOtp()
    })

    expect(AuthService.generateOTP).toHaveBeenCalledTimes(2)
    expect(AuthService.generateOTP).toHaveBeenCalledWith('email')

    expect(result.current.error).toStrictEqual('Wait util 60 seconds to generate new OTP')
  })
})
