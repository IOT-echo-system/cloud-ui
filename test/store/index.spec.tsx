import {rootActions, rootState} from '@/store'
import {initSiteState} from '@/store/reducers/site'

describe('Store Test', () => {
  beforeEach(jest.resetAllMocks)
  afterEach(jest.resetAllMocks)

  it('should get init site state', () => {
    expect(rootState.site).toStrictEqual(initSiteState)
  })

  it('should get site action', () => {
    expect(rootActions.site).toStrictEqual(rootActions.site)
  })
})
