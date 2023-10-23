import type {SiteStateType} from '../reducers/site'
import {SiteAction} from '../reducers/site'

export const updateSite = (site: SiteStateType): {payload: {site: SiteStateType}; type: 'SITE_UPDATE_STATE'} => {
  return {type: SiteAction.SITE_UPDATE_STATE, payload: {site}}
}
