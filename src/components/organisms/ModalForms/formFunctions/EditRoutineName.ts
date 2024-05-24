import {useState} from 'react'
import {useDispatch, useForm, useToast} from '../../../../hooks'
import {RoutineService} from '../../../../services'
import {updateRoutine} from '../../../../store/actions/routines'
import type {FormInputType} from '../../../atoms'
import type {GetFormPropsTypeFunction} from '../model'
import type {Routine} from '../../../../typing/routine'

export type EditRoutineNamePropsType = {routine: Routine}

export const EditRoutineName: GetFormPropsTypeFunction<EditRoutineNamePropsType> = (handleClose, {routine}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const dispatch = useDispatch()
  const {values, handleSubmit, onChange} = useForm({name: routine.name})

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Update Routine name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    }
  ]

  const onSubmit = (values: {name: string}) => {
    setLoading(true)
    RoutineService.updateRoutineName(values, routine.routineId)
      .then(({name}) => {
        dispatch(updateRoutine({...routine, name}))
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
    formTitle: 'Update routine name',
    submitLabel: 'Update routine name'
  }
}
