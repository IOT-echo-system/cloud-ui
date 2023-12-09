import {render} from '@testing-library/react'
import {Layout} from '@/organisms/Layout'

describe('Layout component test', () => {
  it('should match with the snapshot', () => {
    const {container} = render(<Layout />)

    expect(container).toMatchSnapshot()
  })
})
