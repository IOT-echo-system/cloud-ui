import {initSiteState} from '../../src/store/reducers/site'
import {rootActions, rootState} from '../../src/store'

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
