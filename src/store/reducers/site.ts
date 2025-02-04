import type {TRootActions} from '../../typing/store'
import type {MenuType, SiteStateType} from '../../typing/site'

export const SiteAction = {
  SITE_UPDATE_STATE: 'SITE_UPDATE_STATE',
  SITE_UPDATE_THEME: 'SITE_UPDATE_THEME',
  UPDATE_MENUS: 'UPDATE_MENUS'
} as const

const defaultMenus: MenuType[] = [
  {name: 'Dashboard', link: '/', exact: true},
  {name: 'Premises', link: '/premises', exact: true}
]
export const initSiteState: SiteStateType = {
  theme: 'light',
  title: 'EMS',
  subtitle: '',
  menus: defaultMenus
}

const siteReducer = (state: SiteStateType, action: TRootActions): SiteStateType => {
  switch (action.type) {
    case SiteAction.SITE_UPDATE_STATE:
      return {...state, ...action.payload.site}
    case SiteAction.SITE_UPDATE_THEME:
      return {...state, theme: action.payload.theme}
    case SiteAction.UPDATE_MENUS:
      return {...state, menus: [...defaultMenus, ...action.payload.menus]}
    default:
      return state
  }
}

export default siteReducer
