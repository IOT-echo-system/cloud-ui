import type {TRootActions} from '../../typing/store'

export const SiteAction = {
  SITE_UPDATE_STATE: 'SITE_UPDATE_STATE',
  SITE_UPDATE_THEME: 'SITE_UPDATE_THEME'
} as const

export type SiteStateType = {
  theme: 'light' | 'dark'
  title: string
  subtitle?: string
  menus: Array<{link: string; name: string}>
}
export const initSiteState: SiteStateType = {
  theme: 'light',
  title: 'Robotutor Tech',
  subtitle: 'Unlock your innovation spirit',
  menus: [{name: 'Dashboard', link: '/'}]
}

const siteReducer = (state: SiteStateType, action: TRootActions): SiteStateType => {
  switch (action.type) {
    case SiteAction.SITE_UPDATE_STATE:
      return {...state, ...action.payload.site}
    case SiteAction.SITE_UPDATE_THEME:
      return {...state, theme: action.payload.theme}
    default:
      return state
  }
}

export default siteReducer
