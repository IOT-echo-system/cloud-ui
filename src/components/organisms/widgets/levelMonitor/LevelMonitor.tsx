import React, {useState} from 'react'
import {Button, PolicyAllowed, WidgetContainer, WidgetTitle} from '../../../atoms'
import type {WidgetPropsType} from '../index'
import {PolicyUtils} from '../../../../utils/policyUtils'
import {LevelMonitorSetupValues} from './LevelMonitorSetupValues'
import {LevelMonitorDisplay} from './LevelMonitorDisplay'
import {Stack} from '@mui/material'

export const LevelMonitor: React.FC<WidgetPropsType<'LEVEL_MONITOR'>> = ({widget}) => {
  const [setupMode, setSetupMode] = useState(false)

  const toggleSetupMode = () => {
    setSetupMode(!setupMode)
  }

  const level = ((widget.actualValue - widget.minValue) * 100) / (widget.maxValue - widget.minValue)
  return (
    <Stack sx={{position: 'relative'}}>
      <WidgetContainer spacing={2} sx={{minWidth: {xs: '90%', sm: 280}, minHeight: 320}}>
        <Stack spacing={2} sx={{zIndex: 2}}>
          <WidgetTitle widget={widget} />
          <PolicyAllowed policyId={PolicyUtils.WIDGET_LEVEL_MONITOR_UPDATE} direction={'row'}>
            <Button onClick={toggleSetupMode} variant={'contained'}>
              {setupMode ? 'Disable' : 'Enable'} setup mode
            </Button>
          </PolicyAllowed>
        </Stack>
        <Stack height={'100%'} justifyContent={'center'} sx={{zIndex: 2}}>
          {setupMode ? <LevelMonitorSetupValues widget={widget} /> : <LevelMonitorDisplay widget={widget} />}
        </Stack>
      </WidgetContainer>
      <Stack
        sx={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
          bgcolor: 'lightblue',
          height: `${level}%`,
          zIndex: 0,
          borderRadius: level >= 98 ? '8px' : 0,
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px'
        }}
      ></Stack>
    </Stack>
  )
}
