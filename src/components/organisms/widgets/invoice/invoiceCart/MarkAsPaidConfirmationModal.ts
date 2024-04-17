import type {GetConfirmationModalPropsTypeFunction} from '../../../../molecules'
import type {Widget} from '../../../../../typing/widget'
import {InvoiceService} from '../../../../../services/widgets/invoiceService'
import {useDispatch, useToast} from '../../../../../hooks'
import {updateWidget} from '../../../../../store/actions/boards'
import {useState} from 'react'

export const MarkAsPaidConfirmationModal: GetConfirmationModalPropsTypeFunction<{
  widget: Widget
}> = (handleClose, {widget}) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const onConfirm = () => {
    setLoading(true)
    InvoiceService.updatePayment(!widget.paid, widget)
      .then(widget => {
        dispatch(updateWidget(widget, widget.boardId))
        handleClose()
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false) 
      })
  }
  return {
    title: `Are you sure to mark as ${widget.paid ? 'unpaid' : 'paid'}?`,
    onConfirm,
    onCancel: handleClose,
    loading
  }
}
