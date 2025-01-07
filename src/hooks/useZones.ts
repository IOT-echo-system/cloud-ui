import {useSelector} from './useStore'
import type {Zone} from '../typing/zones'
import {useMemo} from 'react'

export const useZones = (): {zones: Zone[]} => {
  const {zones: allZones, premises} = useSelector(state => state)

  const zones = useMemo((): Zone[] => {
    if (!premises) {
      return []
    }
    const currentZones = premises.zoneIds.reduce<Set<Zone>>((currentZones, zoneId) => {
      const zone = allZones[zoneId] as Zone | undefined
      return zone ? currentZones.add(zone) : currentZones
    }, new Set())

    return [...currentZones] as Zone[]
  }, [allZones, premises?.zoneIds])

  return {zones}
}
