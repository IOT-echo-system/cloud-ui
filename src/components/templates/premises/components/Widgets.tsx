import React from 'react'
import {Box, Stack} from '@mui/material'
import {Widget} from '../../../organisms'

export const Widgets: React.FC<{widgetIds: string[]}> = ({widgetIds}) => {
  return (
    <Stack mt={2} gap={2}>
      <Stack flexWrap={'wrap'} gap={2}>
        {widgetIds.map(widgetId => {
          return (
            <Box key={widgetId}>
              <Widget widgetId={widgetId} />
            </Box>
          )
        })}
      </Stack>
    </Stack>
  )
}
