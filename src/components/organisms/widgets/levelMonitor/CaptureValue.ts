import {useState} from 'react'

import type {LevelMonitorWidget} from '../../../../typing/widget/widget'
import type {GetConfirmationModalPropsTypeFunction} from '../../../molecules'
import {useToast} from '../../../../hooks'
import {LevelMonitorService} from '../../../../services/widgets/levelMonitor'

export const CaptureValue: GetConfirmationModalPropsTypeFunction<{
  widget: LevelMonitorWidget
  type: 'min' | 'max'
}> = (handleClose, {widget, type}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleCapture = () => {
    setLoading(true)
    LevelMonitorService.captureValue(type, widget)
      .then(handleClose)
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
