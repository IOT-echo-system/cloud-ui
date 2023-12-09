import {siteBuilder} from '../../builders/stateBuilder'
import siteReducer, {SiteAction} from '../../../src/store/reducers/site'
import type {TRootActions} from '../../../src/typing/store'

describe('Reducer Site Test', () => {
  it('should get default site details', () => {
    const site = siteBuilder()

    const siteDetails = siteReducer(site, {} as unknown as TRootActions)

    expect(siteDetails).toStrictEqual(site)
  })

  it('should update site details', () => {
    const site = siteBuilder()
    const updatedSite = siteBuilder({theme: 'dark', title: 'title', subtitle: 'subtitle'})

    const siteDetails = siteReducer(site, {type: SiteAction.SITE_UPDATE_STATE, payload: {site: updatedSite}})

    expect(siteDetails).toStrictEqual({theme: 'dark', title: 'title', subtitle: 'subtitle'})
  })

  it('should update site theme', () => {
    const site = siteBuilder({theme: 'light'})
    const updateSite = siteReducer(site, {type: SiteAction.SITE_UPDATE_THEME, payload: {theme: 'dark'}})

    expect(updateSite.theme).toStrictEqual('dark')
  })
})
