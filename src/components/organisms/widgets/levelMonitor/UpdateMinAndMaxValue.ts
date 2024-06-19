import {useState} from 'react'
import type {LevelMonitorWidget} from '../../../../typing/widget/widget'
import type {GetFormPropsTypeFunction} from '../../ModalForms/model'
import {useDispatch, useForm, useToast} from '../../../../hooks'
import type {FormInputType} from '../../../atoms'
import {LevelMonitorService} from '../../../../services/widgets/levelMonitor'
import type {LevelMonitorValues} from '../../../../services/widgets/typing/levelMonitor'
import {updateWidget} from '../../../../store/actions/boards'

export type AddInvoiceSeedItemPropsType = {widget: LevelMonitorWidget}

export const UpdateMinAndMaxValue: GetFormPropsTypeFunction<AddInvoiceSeedItemPropsType> = (handleClose, {widget}) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const toast = useToast()

  const {onClear, values, handleSubmit, onChange} = useForm<LevelMonitorValues>({
    minValue: widget.minRange,
    maxValue: widget.maxRange,
    symbol: widget.symbol
  })

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Min value',
      value: values.minValue,
      type: 'number',
      required: true,
      onChange: event => {
        onChange('minValue', +event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'Max value',
      value: values.maxValue,
      type: 'number',
      required: true,
      onChange: event => {
        onChange('maxValue', +event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'Symbol',
      value: values.symbol,
      onChange: event => {
        onChange('symbol', event.target.value)
      }
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    LevelMonitorService.updateValues(values, widget)
      .then(levelMonitorWidget => {
        onClear()
        handleClose()
        dispatch(updateWidget({...widget, ...levelMonitorWidget}, widget.boardId))
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    loading,
    formInputs,
    formTitle: 'Update values',
    submitLabel: 'Update values'
  }
}
