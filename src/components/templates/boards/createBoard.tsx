import {useState} from 'react'
import {ProjectService} from '../../../services/projectService'
import {useToast} from '../../../hooks'

type CreateBoardType = (onClear: () => void) => {
  handleOpen: () => void
  handleClose: () => void
  modalOpen: boolean
  onSubmit: (values: {name: string}) => void
  loading: boolean
}

export const createBoard: CreateBoardType = onClear => {
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
      .then(() => {
        onClear()
        // addAccount(account)
        handleClose()
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  return {handleOpen, handleClose, modalOpen, onSubmit, loading}
}
