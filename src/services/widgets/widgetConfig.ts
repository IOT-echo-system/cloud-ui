export const widgetConfig = {
  invoice: {
    baseUrl: '/widgets/invoices',
    seed: '/{widgetId}/seed',
    updateSeed: '/{widgetId}/seed/{itemCode}',
    payment: '/{widgetId}/payment'
  },
  collectionOfButtons: {
    baseUrl: '/widgets/collection-of-buttons',
    buttons: '/{widgetId}/buttons',
    button: '/{widgetId}/buttons/{buttonId}',
    buttonValue: '/{widgetId}/buttons/{buttonId}/value'
  }
} as const
