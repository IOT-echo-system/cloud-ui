import type {FC} from 'react'
import React from 'react'
import type {WidgetPropsType} from '../Widget'
import {Slider, Stack, Typography} from '@mui/material'
import type {SliderConfigType} from '../ModalForms/formFunctions/premises/widgets/AddSlider'
import {useSelector} from '../../../hooks'

export const SliderWidget: FC<WidgetPropsType> = ({widget, updateValue}) => {
  const feed = useSelector(state => state.feeds[widget.feedId])

  const config = widget.config as SliderConfigType

  const handleChange = (_event: Event, value: number | number[]) => {
    updateValue(value as number)
  }

  const valuetext = (value: number) => `${value}${config.label}`

  return (
    <Stack>
      <Typography>
        {widget.name} ({feed.value}
        {config.label})
      </Typography>
      <Stack direction={'row'} spacing={2}>
        <Typography>
          {config.min}
          {config.label}
        </Typography>
        <Slider
          onChange={handleChange}
          valueLabelFormat={valuetext}
          valueLabelDisplay="auto"
          step={config.step}
          min={config.min}
          max={config.max}
          value={feed.value}
          disabled={feed.type === 'INPUT'}
        />
        <Typography>
          {config.max}
          {config.label}
        </Typography>
      </Stack>
    </Stack>
  )
}
