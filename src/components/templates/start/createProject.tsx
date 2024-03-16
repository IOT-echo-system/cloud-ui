import {useState} from 'react'
import {ProjectService} from '../../../services/projectService'
import type {ProjectWithRoles} from '../../../services/typing/project'
import {useToast} from '../../../hooks'

type CreateProjectType = (
  onClear: () => void,
  addAccount: (account: ProjectWithRoles) => void
) => {
  handleOpen: () => void
  handleClose: () => void
  modalOpen: boolean
  onSubmit: (values: {name: string}) => void
  loading: boolean
}

export const createProject: CreateProjectType = (onClear, addAccount) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleClose = () => {
    setModalOpen(false)
  }
  const handleOpen = () => {
    setModalOpen(true)
  }

  const onSubmit = (values: {name: string}) => {
    setLoading(true)
    ProjectService.createProject(values)
      .then(account => {
        onClear()
        addAccount(account)
        handleClose()
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  return {handleOpen, handleClose, modalOpen, onSubmit, loading}
}
