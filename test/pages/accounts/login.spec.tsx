import React from 'react'
import {render} from '@testing-library/react'
import LoginPage from '@/pages/accounts/login'

jest.mock('../../../src/templates/accounts')
jest.mock('../../../src/templates/accounts/login/Login')

describe('Login page test', () => {
  beforeEach(jest.clearAllMocks)
  afterEach(jest.clearAllMocks)

  it('should match with the snapshot', () => {
    const {container} = render(<LoginPage />)

    expect(container).toMatchSnapshot()
  })
})
