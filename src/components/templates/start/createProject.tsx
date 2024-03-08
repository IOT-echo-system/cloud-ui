import {useState} from 'react'
import {AccountService} from '../../../services/accountService'
import type {AccountWithRoles} from '../../../services/typing/account'
import {useToast} from '../../../hooks'

type CreateProjectType = (
  onClear: () => void,
  addAccount: (account: AccountWithRoles) => void
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
    AccountService.createProject(values)
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
