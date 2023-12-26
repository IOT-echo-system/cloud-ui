import WebClient from 'web-client-starter'
import {AuthService} from '../../src/services'

describe('Auth Service Test', () => {
  beforeEach(jest.clearAllMocks)

  it('should login', async () => {
    jest.spyOn(WebClient, 'post').mockResolvedValue({token: ''})

    await AuthService.login({email: '', password: ''})

    expect(WebClient.post).toHaveBeenCalledTimes(1)
    expect(WebClient.post).toHaveBeenCalledWith({
      baseUrl: '/auth',
      body: {email: '', password: ''},
      path: '/login'
    })
  })

  it('should signup', async () => {
    jest.spyOn(WebClient, 'post').mockResolvedValue({email: 'email', name: 'name', userId: 'userId'})

    const response = await AuthService.signUp({email: '', password: '', name: 'name'})

    expect(response).toStrictEqual({email: 'email', name: 'name', userId: 'userId'})
    expect(WebClient.post).toHaveBeenCalledTimes(1)
    expect(WebClient.post).toHaveBeenCalledWith({
      baseUrl: '/auth',
      body: {email: '', password: '', name: 'name'},
      path: '/sign-up'
    })
  })

  it('should generate otp', async () => {
    jest.spyOn(WebClient, 'post').mockResolvedValue({otpId: 'otpId', success: true})

    const response = await AuthService.generateOTP('email')

    expect(response).toStrictEqual({otpId: 'otpId', success: true})
    expect(WebClient.post).toHaveBeenCalledTimes(1)
    expect(WebClient.post).toHaveBeenCalledWith({
      baseUrl: '/auth',
      body: {email: 'email'},
      path: '/generate-otp'
    })
  })

  it('should verify otp', async () => {
    jest.spyOn(WebClient, 'post').mockResolvedValue({token: 'token', success: true})

    const response = await AuthService.verifyOTP({otp: '123456', otpId: 'otpId'})

    expect(response).toStrictEqual({token: 'token', success: true})
    expect(WebClient.post).toHaveBeenCalledTimes(1)
    expect(WebClient.post).toHaveBeenCalledWith({
      baseUrl: '/auth',
      body: {otp: '123456', otpId: 'otpId'},
      path: '/verify-otp'
    })
  })

  it('should reset password', async () => {
    jest.spyOn(WebClient, 'post').mockResolvedValue({success: true})

    const response = await AuthService.resetPassword({password: 'password'})

    expect(response).toStrictEqual({success: true})
    expect(WebClient.post).toHaveBeenCalledTimes(1)
    expect(WebClient.post).toHaveBeenCalledWith({
      baseUrl: '/auth',
      body: {password: 'password'},
      path: '/reset-password'
    })
  })
})
