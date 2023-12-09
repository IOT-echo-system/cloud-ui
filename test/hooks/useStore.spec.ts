import {renderHook} from '@testing-library/react'
import {useDispatch, useSelector} from '@/hooks/useStore'
import type {ServerContextJSONValue} from 'react'
import React from 'react'
import {GlobalContext} from '@/store/configureStore'

describe('UseStore Hook Test', () => {
  beforeEach(jest.resetAllMocks)
  afterEach(jest.resetAllMocks)

  it('should get the selector', () => {
    jest.spyOn(React, 'useContext').mockReturnValue({state: {searchTerm: 'cloud'}})
    const mockCallback = jest.fn().mockReturnValue({searchTerm: 'cloud'})

    const {result} = renderHook(useSelector, {initialProps: mockCallback})

    expect(result.current).toStrictEqual({searchTerm: 'cloud'})
    expect(React.useContext).toHaveBeenCalledTimes(1)
    expect(React.useContext).toHaveBeenCalledWith(GlobalContext)
    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveBeenCalledWith({searchTerm: 'cloud'})
  })

  it('should get the dispatcher', () => {
    const mockDispatch = jest.fn()
    const context = {dispatch: mockDispatch} as unknown as ServerContextJSONValue
    jest.spyOn(React, 'useContext').mockReturnValue(context)

    const {result} = renderHook(useDispatch)

    expect(result.current).toStrictEqual(mockDispatch)
    expect(React.useContext).toHaveBeenCalledTimes(1)
    expect(React.useContext).toHaveBeenCalledWith(GlobalContext)
  })
})
