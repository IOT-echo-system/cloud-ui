import {Button} from '@mui/material'
import {render} from '@testing-library/react'
import {CenteredContainer, FormContainer} from '../../src/atoms'

describe('Styled component test', () => {
  it('should match with the snapshot for Button', () => {
    const {container} = render(<Button />)

    expect(container).toMatchSnapshot()
  })

  it('should match with the snapshot for Centered Container', () => {
    const {container} = render(<CenteredContainer />)

    expect(container).toMatchSnapshot()
  })

  it('should match with the snapshot for FormContainer', () => {
    const {container} = render(<FormContainer />)

    expect(container).toMatchSnapshot()
  })
})
