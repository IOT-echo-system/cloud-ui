import React, {useEffect} from 'react'
import {useDispatch, useMedia, useSelector} from '../../../hooks'
import {DesktopHeader} from './DesktopHeader'
import {MobileHeader} from './MobileHeader'
import type {MenuType} from '../../../typing/site'
import {updateMenus} from '../../../store/actions/site'

export const MenuItems = {
  zones: 'Zones',
  boards: 'Boards',
  feeds: 'Feeds',
  routines: 'Routines',
  users: 'Users'
} as const
export type ViewType = keyof typeof MenuItems

export const Header: React.FC = () => {
  const media = useMedia()
  const premises = useSelector(state => state.premises)
  const dispatch = useDispatch()

  const menus: MenuType[] = Object.keys(MenuItems).map(menuItemKey => ({
    name: MenuItems[menuItemKey as keyof typeof MenuItems],
    link: `/premises/${premises?.premisesId}/${menuItemKey}`
  }))

  useEffect(() => {
    if (premises) {
      dispatch(updateMenus(menus))
    } else {
      dispatch(updateMenus([]))
    }
  }, [premises])

  const HeaderComponent = media.lg ? DesktopHeader : MobileHeader

  return <HeaderComponent />
}
