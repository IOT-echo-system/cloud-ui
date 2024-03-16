import React from 'react'
import {useMedia} from '../../../hooks'
import {DesktopHeader} from './DesktopHeader'
import {MobileHeader} from './MobileHeader'

export const Header: React.FC = () => {
  const media = useMedia()
  const HeaderComponent = media.lg ? DesktopHeader : MobileHeader

  return <HeaderComponent />
}
