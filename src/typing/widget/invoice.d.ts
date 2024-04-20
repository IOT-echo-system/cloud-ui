type CartItem = {code: string; name: string; pricePerUnit: number; unit: number; price: number}
export type Invoice = {
  cart: CartItem[]
  totalItems: number
  totalPrice: number
  paid: boolean
}
