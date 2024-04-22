import {useState} from 'react'
import type {CollectionOfButtonsWidget} from '../../../../../typing/widget/widget'
import type {GetConfirmationModalPropsTypeFunction} from '../../../../molecules'
import {CollectionOfButtonsService} from '../../../../../services/widgets'
import type {ButtonType} from '../../../../../typing/widget/collectionOfButtons'
import {useDispatch, useToast} from '../../../../../hooks'
import {updateWidget} from '../../../../../store/actions/boards'

export const DeleteSwitchButton: GetConfirmationModalPropsTypeFunction<{
  widget: CollectionOfButtonsWidget
  button: ButtonType
}> = (handleClose, {widget, button}) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const toast = useToast()

  const handleDelete = () => {
    setLoading(true)
    CollectionOfButtonsService.deleteButton(button.buttonId, widget)
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
    title: 'Are you sure to delete button?',
    loading,
    onCancel: handleClose,
    onConfirm: handleDelete,
    confirmText: 'Delete',
    confirmColor: 'error'
  }
}
