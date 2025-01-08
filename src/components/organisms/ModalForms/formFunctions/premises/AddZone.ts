import {useState} from 'react'
import {useForm, useSelector, useToast} from '../../../../../hooks'
import type {FormInputType} from '../../../../atoms'
import type {GetFormPropsTypeFunction} from '../../model'
import {ZoneService} from '../../../../../services/zoneService'

export const AddZone: GetFormPropsTypeFunction = handleClose => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const premises = useSelector(state => state.premises)!
  const {onClear, values, handleSubmit, onChange} = useForm({name: ''})

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Zone name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    ZoneService.createZone(premises.premisesId, values)
      .then(() => {
        onClear()
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
    formTitle: 'Add zone',
    submitLabel: 'Add zone'
  }
}
