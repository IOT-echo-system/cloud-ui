import type {GetFormPropsTypeFunction} from '../../../model'
import type {FormStepProps} from './AddWidget'
import type {WidgetTypes} from './widgets'
import {type FormEventHandler, useEffect, useState} from 'react'
import type {FormInputType} from '../../../../../atoms'
import {AddToggle} from './AddToggle'
import {AddSlider} from './AddSlider'

type AddWidgetConfigProps = FormStepProps & {type: WidgetTypes}
export const AddWidgetConfig: GetFormPropsTypeFunction<AddWidgetConfigProps> = (_handleClose, props) => {
  const {type, onSubmit, prevStep, nextStep} = props
  const [values, setValues] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const configs: Record<WidgetTypes, WidgetConfigReturnType> = {
    SLIDER: AddSlider(setValues),
    TOGGLE: AddToggle(setValues)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault()
    configs[type].handleSubmit()
    setSubmitted(true)
  }

  useEffect(() => {
    if (submitted) {
      onSubmit(values)
      nextStep()
      setSubmitted(false)
    }
  }, [submitted])

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
