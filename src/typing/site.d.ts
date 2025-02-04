export type MenuType = {link: string; name: string; exact?: boolean}
export type ThemeType = 'light' | 'dark'
export type SiteStateType = {
  theme: ThemeType
  title: string
  subtitle?: string
  menus: MenuType[]
}
