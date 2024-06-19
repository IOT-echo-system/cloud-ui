import React from 'react'
import type {WidgetPropsType} from '../index'
import {Stack, Typography} from '@mui/material'

export const LevelMonitorDisplay: React.FC<WidgetPropsType<'LEVEL_MONITOR'>> = ({widget: levelMonitorWidget}) => {
  return (
    <Stack direction={'row'} spacing={2} justifyContent={'center'} alignItems={'center'}>
      <Stack bgcolor={'background.paper'} borderRadius={2}>
        <Typography p={'8px 16px'}>
          {levelMonitorWidget.value.toFixed(2)} {levelMonitorWidget.symbol}
        </Typography>
      </Stack>
    </Stack>
  )
}
