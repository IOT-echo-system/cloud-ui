import {updateSite, updateTheme} from '@/store/actions/site'
import {siteBuilder} from '../../builders/stateBuilder'
import {SiteAction} from '@/store/reducers/site'

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
