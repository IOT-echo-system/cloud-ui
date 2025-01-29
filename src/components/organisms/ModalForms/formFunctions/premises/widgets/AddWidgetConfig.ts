import type {GetFormPropsTypeFunction} from '../../../model'
import type {FormStepProps} from './AddWidget'
import type {WidgetTypes} from './widgets'
import {type FormEventHandler, useState} from 'react'
import type {FormInputType} from '../../../../../atoms'
import {AddToggle} from './AddToggle'
import {AddSlider} from './AddSlider'

type AddWidgetConfigProps = FormStepProps & {type: WidgetTypes}
export const AddWidgetConfig: GetFormPropsTypeFunction<AddWidgetConfigProps> = (_handleClose, props) => {
  const {type, onSubmit, prevStep, nextStep} = props
  const [values, setValues] = useState({})

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    onSubmit(values)
    nextStep()
  }

  const configs: Record<WidgetTypes, WidgetConfigReturnType> = {
    SLIDER: AddSlider(setValues),
    TOGGLE: AddToggle(setValues)
  }

  return {
    formInputs: configs[type].formInputs,
    handleSubmit,
    formTitle: 'Add widget',
    submitLabel: 'Add widget',
    cancelLabel: 'Previous',
    handleCancel: prevStep
  }
}

type WidgetConfigReturnType = {
  handleSubmit: () => void
  formInputs: FormInputType[]
}
export type WidgetConfigType = (onSubmit: (values: Record<string, unknown>) => void) => WidgetConfigReturnType
