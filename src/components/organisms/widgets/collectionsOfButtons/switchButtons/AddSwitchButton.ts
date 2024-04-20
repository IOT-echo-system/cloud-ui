import type React from 'react'
import {useState} from 'react'
import type {CollectionOfButtonsWidget} from '../../../../../typing/widget/widget'
import type {GetFormPropsTypeFunction} from '../../../ModalForms/model'
import type {FormInputType} from '../../../../atoms'
import {useDispatch, useForm, useToast} from '../../../../../hooks'
import {CollectionOfButtonsService} from '../../../../../services/widgets'
import type {AddButtonRequest} from '../../../../../services/widgets/typing/collectionOfButtons'
import {updateWidget} from '../../../../../store/actions/boards'

export const AddSwitchButton: GetFormPropsTypeFunction<{
  widget: CollectionOfButtonsWidget
}> = (handleClose, {widget}) => {
  const [loading, setLoading] = useState(false)
  const {values, onChange, handleSubmit} = useForm({name: '', mode: '', type: '', min: 0, max: 1} as AddButtonRequest)
  const dispatch = useDispatch()
  const toast = useToast()

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Name',
      value: values.name,
      required: true,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange('name', event.target.value)
      }
    },
    {
      inputType: 'selectField',
      options: [
        {label: 'Input', value: 'INPUT'},
        {label: 'Output', value: 'OUTPUT'}
      ],
      label: 'Mode',
      required: true,
      handleChange: (_event, value) => {
        onChange('mode', value?.value ?? '')
      }
    },
    {
      inputType: 'selectField',
      options: [
        {label: 'Analog', value: 'ANALOG'},
        {label: 'Digital', value: 'DIGITAL'}
      ],
      label: 'Type',
      required: true,
      handleChange: (_event, value) => {
        onChange('type', value?.value ?? '')
      }
    }
  ]

  const minAndMaxFormInputs: FormInputType[] = [
    {
      inputType: 'textField',
      type: 'number',
      label: 'Min',
      value: values.min,
      required: true,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange('min', +event.target.value)
      }
    },
    {
      inputType: 'textField',
      type: 'number',
      label: 'Max',
      value: values.max,
      required: true,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange('max', +event.target.value)
      }
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    CollectionOfButtonsService.addButton(values, widget)
      .then(collectionOfButtons => {
        dispatch(updateWidget(collectionOfButtons, widget.boardId))
        handleClose()
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    formInputs: values.type === 'ANALOG' ? [...formInputs, ...minAndMaxFormInputs] : formInputs,
    formTitle: 'Add switch button',
    loading,
    handleSubmit: handleSubmit(onSubmit),
    submitLabel: 'Add'
  }
}
