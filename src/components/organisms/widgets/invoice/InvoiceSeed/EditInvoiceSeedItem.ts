import {useState} from 'react'
import type {Widget} from '../../../../../typing/widget'
import type {GetFormPropsTypeFunction} from '../../../ModalForms/model'
import {useForm, useToast} from '../../../../../hooks'
import type {FormInputType} from '../../../../atoms'
import {InvoiceService} from '../../../../../services/widgets/invoiceService'
import type {InvoiceSeed} from '../../../../../services/widgets/typing/invoice'

export type EditInvoiceSeedItemPropsType = {
  widget: Widget
  seedItem: InvoiceSeed
  updateSeed: (seedCode: string, seedItem: InvoiceSeed) => void
}

export const EditInvoiceSeedItem: GetFormPropsTypeFunction<EditInvoiceSeedItemPropsType> = (
  handleClose,
  {widget, updateSeed, seedItem}
) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const {onClear, values, handleSubmit, onChange} = useForm({
    oldCode: seedItem.code,
    name: seedItem.name,
    code: seedItem.code,
    pricePerUnit: seedItem.pricePerUnit
  })

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
    InvoiceService.updateSeedItem(values, widget)
      .then(invoiceSeed => {
        onClear()
        handleClose()
        updateSeed(values.oldCode, invoiceSeed)
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
    formTitle: 'Update seed item',
    submitLabel: 'Update seed item'
  }
}