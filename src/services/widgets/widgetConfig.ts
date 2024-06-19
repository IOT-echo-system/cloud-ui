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
  },
  levelMonitor: {
    baseUrl: '/widgets/level-monitor',
    values: '/{widgetId}/values',
    captureValue: '/{widgetId}/capture-value'
  }
} as const
