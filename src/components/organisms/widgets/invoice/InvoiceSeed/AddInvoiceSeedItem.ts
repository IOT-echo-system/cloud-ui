import {useState} from 'react'
import type {GetFormPropsTypeFunction} from '../../../ModalForms/model'
import {useForm, useToast} from '../../../../../hooks'
import type {FormInputType} from '../../../../atoms'
import {InvoiceService} from '../../../../../services/widgets/invoiceService'
import type {InvoiceSeed} from '../../../../../services/widgets/typing/invoice'
import type {InvoiceWidget} from '../../../../../typing/widget/widget'

export type AddInvoiceSeedItemPropsType = {widget: InvoiceWidget; addSeed: (seedItem: InvoiceSeed) => void}

export const AddInvoiceSeedItem: GetFormPropsTypeFunction<AddInvoiceSeedItemPropsType> = (
  handleClose,
  {widget, addSeed}
) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const {onClear, values, handleSubmit, onChange} = useForm({name: '', code: '', pricePerUnit: 0})

  const formInputs: FormInputType[] = [
    {
      label: 'Code',
      value: values.code,
      required: true,
      onChange: event => {
        onChange('code', event.target.value)
      }
    },
    {
      label: 'Name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    },
    {
      label: 'Price per unit',
      type: 'number',
      value: values.pricePerUnit === 0 ? '' : values.pricePerUnit,
      required: true,
      onChange: event => {
        onChange('pricePerUnit', +event.target.value)
      }
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    InvoiceService.addSeedItem(values, widget)
      .then(invoiceSeed => {
        onClear()
        handleClose()
        addSeed(invoiceSeed)
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
    formTitle: 'Add seed item',
    submitLabel: 'Add seed item'
  }
}
