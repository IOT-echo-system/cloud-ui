import {useSelector} from './useStore'
import {useMemo} from 'react'
import type {Widget} from '../typing/widget/widget'

export const useWidgets = (): {widgets: Widget[]} => {
  const {widgets: allWidgets, premises, zones} = useSelector(state => state)

  const widgets = useMemo((): Widget[] => {
    if (!premises) {
      return []
    }
    const currentWidgets = premises.zones
      .flatMap(zoneId => zones[zoneId].widgets)
      .reduce<Set<Widget>>((currentWidgets, widgetId) => {
        const board = allWidgets[widgetId] as Widget | undefined
        return board ? currentWidgets.add(board) : currentWidgets
      }, new Set())
    return [...currentWidgets] as Widget[]
  }, [allWidgets, premises?.zones, zones])

  return {widgets}
}
