import type {GetFormPropsTypeFunction} from '../../../model'
import {useEffect, useState} from 'react'
import {AddWidgetConfig} from './AddWidgetConfig'
import type {WidgetDetailsType} from './AddWidgetDetails'
import {AddWidgetDetails} from './AddWidgetDetails'
import {WidgetService} from '../../../../../../services'
import {useDispatch, useToast} from '../../../../../../hooks'
import {updateWidget} from '../../../../../../store/actions/widgets'
import {addWidgetInZone} from '../../../../../../store/actions/zones'

export type FormStepProps = {
  nextStep: () => void
  prevStep: () => void
  onSubmit: (values: Record<string, unknown>) => void
}
const MinStep = 0
const MaxStep = 2
const Step = 1

export const AddWidget: GetFormPropsTypeFunction<{zoneId: string}> = (handleClose, {zoneId}) => {
  const [currentStep, setCurrentStep] = useState(MinStep)
  const [loading, setLoading] = useState(false)
  const initialState: WidgetDetailsType = {boardId: '', type: 'TOGGLE', feedId: '', name: ''}
  const [widgetDetails, setWidgetDetails] = useState(initialState)
  const [config, setConfig] = useState({})
  const toast = useToast()
  const dispatch = useDispatch()

  const handlePrevStep = (step: number) => () => {
    setCurrentStep(Math.max(MinStep, step - Step))
  }

  const handleNextStep = (step: number) => () => {
    setCurrentStep(Math.min(step + Step, MaxStep))
  }

  const widgetDetailsForm = AddWidgetDetails(handleClose, {
    prevStep: handlePrevStep(0),
    nextStep: handleNextStep(0),
    onSubmit: setWidgetDetails as FormStepProps['onSubmit']
  })

  const widgetConfigForm = AddWidgetConfig(handleClose, {
    type: widgetDetails.type,
    prevStep: handlePrevStep(1),
    nextStep: handleNextStep(1),
    onSubmit: setConfig
  })

  useEffect(() => {
    if (currentStep === MaxStep) {
      setLoading(true)
      WidgetService.addWidget({...widgetDetails, zoneId, config})
        .then(widget => {
          dispatch(updateWidget(widget))
          dispatch(addWidgetInZone(widget))
          setWidgetDetails({...initialState})
          setConfig({})
          setCurrentStep(MinStep)
          handleClose()
        })
        .catch(toast.error)
        .finally(() => {
          setLoading(false)
        })
    }
  }, [currentStep])

  switch (currentStep) {
    case 0:
      return widgetDetailsForm
    case 1:
      return widgetConfigForm
    default:
      return {
        formTitle: 'Add widget',
        loading,
        formInputs: [],
        submitLabel: 'Add widget',
        handleSubmit: () => {}
      }
  }
}
