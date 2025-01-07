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
  zoneIds: string[]
  boardIds: string[]
}
