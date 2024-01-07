import {renderHook} from '@testing-library/react'
import * as notistack from 'notistack'
import {useToast} from '../../src/hooks'
import type {SnackbarProvider} from 'notistack'

jest.mock('notistack')

describe('useToast hook test', () => {
  const mockEnqueueSnackbar = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks()
    jest
      .spyOn(notistack, 'useSnackbar')
      .mockReturnValue({enqueueSnackbar: mockEnqueueSnackbar} as unknown as SnackbarProvider)
  })

  it('should get initial values', () => {
    const {result} = renderHook(useToast)

    expect(result.current).toStrictEqual({
      success: expect.any(Function),
      warning: expect.any(Function),
      info: expect.any(Function),
      error: expect.any(Function)
    })
  })

  it('should call enqueueSnackbar for success', () => {
    const {result} = renderHook(useToast)

    result.current.success('Success message')

    expect(mockEnqueueSnackbar).toHaveBeenCalledTimes(1)
    expect(mockEnqueueSnackbar).toHaveBeenCalledWith('Success message', {variant: 'success'})
  })

  it('should call enqueueSnackbar for info', () => {
    const {result} = renderHook(useToast)

    result.current.info('Info message')

    expect(mockEnqueueSnackbar).toHaveBeenCalledTimes(1)
    expect(mockEnqueueSnackbar).toHaveBeenCalledWith('Info message', {variant: 'info'})
  })

  it('should call enqueueSnackbar for warning', () => {
    const {result} = renderHook(useToast)

    result.current.warning('Warning message')

    expect(mockEnqueueSnackbar).toHaveBeenCalledTimes(1)
    expect(mockEnqueueSnackbar).toHaveBeenCalledWith('Warning message', {variant: 'warning'})
  })

  it('should call enqueueSnackbar for error', () => {
    const {result} = renderHook(useToast)

    result.current.error('Error message')

    expect(mockEnqueueSnackbar).toHaveBeenCalledTimes(1)
    expect(mockEnqueueSnackbar).toHaveBeenCalledWith('Error message', {variant: 'error'})
  })
})
