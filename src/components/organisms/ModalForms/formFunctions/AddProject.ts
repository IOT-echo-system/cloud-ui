import {useState} from 'react'
import {useForm, useToast} from '../../../../hooks'
import type {FormInputType} from '../../../atoms'
import type {GetFormPropsTypeFunction} from '../model'
import {ProjectService} from '../../../../services/projectService'
import type {ProjectWithRoles} from '../../../../services/typing/project'

type AddProjectPropsType = {handleAdd: (project: ProjectWithRoles) => void}

export const AddProject: GetFormPropsTypeFunction<AddProjectPropsType> = (handleClose, {handleAdd}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const {onClear, values, handleSubmit, onChange} = useForm({name: ''})

  const formInputs: FormInputType[] = [
    {
      label: 'Project name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    }
  ]

  const onSubmit = (values: {name: string}) => {
    setLoading(true)
    ProjectService.createProject(values)
      .then(project => {
        onClear()
        handleAdd(project)
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
    formTitle: 'Create project',
    submitLabel: 'Create'
  }
}
