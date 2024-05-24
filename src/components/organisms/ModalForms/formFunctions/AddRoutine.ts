import {useState} from 'react'
import {useDispatch, useForm, useSelector, useToast} from '../../../../hooks'
import {RoutineService} from '../../../../services'
import type {FormInputType} from '../../../atoms'
import type {GetFormPropsTypeFunction} from '../model'
import {setRoutines} from '../../../../store/actions/routines'

export const AddRoutine: GetFormPropsTypeFunction = handleClose => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const {routines} = useSelector(state => state)
  const dispatch = useDispatch()
  const {onClear, values, handleSubmit, onChange} = useForm({name: ''})

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    }
  ]

  const onSubmit = (finalValues: typeof values) => {
    setLoading(true)
    RoutineService.createRoutine(finalValues)
      .then(routine => {
        onClear()
        dispatch(setRoutines([routine, ...routines]))
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
    formTitle: 'Add routine',
    submitLabel: 'Add routine'
  }
}
