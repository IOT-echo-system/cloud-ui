import React, {useState} from 'react'
import {Button, PolicyAllowed, WidgetContainer, WidgetTitle} from '../../../atoms'
import type {WidgetPropsType} from '../index'
import {PolicyUtils} from '../../../../utils/policyUtils'
import {LevelMonitorSetupValues} from './LevelMonitorSetupValues'
import {LevelMonitorDisplay} from './LevelMonitorDisplay'

export const LevelMonitor: React.FC<WidgetPropsType<'LEVEL_MONITOR'>> = ({widget: levelMonitorWidget}) => {
  const [setupMode, setSetupMode] = useState(false)

  const toggleSetupMode = () => {
    setSetupMode(!setupMode)
  }

  return (
    <WidgetContainer p={2} spacing={2} sx={{minWidth: {xs: '90%', sm: 280}}}>
      <WidgetTitle widget={levelMonitorWidget} />
      <PolicyAllowed policyId={PolicyUtils.WIDGET_LEVEL_MONITOR_UPDATE} direction={'row'}>
        <Button onClick={toggleSetupMode} variant={'contained'}>
          {setupMode ? 'Disable' : 'Enable'} setup mode
        </Button>
      </PolicyAllowed>
      {setupMode ? (
        <LevelMonitorSetupValues widget={levelMonitorWidget} />
      ) : (
        <LevelMonitorDisplay widget={levelMonitorWidget} />
      )}
    </WidgetContainer>
  )
}
