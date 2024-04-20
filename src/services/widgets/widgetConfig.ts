export const widgetConfig = {
  invoice: {
    baseUrl: '/widgets/invoices',
    title: '/{widgetId}/title',
    seed: '/{widgetId}/seed',
    updateSeed: '/{widgetId}/seed/{itemCode}',
    payment: '/{widgetId}/payment'
  }
} as const
