import type {WidgetConfigType} from './AddWidgetConfig'

export const AddToggle: WidgetConfigType = onSubmit => {
  return {
    handleSubmit: () => {
      onSubmit({})
    },
    formInputs: []
  }
}
