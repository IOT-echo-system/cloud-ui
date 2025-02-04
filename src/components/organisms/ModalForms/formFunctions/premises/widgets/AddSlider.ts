import {useForm} from '../../../../../../hooks'
import type {FormInputType} from '../../../../../atoms'
import type {WidgetConfigType} from './AddWidgetConfig'

export type SliderConfigType = {min: number; max: number; step: number; label: string}

export const AddSlider: WidgetConfigType = onSubmit => {
  const {values, onChange, onClear} = useForm<SliderConfigType>({min: 0, max: 100, step: 10, label: ''})

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Min',
      value: values.min,
      onChange: event => {
        onChange('min', +event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'Max',
      value: values.max,
      required: true,
      onChange: event => {
        onChange('max', +event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'Step',
      value: values.step,
      required: true,
      onChange: event => {
        onChange('step', +event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'Label',
      value: values.label,
      onChange: event => {
        onChange('label', event.target.value)
      }
    }
  ]

  const handleFormSubmit = () => {
    onSubmit({...values})
    onClear()
  }

  return {
    handleSubmit: handleFormSubmit,
    formInputs
  }
}
