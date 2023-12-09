import {render} from '@testing-library/react'
import App from '@/pages/_app'
import type {Router} from 'next/router'

describe('_App page test', () => {
  it('should match with the snapshot', () => {
    const mockRouter = {asPath: '/'} as unknown as Router
    const TestComponent = () => {
      return <div>Mock Component</div>
    }

    const {container} = render(<App router={mockRouter} Component={TestComponent} pageProps={'props'} />)

    expect(container).toMatchSnapshot()
  })
})
