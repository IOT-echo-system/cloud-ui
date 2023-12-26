import {act, renderHook} from '@testing-library/react'

import {useCountDownTimer} from '../../src/hooks'

describe('useCountDown hook test', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should get initial values', () => {
    const {result} = renderHook(() => useCountDownTimer(60))

    expect(result.current.time).toStrictEqual(60)
  })

  it('should start timer on play', () => {
    const spySetInterval = jest.spyOn(global, 'setInterval').mockImplementation()

    const {result} = renderHook(() => useCountDownTimer(60))

    expect(result.current.time).toStrictEqual(60)
    act(() => {
      result.current.play()
    })

    expect(global.setInterval).toHaveBeenCalledTimes(1)
    expect(global.setInterval).toHaveBeenCalledWith(expect.any(Function), 1000)

    const callback = spySetInterval.mock.calls[0][0]
    act(() => {
      callback()
    })
    expect(result.current.time).toStrictEqual(59)
  })

  it('should reset time with initial time', () => {
    const spySetInterval = jest.spyOn(global, 'setInterval').mockImplementation()

    const {result} = renderHook(() => useCountDownTimer(60))

    expect(result.current.time).toStrictEqual(60)
    act(() => {
      result.current.play()
    })

    expect(global.setInterval).toHaveBeenCalledTimes(1)
    expect(global.setInterval).toHaveBeenCalledWith(expect.any(Function), 1000)

    const callback = spySetInterval.mock.calls[0][0]
    act(() => {
      callback()
      callback()
      callback()
      callback()
    })
    expect(result.current.time).toStrictEqual(56)

    act(() => {
      result.current.reset()
    })
    expect(result.current.time).toStrictEqual(60)
  })

  it('should pause the timer', () => {
    jest.spyOn(global, 'setInterval').mockImplementation()
    jest.spyOn(global, 'clearInterval').mockImplementation()

    const {result} = renderHook(() => useCountDownTimer(60))

    expect(result.current.time).toStrictEqual(60)
    act(() => {
      result.current.play()
    })

    expect(global.setInterval).toHaveBeenCalledTimes(1)
    expect(global.setInterval).toHaveBeenCalledWith(expect.any(Function), 1000)

    act(() => {
      result.current.pause()
    })

    expect(global.clearInterval).toHaveBeenCalledTimes(1)
    expect(global.clearInterval).toHaveBeenCalledWith(0)
  })

  it('should return true if timer is running', () => {
    jest.spyOn(global, 'setInterval').mockImplementation()

    const {result} = renderHook(() => useCountDownTimer(60))

    expect(result.current.time).toStrictEqual(60)
    act(() => {
      result.current.play()
    })

    expect(global.setInterval).toHaveBeenCalledTimes(1)
    expect(global.setInterval).toHaveBeenCalledWith(expect.any(Function), 1000)

    expect(result.current.isRunning()).toBeTruthy()
  })

  it('should return false if timer is not running', () => {
    const {result} = renderHook(() => useCountDownTimer(60))

    expect(result.current.time).toStrictEqual(60)
    expect(result.current.isRunning()).toBeFalsy()
  })

  it('should clear timer if time remains 0', () => {
    const spySetInterval = jest.spyOn(global, 'setInterval').mockImplementation()

    const {result} = renderHook(() => useCountDownTimer(3))

    expect(result.current.time).toStrictEqual(3)
    act(() => {
      result.current.play()
    })

    expect(global.setInterval).toHaveBeenCalledTimes(1)
    expect(global.setInterval).toHaveBeenCalledWith(expect.any(Function), 1000)
    expect(result.current.isRunning()).toBeTruthy()

    const callback = spySetInterval.mock.calls[0][0]
    act(() => {
      callback()
      callback()
      callback()
    })

    expect(result.current.isRunning()).toBeFalsy()
    expect(result.current.time).toStrictEqual(0)
  })

  it('should reset and play timer', () => {
    const spySetInterval = jest.spyOn(global, 'setInterval').mockImplementation()

    const {result} = renderHook(() => useCountDownTimer(3))

    expect(result.current.time).toStrictEqual(3)
    act(() => {
      result.current.play()
    })

    expect(global.setInterval).toHaveBeenCalledTimes(1)
    expect(global.setInterval).toHaveBeenCalledWith(expect.any(Function), 1000)
    expect(result.current.isRunning()).toBeTruthy()

    const callback = spySetInterval.mock.calls[0][0]
    act(() => {
      callback()
      callback()
      callback()
    })

    expect(result.current.isRunning()).toBeFalsy()
    expect(result.current.time).toStrictEqual(0)

    act(() => {
      result.current.resetAndPlay()
    })

    expect(result.current.isRunning()).toBeTruthy()
    expect(result.current.time).toStrictEqual(3)
  })
})
