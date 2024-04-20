import type {GetConfirmationModalPropsTypeFunction} from '../../../../molecules'
import {InvoiceService} from '../../../../../services/widgets/invoiceService'
import {useDispatch, useToast} from '../../../../../hooks'
import {updateWidget} from '../../../../../store/actions/boards'
import {useState} from 'react'
import type {InvoiceWidget} from '../../../../../typing/widget/widget'

export const MarkAsPaidConfirmationModal: GetConfirmationModalPropsTypeFunction<{
  widget: InvoiceWidget
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
