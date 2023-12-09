import {act, renderHook} from '@testing-library/react'

import type {FormEvent} from 'react'
import {useForm} from '../../src/hooks'

describe('useForm hook test', () => {
  it('should get initial values', () => {
    const {result} = renderHook(() => useForm({name: 'value'}))

    expect(result.current.values).toStrictEqual({name: 'value'})
  })

  it('should update values on change', () => {
    const {result} = renderHook(() => useForm({name: 'value'}))

    act(() => {
      result.current.onChange('name', 'updatedValue')
    })

    expect(result.current.values).toStrictEqual({name: 'updatedValue'})
  })

  it('should clear values on clear', () => {
    const {result} = renderHook(() => useForm({name: 'value'}))

    act(() => {
      result.current.onChange('name', 'updatedValue')
    })

    expect(result.current.values).toStrictEqual({name: 'updatedValue'})

    act(() => {
      result.current.onClear()
    })

    expect(result.current.values).toStrictEqual({name: 'value'})
  })

  it('should call function on submit', () => {
    const mockSubmit = jest.fn()
    const preventDefault = jest.fn()
    const mockEvent: FormEvent<HTMLFormElement> = {preventDefault} as unknown as FormEvent<HTMLFormElement>
    const {result} = renderHook(() => useForm({name: 'value'}))

    act(() => {
      result.current.handleSubmit(mockSubmit)(mockEvent)
    })

    expect(mockSubmit).toHaveBeenCalledTimes(1)
    expect(mockSubmit).toHaveBeenCalledWith({name: 'value'})

    expect(preventDefault).toHaveBeenCalledTimes(1)
  })
})
