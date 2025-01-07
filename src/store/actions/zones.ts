import type {Zone} from '../../typing/zones'
import {ZonesAction} from '../reducers/zones'

export const updateZones = (zones: Zone[]) => {
  return {type: ZonesAction.UPDATE_ZONES, payload: {zones}}
}

export const updateZone = (zone: Zone) => {
  return {type: ZonesAction.UPDATE_ZONE, payload: {zone}}
}
