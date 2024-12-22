export type Address = {
  address1: string
  address2?: string
  city: string
  district: string
  state: string
  zipCode: number
}

export interface Premises {
  premisesId: string
  name: string
  address: Address
}
