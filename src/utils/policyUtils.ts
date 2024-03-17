import type {Policy} from '../typing/project'

export const PolicyUtils = {
  BOARD_GET: '0001',
  BOARD_CREATE: '0002',
  BOARD_UPDATE: '0003',
  BOARD_DELETE: '0004',

  isValid(polices: Policy[], policyId: string): boolean {
    return polices.some(policy => policy.policyId === policyId)
  }
}
