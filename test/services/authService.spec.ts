// import {AuthService} from '../../src/services'
// import * as UseToastHook from '../../src/hooks/useToast'
// import * as InitWebClient from '../../src/services/webClient'
// import type {Toast} from '../../src/hooks'
// import type WebClient from 'web-client-starter'
//
// jest.mock('../../src/hooks/useToast')
// jest.mock('../../src/services/webClient')
//
// describe('Auth Service Test', () => {
//   let authService: ReturnType<typeof AuthService>
//   const mockToast: Toast = {error: jest.fn(), success: jest.fn(), warning: jest.fn(), info: jest.fn()}
//   const MockPost = jest.fn()
//   const MockGet = jest.fn()
//   const MockWebClient = {post: MockPost, get: MockGet} as unknown as typeof WebClient
//   beforeEach(() => {
//     jest.clearAllMocks()
//     jest.spyOn(UseToastHook, 'useToast').mockReturnValue(mockToast)
//     jest.spyOn(InitWebClient, 'initWebClient').mockReturnValue(MockWebClient)
//     authService = AuthService()
//   })
//
//   it('should login', async () => {
//     MockPost.mockResolvedValue({token: ''})
//
//     await authService.login({email: '', password: ''})
//
//     expect(MockPost).toHaveBeenCalledTimes(1)
//     expect(MockPost).toHaveBeenCalledWith({
//       baseUrl: '/auth',
//       body: {email: '', password: ''},
//       path: '/login'
//     })
//   })
//
//   it('should signup', async () => {
//     jest.spyOn(MockWebClient, 'post').mockResolvedValue({email: 'email', name: 'name', userId: 'userId'})
//
//     const response = await authService.signUp({email: '', password: '', name: 'name'})
//
//     expect(response).toStrictEqual({email: 'email', name: 'name', userId: 'userId'})
//     expect(MockWebClient.post).toHaveBeenCalledTimes(1)
//     expect(MockWebClient.post).toHaveBeenCalledWith({
//       baseUrl: '/auth',
//       body: {email: '', password: '', name: 'name'},
//       path: '/sign-up'
//     })
//   })
//
//   it('should generate otp', async () => {
//     jest.spyOn(MockWebClient, 'post').mockResolvedValue({otpId: 'otpId', success: true})
//
//     const response = await authService.generateOTP('email')
//
//     expect(response).toStrictEqual({otpId: 'otpId', success: true})
//     expect(MockWebClient.post).toHaveBeenCalledTimes(1)
//     expect(MockWebClient.post).toHaveBeenCalledWith({
//       baseUrl: '/auth',
//       body: {email: 'email'},
//       path: '/generate-otp'
//     })
//   })
//
//   it('should verify otp', async () => {
//     jest.spyOn(MockWebClient, 'post').mockResolvedValue({token: 'token', success: true})
//
//     const response = await authService.verifyOTP({otp: '123456', otpId: 'otpId'})
//
//     expect(response).toStrictEqual({token: 'token', success: true})
//     expect(MockWebClient.post).toHaveBeenCalledTimes(1)
//     expect(MockWebClient.post).toHaveBeenCalledWith({
//       baseUrl: '/auth',
//       body: {otp: '123456', otpId: 'otpId'},
//       path: '/verify-otp'
//     })
//   })
//
//   it('should reset password', async () => {
//     jest.spyOn(MockWebClient, 'post').mockResolvedValue({success: true})
//
//     const response = await authService.resetPassword({password: 'password'})
//
//     expect(response).toStrictEqual({success: true})
//     expect(MockWebClient.post).toHaveBeenCalledTimes(1)
//     expect(MockWebClient.post).toHaveBeenCalledWith({
//       baseUrl: '/auth',
//       body: {password: 'password'},
//       path: '/reset-password'
//     })
//   })
//
//   it('should validate user', async () => {
//     jest.spyOn(MockWebClient, 'get').mockResolvedValue({userId: 'userId'})
//
//     const response = await authService.validate()
//
//     expect(response).toStrictEqual({userId: 'userId'})
//     expect(MockWebClient.get).toHaveBeenCalledTimes(1)
//     expect(MockWebClient.get).toHaveBeenCalledWith({
//       baseUrl: '/auth',
//       path: '/validate'
//     })
//   })
// })
