import {render} from '@testing-library/react'
import SignUpPage from '../../../src/pages/accounts/signup'

jest.mock('../../../src/templates/accounts')
jest.mock('../../../src/templates/accounts/signup/SignUp')

describe('SignUp page test', () => {
  beforeEach(jest.clearAllMocks)
  afterEach(jest.clearAllMocks)

  it('should match with the snapshot', () => {
    const {container} = render(<SignUpPage />)

    expect(container).toMatchSnapshot()
  })
})
