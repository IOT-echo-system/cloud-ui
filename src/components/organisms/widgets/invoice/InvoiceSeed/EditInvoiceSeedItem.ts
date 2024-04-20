import {useState} from 'react'
import type {GetFormPropsTypeFunction} from '../../../ModalForms/model'
import {useForm, useToast} from '../../../../../hooks'
import type {FormInputType} from '../../../../atoms'
import {InvoiceService} from '../../../../../services/widgets'
import type {InvoiceSeed} from '../../../../../services/widgets/typing/invoice'
import type {InvoiceWidget} from '../../../../../typing/widget/widget'

export type EditInvoiceSeedItemPropsType = {
  widget: InvoiceWidget
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
      inputType: 'textField',
      label: 'Code',
      value: values.code,
      required: true,
      onChange: event => {
        onChange('code', event.target.value)
      }
    },
    {
      inputType: 'textField',
      label: 'Name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    },
    {
      inputType: 'textField',
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
