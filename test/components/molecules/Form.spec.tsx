import {render} from '@testing-library/react'
import React from 'react'
import {Form} from '../../../src/components/molecules/Form'

describe('Form Molecules test', () => {
  it('should match with the snapshot', () => {
    const {container} = render(
      <Form inputFields={[{}]} submitBtnText={'Submit'} handleSubmit={() => ({})} title={'Form'} error={'error'} />
    )

    expect(container).toMatchSnapshot()
  })
})
