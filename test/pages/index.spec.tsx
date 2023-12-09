import {render} from '@testing-library/react'
import HomePage from '../../src/pages'

describe('Home page test', () => {
  it('should match with the snapshot', () => {
    const {container} = render(<HomePage />)

    expect(container).toMatchSnapshot()
  })
})
