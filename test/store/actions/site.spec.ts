import {siteBuilder} from '../../builders/stateBuilder'
import {updateSite, updateTheme} from '../../../src/store/actions/site'
import {SiteAction} from '../../../src/store/reducers/site'

describe('Actions Site Test', () => {
  it('should update site details', () => {
    const site = siteBuilder()
    const action = updateSite(site)

    expect(action).toStrictEqual({type: SiteAction.SITE_UPDATE_STATE, payload: {site}})
  })

  it('should update site theme', () => {
    const action = updateTheme('light')

    expect(action).toStrictEqual({type: SiteAction.SITE_UPDATE_THEME, payload: {theme: 'light'}})
  })
})
