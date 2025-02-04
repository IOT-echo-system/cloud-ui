import type {FC} from 'react'
import React from 'react'
import {useRouter} from 'next/router'
import type {ViewType} from '../../molecules'
import {BoardsView, FeedsView, RoutinesView, UsersView, ZonesView} from './components'

const Views: Record<ViewType, FC> = {
  boards: BoardsView,
  feeds: FeedsView,
  routines: RoutinesView,
  users: UsersView,
  zones: ZonesView
}

export const PremisesView: React.FC = () => {
  const router = useRouter()
  const Component = Views[router.query.views as ViewType]

  return <Component />
}
