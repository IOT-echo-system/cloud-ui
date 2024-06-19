import React from 'react'
import {Button, PolicyAllowed} from '../../../atoms'
import type {WidgetPropsType} from '../index'
import {Stack, Typography} from '@mui/material'
import {PolicyUtils} from '../../../../utils/policyUtils'
import {ModalForms} from '../../ModalForms/ModalForms'
import {UpdateMinAndMaxValue} from './UpdateMinAndMaxValue'
import {ConfirmationModals} from '../../../molecules'
import {CaptureValue} from './CaptureValue'

export const LevelMonitorSetupValues: React.FC<WidgetPropsType<'LEVEL_MONITOR'>> = ({widget: levelMonitorWidget}) => {
  return (
    <PolicyAllowed policyId={PolicyUtils.WIDGET_LEVEL_MONITOR_UPDATE} spacing={2}>
      <Stack direction={'row'} spacing={2}>
        <ConfirmationModals getConfirmationModalDetails={CaptureValue} widget={levelMonitorWidget} type={'min'}>
          <Button variant={'contained'}>Capture min</Button>
        </ConfirmationModals>
        <ConfirmationModals getConfirmationModalDetails={CaptureValue} widget={levelMonitorWidget} type={'max'}>
          <Button variant={'contained'}>Capture max</Button>
        </ConfirmationModals>
      </Stack>
      <Stack spacing={1}>
        <Typography>
          Min: {levelMonitorWidget.minValue} ({levelMonitorWidget.minRange} {levelMonitorWidget.symbol})
        </Typography>
        <Typography>
          Max: {levelMonitorWidget.maxValue} ({levelMonitorWidget.maxRange} {levelMonitorWidget.symbol})
        </Typography>
        <Typography>Current value: {levelMonitorWidget.value}</Typography>
      </Stack>
      <ModalForms getFormDetails={UpdateMinAndMaxValue} widget={levelMonitorWidget}>
        <Button variant={'contained'}>Update values</Button>
      </ModalForms>
    </PolicyAllowed>
  )
}
