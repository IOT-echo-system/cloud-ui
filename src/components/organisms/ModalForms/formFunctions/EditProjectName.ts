import {useState} from 'react'
import {useDispatch, useForm, useToast} from '../../../../hooks'
import {ProjectService} from '../../../../services'
import type {FormInputType} from '../../../atoms'
import type {GetFormPropsTypeFunction} from '../model'
import type {Project} from '../../../../typing/project'
import {setProject} from '../../../../store/actions/project'

export type EditProjectNamePropsType = {project: Project}

export const EditProjectName: GetFormPropsTypeFunction<EditProjectNamePropsType> = (handleClose, {project}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const dispatch = useDispatch()
  const {values, handleSubmit, onChange} = useForm({name: project.name})

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Update Project name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    }
  ]

  const onSubmit = (values: {name: string}) => {
    setLoading(true)
    ProjectService.updateProjectName(values, project.projectId)
      .then(({name}) => {
        dispatch(setProject({...project, name}))
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
    formTitle: 'Update project name',
    submitLabel: 'Update project name'
  }
}
