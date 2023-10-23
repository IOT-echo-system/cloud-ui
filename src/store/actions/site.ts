import type {SiteStateType} from '../reducers/site'
import {SiteAction} from '../reducers/site'

export const updateSite = (site: SiteStateType) => {
  return {type: SiteAction.SITE_UPDATE_STATE, payload: {site}}
}

export const updateTheme = (theme: 'light' | 'dark') => {
  return {type: SiteAction.SITE_UPDATE_THEME, payload: {theme}}
}
