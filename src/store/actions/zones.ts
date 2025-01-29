import type {Zone} from '../../typing/zones'
import {ZonesAction} from '../reducers/zones'
import type {Widget} from '../../typing/widget/widget'

export const updateZones = (zones: Zone[]) => {
  return {type: ZonesAction.UPDATE_ZONES, payload: {zones}}
}

export const updateZone = (zone: Zone) => {
  return {type: ZonesAction.UPDATE_ZONE, payload: {zone}}
}

export const addWidgetInZone = (widget: Widget) => {
  return {type: ZonesAction.ADD_WIDGET_IN_ZONE, payload: {widget}}
}
