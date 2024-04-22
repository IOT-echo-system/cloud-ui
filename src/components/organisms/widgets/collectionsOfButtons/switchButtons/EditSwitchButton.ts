import type React from 'react'
import {useState} from 'react'
import type {CollectionOfButtonsWidget} from '../../../../../typing/widget/widget'
import type {GetFormPropsTypeFunction} from '../../../ModalForms/model'
import type {FormInputType} from '../../../../atoms'
import {useDispatch, useForm, useToast} from '../../../../../hooks'
import {CollectionOfButtonsService} from '../../../../../services/widgets'
import type {AddButtonRequest} from '../../../../../services/widgets/typing/collectionOfButtons'
import {updateWidget} from '../../../../../store/actions/boards'
import type {ButtonType} from '../../../../../typing/widget/collectionOfButtons'

export const EditSwitchButton: GetFormPropsTypeFunction<{
  widget: CollectionOfButtonsWidget
  button: ButtonType
}> = (handleClose, {widget, button}) => {
  const [loading, setLoading] = useState(false)
  const {values, onChange, handleSubmit} = useForm({
    name: button.name,
    mode: button.mode,
    type: button.type,
    min: button.min,
    max: button.max,
    symbol: button.symbol ?? ''
  } as AddButtonRequest)
  const dispatch = useDispatch()
  const toast = useToast()

  const modeOptions = [
    {label: 'Input', value: 'INPUT'},
    {label: 'Output', value: 'OUTPUT'}
  ]
  const typeOptions = [
    {label: 'Analog', value: 'ANALOG'},
    {label: 'Digital', value: 'DIGITAL'}
  ]

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
      options: modeOptions,
      label: 'Mode',
      value: values.mode,
      defaultValue: modeOptions.find(option => option.value === values.mode),
      required: true,
      handleChange: value => {
        onChange('mode', value as ButtonType['mode'])
      }
    },
    {
      inputType: 'selectField',
      options: typeOptions,
      label: 'Type',
      required: true,
      defaultValue: typeOptions.find(option => option.value === values.type),
      handleChange: value => {
        onChange('type', value as ButtonType['type'])
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
    },
    {
      inputType: 'textField',
      label: 'MinMax symbol',
      value: values.symbol,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange('symbol', event.target.value)
      }
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    CollectionOfButtonsService.updateButton(values, widget, button.buttonId)
      .then(collectionOfButtons => {
        dispatch(updateWidget({...widget, buttons: collectionOfButtons.buttons}, widget.boardId))
        handleClose()
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    formInputs: values.type === 'ANALOG' ? [...formInputs, ...minAndMaxFormInputs] : formInputs,
    formTitle: 'Update switch button',
    loading,
    handleSubmit: handleSubmit(onSubmit),
    submitLabel: 'Update button'
  }
}
