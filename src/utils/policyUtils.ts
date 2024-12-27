import type {Policy} from '../typing/auth'

export const PolicyUtils = {
  PREMISES_CREATE: 'PREMISES:CREATE',
  PREMISES_READ: 'PREMISES:READ',
  PREMISES_UPDATE: 'PREMISES:UPDATE',
  WIDGET_UPDATE: 'WIDGET:UPDATE',
  DEVICE_CREATE: 'DEVICE:CREATE',
  DEVICE_READ: 'DEVICE:READ',
  DEVICE_UPDATE: 'DEVICE:UPDATE',
  ROUTINE_CREATE: 'ROUTINE:CREATE',
  ROUTINE_READ: 'ROUTINE:READ',
  ROUTINE_UPDATE: 'ROUTINE:UPDATE',
  ZONE_CREATE: 'ZONE:CREATE',

  isValid(polices: Policy[], policyName: string): boolean {
    return polices.some(policy => policy.name === policyName)
  }
}
