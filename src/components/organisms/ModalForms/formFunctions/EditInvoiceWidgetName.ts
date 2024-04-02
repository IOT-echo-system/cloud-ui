import {useState} from 'react'
import {useDispatch, useForm, useToast} from '../../../../hooks'
import {updateWidget} from '../../../../store/actions/boards'
import type {FormInputType} from '../../../atoms'
import type {GetFormPropsTypeFunction} from '../model'
import type {Widget} from '../../../../typing/widget'
import {InvoiceService} from '../../../../services/widgets/invoiceService'

export type EditInvoiceWidgetNamePropsType = {widget: Widget}

export const EditInvoiceWidgetName: GetFormPropsTypeFunction<EditInvoiceWidgetNamePropsType> = (
  handleClose,
  {widget}
) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const dispatch = useDispatch()
  const {onClear, values, handleSubmit, onChange} = useForm({name: widget.title})

  const formInputs: FormInputType[] = [
    {
      label: 'Update invoice widget name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    InvoiceService.updateTitle(values, widget)
      .then(updatedWidget => {
        onClear()
        dispatch(updateWidget({...widget, title: updatedWidget.title}, widget.boardId))
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
    formTitle: 'Update invoice widget name',
    submitLabel: 'Update widget name'
  }
}
