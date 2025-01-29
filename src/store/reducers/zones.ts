import type {TRootActions} from '../../typing/store'
import type {Zones} from '../../typing/zones'

export const ZonesAction = {
  UPDATE_ZONE: 'UPDATE_ZONE',
  UPDATE_ZONES: 'UPDATE_ZONES',
  ADD_WIDGET_IN_ZONE: 'ADD_WIDGET_IN_ZONE'
} as const

export const initZonesState: Zones = {}

const zonesReducer = (state: Zones, action: TRootActions): Zones => {
  switch (action.type) {
    case ZonesAction.UPDATE_ZONE:
      return {...state, [action.payload.zone.zoneId]: action.payload.zone}
    case ZonesAction.UPDATE_ZONES: {
      const zones = action.payload.zones.reduce<Zones>((allZones, zone) => ({...allZones, [zone.zoneId]: zone}), {})
      return {...state, ...zones}
    }
    case ZonesAction.ADD_WIDGET_IN_ZONE: {
      const zone = state[action.payload.widget.zoneId]
      const updatedZone = {...zone, widgets: [...new Set(zone.widgets.concat(action.payload.widget.widgetId))]}
      return {...state, [zone.zoneId]: updatedZone}
    }
    default:
      return state
  }
}

export default zonesReducer
