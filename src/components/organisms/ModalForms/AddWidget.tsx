import {useState} from 'react'
import type {FormInputType} from '../../atoms'
import type {Board} from '../../../typing/board'
import {useDispatch, useForm, useToast} from '../../../hooks'
import {WidgetService} from '../../../services/widgets'
import {widgetsNameMap} from '../widgets'
import {addWidget} from '../../../store/actions/boards'
import type {WidgetType} from '../../../typing/widget/widget'
import type {GetFormPropsTypeFunction} from './model'

export const AddWidget: GetFormPropsTypeFunction<{board: Board}> = (handleClose, {board}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  const {onClear, values, handleSubmit, onChange} = useForm({type: ''})

  const formInputs: FormInputType[] = [
    {
      inputType: 'selectField',
      value: values.type,
      label: 'Select widget',
      required: true,
      handleChange: (_event, value) => {
        onChange('type', value?.value ?? '')
      },
      options: Object.keys(widgetsNameMap).map(keyName => ({
        label: widgetsNameMap[keyName as WidgetType],
        value: keyName
      }))
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    WidgetService.addWidget({...values, boardId: board.boardId})
      .then(widget => {
        onClear()
        dispatch(addWidget(widget, board.boardId))
        handleClose()
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  return {formInputs, formTitle: 'Add widget', submitLabel: 'Add widget', handleSubmit: handleSubmit(onSubmit), loading}
}
