import type {Policy} from '../typing/auth'

export const PolicyUtils = {
  PREMISES_CREATE: 'PREMISES:CREATE',
  PREMISES_READ: 'PREMISES:READ',
  PREMISES_UPDATE: 'PREMISES:UPDATE',
  WIDGET_UPDATE: 'WIDGET:UPDATE',
  BOARD_CREATE: 'BOARD:CREATE',
  BOARD_READ: 'BOARD:READ',
  BOARD_UPDATE: 'BOARD:UPDATE',
  ROUTINE_CREATE: 'ROUTINE:CREATE',
  ROUTINE_READ: 'ROUTINE:READ',
  ROUTINE_UPDATE: 'ROUTINE:UPDATE',
  ZONE_CREATE: 'ZONE:CREATE',

  isValid(polices: Policy[], policyName: string): boolean {
    return polices.some(policy => policy.name === policyName)
  }
}
