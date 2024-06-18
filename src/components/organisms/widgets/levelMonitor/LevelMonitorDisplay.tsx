import React from 'react'
import type {WidgetPropsType} from '../index'
import {Stack, Typography} from '@mui/material'

export const LevelMonitorDisplay: React.FC<WidgetPropsType<'LEVEL_MONITOR'>> = ({widget: levelMonitorWidget}) => {
  return (
    <Stack direction={'row'} spacing={2} minHeight={200} justifyContent={'center'} alignItems={'center'}>
      <Typography p={'16px 32px'} bgcolor={'paper'}>
        {levelMonitorWidget.value} {levelMonitorWidget.symbol}
      </Typography>
    </Stack>
  )
}
