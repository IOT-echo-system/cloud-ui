import WebClient from 'web-client-starter'
import AuthService from '../../src/services/authService'

describe('Auth Service Test', () => {
  beforeEach(jest.clearAllMocks)

  it('should login', async () => {
    jest.spyOn(WebClient, 'post').mockResolvedValue({authToken: '', user: {name: 'name'}})

    const user = await AuthService.login({email: '', password: ''})

    expect(user).toStrictEqual({name: 'name'})
    expect(WebClient.post).toHaveBeenCalledTimes(1)
    expect(WebClient.post).toHaveBeenCalledWith({
      baseUrl: '/api',
      body: {email: '', password: ''},
      path: '/authentications/login'
    })
  })

  it('should signup', async () => {
    jest.spyOn(WebClient, 'post').mockResolvedValue(undefined)

    await AuthService.signUp({email: '', password: '', name: 'name'})

    expect(WebClient.post).toHaveBeenCalledTimes(1)
    expect(WebClient.post).toHaveBeenCalledWith({
      baseUrl: '/api',
      body: {email: '', password: '', name: 'name'},
      path: '/authentications/sign-up'
    })
  })
})
