import {SiteAction} from '../reducers/site'
import type {MenuType, SiteStateType, ThemeType} from '../../typing/site'

export const updateSite = (site: SiteStateType) => {
  return {type: SiteAction.SITE_UPDATE_STATE, payload: {site}}
}

export const updateTheme = (theme: ThemeType) => {
  return {type: SiteAction.SITE_UPDATE_THEME, payload: {theme}}
}

export const updateMenus = (menus: MenuType[]) => {
  return {type: SiteAction.UPDATE_MENUS, payload: {menus}}
}
