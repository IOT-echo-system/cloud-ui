import React from 'react'
import {render} from '@testing-library/react'
import CustomThemeProvider from '@/theme/CustomThemeProvider'

jest.mock('../../src/hooks/useStore')
describe('Custom Theme Provider Test', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterEach(jest.resetAllMocks)

  it('should match with the snapshot for light theme', () => {
    // const site = siteBuilder({theme: 'light'})
    // const globalState = globalStateBuilder({site})
    // const useSelectorSpy = jest.spyOn(GlobalStore, 'useSelector').mockReturnValue(globalState)

    const {container} = render(<CustomThemeProvider />)

    expect(container).toMatchSnapshot()
    // expect(GlobalStore.useSelector).toHaveBeenCalledTimes(1)
    // expect(GlobalStore.useSelector).toHaveBeenCalledWith(expect.any(Function))
    //
    // const useSelectorCallback = useSelectorSpy.mock.calls[0][0]
    // expect(useSelectorCallback(globalState)).toStrictEqual(site)
  })

  // it('should match with the snapshot for dark theme', () => {
  //   const site = siteBuilder({theme: 'dark'})
  //   const globalState = globalStateBuilder({site})
  //   jest.spyOn(GlobalStore, 'useSelector').mockReturnValue(globalState)
  //
  //   const {container} = render(<CustomThemeProvider />)
  //
  //   expect(container).toMatchSnapshot()
  //   expect(GlobalStore.useSelector).toHaveBeenCalledTimes(1)
  //   expect(GlobalStore.useSelector).toHaveBeenCalledWith(expect.any(Function))
  // })
})
