type WidgetType = 'INVOICE'

type CartItem = {code: string; name: string; pricePerUnit: number; unit: number; price: number}
export type InvoiceWidget = {
  title: string
  cart: CartItem[]
  totalItems: number
  totalPrice: number
  paid: boolean
}

type ActualWidgetType = {
  INVOICE: InvoiceWidget
}

export type Widget = {
  widgetId: string
  boardId: string
  widgetType: WidgetType
} & ActualWidgetType[WidgetType]
