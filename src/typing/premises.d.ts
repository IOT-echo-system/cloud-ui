export type Address = {
  address1: string
  address2?: string
  district: string
  state: string
  pincode: number
}

export interface Premises {
  premisesId: string
  name: string
  address: Address
  zones: string[]
  boards: string[]
  user: {userId: string; role: 'OWNER' | 'ADMIN' | 'USER'}
  enableEdit: boolean
}
