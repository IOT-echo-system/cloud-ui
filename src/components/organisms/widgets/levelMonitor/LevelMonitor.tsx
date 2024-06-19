import React, {useState} from 'react'
import {Button, PolicyAllowed, WidgetContainer, WidgetTitle} from '../../../atoms'
import type {WidgetPropsType} from '../index'
import {PolicyUtils} from '../../../../utils/policyUtils'
import {LevelMonitorSetupValues} from './LevelMonitorSetupValues'
import {LevelMonitorDisplay} from './LevelMonitorDisplay'
import {Stack} from '@mui/material'

export const LevelMonitor: React.FC<WidgetPropsType<'LEVEL_MONITOR'>> = ({widget: levelMonitorWidget}) => {
  const [setupMode, setSetupMode] = useState(false)

  const toggleSetupMode = () => {
    setSetupMode(!setupMode)
  }

  return (
    <WidgetContainer p={2} spacing={2} sx={{minWidth: {xs: '90%', sm: 280}, minHeight: 320}}>
      <Stack spacing={2}>
        <WidgetTitle widget={levelMonitorWidget} />
        <PolicyAllowed policyId={PolicyUtils.WIDGET_LEVEL_MONITOR_UPDATE} direction={'row'}>
          <Button onClick={toggleSetupMode} variant={'contained'}>
            {setupMode ? 'Disable' : 'Enable'} setup mode
          </Button>
        </PolicyAllowed>
      </Stack>
      <Stack height={'100%'} justifyContent={'center'}>
        {setupMode ? (
          <LevelMonitorSetupValues widget={levelMonitorWidget} />
        ) : (
          <LevelMonitorDisplay widget={levelMonitorWidget} />
        )}
      </Stack>
    </WidgetContainer>
  )
}
