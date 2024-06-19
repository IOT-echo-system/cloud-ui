import {useState} from 'react'
import {useDispatch, useForm, useToast} from '../../../../hooks'
import {updateWidget} from '../../../../store/actions/boards'
import type {FormInputType} from '../../../atoms'
import type {GetFormPropsTypeFunction} from '../model'
import {WidgetService} from '../../../../services/widgets'
import type {Widget} from '../../../../typing/widget/widget'

export type EditInvoiceWidgetNamePropsType = {widget: Widget}

export const EditWidgetName: GetFormPropsTypeFunction<EditInvoiceWidgetNamePropsType> = (handleClose, {widget}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const dispatch = useDispatch()
  const {values, handleSubmit, onChange} = useForm({name: widget.title})

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Update widget name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    WidgetService.updateTitle(values, widget)
      .then(({title}) => {
        dispatch(updateWidget({...widget, title}, widget.boardId))
        handleClose()
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
    formTitle: 'Update widget name',
    submitLabel: 'Update widget name'
  }
}
