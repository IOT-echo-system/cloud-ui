import type {Policy} from '../typing/project'

export const PolicyUtils = {
  BOARD_GET: '000001',
  BOARD_CREATE: '000002',
  BOARD_UPDATE: '000003',
  BOARD_DELETE: '000004',
  DEVICE_GET: '000005',
  DEVICE_CREATE: '000006',
  DEVICE_UPDATE: '000007',
  DEVICE_DELETE: '000008',
  WIDGET_GET: '000009',
  WIDGET_CREATE: '000010',
  WIDGET_UPDATE: '000011',
  WIDGET_DELETE: '000012',
  WIDGET_INVOICE_GET: '000013',
  WIDGET_INVOICE_CREATE: '000014',
  WIDGET_INVOICE_UPDATE: '000015',
  WIDGET_INVOICE_DELETE: '000016',
  WIDGET_INVOICE_SEED_UPDATE: '000017',

  isValid(polices: Policy[], policyId: string): boolean {
    return polices.some(policy => policy.policyId === policyId)
  }
}
