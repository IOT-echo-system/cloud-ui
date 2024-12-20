import {useState} from 'react'
import {useDispatch, useForm, useSelector, useToast} from '../../../../hooks'
import {PremisesService} from '../../../../services'
import type {FormInputType} from '../../../atoms'
import type {GetFormPropsTypeFunction} from '../model'
import {setPremises} from '../../../../store/actions/premises'

export const AddPremises: GetFormPropsTypeFunction = handleClose => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const {premises} = useSelector(state => state)
  const dispatch = useDispatch()
  const {onClear, values, handleSubmit, onChange} = useForm({name: ''})

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Premises name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    }
  ]

  const onSubmit = (values: {name: string}) => {
    setLoading(true)
    PremisesService.createPremises(values)
      .then(newPremises => {
        onClear()
        dispatch(setPremises([newPremises, ...premises]))
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
    formTitle: 'Add premises',
    submitLabel: 'Add premises'
  }
}
