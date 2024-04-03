export const widgetConfig = {
  invoice: {
    baseUrl: '/invoices',
    title: '/{widgetId}/title',
    seed: '/{widgetId}/seed',
    updateSeed: '/{widgetId}/seed/{itemCode}'
  }
} as const
