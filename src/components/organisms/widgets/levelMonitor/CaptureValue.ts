import {useState} from 'react'

import type {LevelMonitorWidget} from '../../../../typing/widget/widget'
import type {GetConfirmationModalPropsTypeFunction} from '../../../molecules'
import {useDispatch, useToast} from '../../../../hooks'
import {LevelMonitorService} from '../../../../services/widgets/levelMonitor'
import {updateWidget} from '../../../../store/actions/boards'

export const CaptureValue: GetConfirmationModalPropsTypeFunction<{
  widget: LevelMonitorWidget
  type: 'min' | 'max'
}> = (handleClose, {widget, type}) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const toast = useToast()

  const handleCapture = () => {
    setLoading(true)
    LevelMonitorService.captureValue(type, widget)
      .then(levelMonitorWidget => {
        dispatch(updateWidget({...widget, ...levelMonitorWidget}, widget.boardId))
        handleClose()
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    title: `Are you sure to Capture current value as ${type} value?`,
    loading,
    onCancel: handleClose,
    onConfirm: handleCapture,
    confirmText: 'Capture',
    cancelText: 'Cancel'
  }
}
