import React from 'react'
import type {CollectionOfButtonsWidget} from '../../../../../typing/widget/widget'
import {Slider, Stack, Switch, Typography} from '@mui/material'

type SwitchButtonsPropsType = {widget: CollectionOfButtonsWidget}

export const SwitchButtons: React.FC<SwitchButtonsPropsType> = ({widget}) => {
  if (widget.buttons.isEmpty()) {
    return <Typography color={'error'}>You haven't configured any button!!</Typography>
  }
  return (
    <Stack spacing={1}>
      {widget.buttons.map(button => {
        return (
          <Stack
            direction={button.type === 'DIGITAL' ? 'row' : 'column'}
            justifyContent={button.type === 'DIGITAL' ? 'space-between' : 'center'}
            sx={{minWidth: '260px'}}
            alignItems={button.type === 'DIGITAL' ? 'center' : 'start'}
          >
            <Typography>{button.name}</Typography>
            {button.type === 'DIGITAL' ? (
              <Switch disabled={button.mode === 'INPUT'} />
            ) : (
              <Stack
                spacing={2}
                direction="row"
                sx={{mb: 1, width: '100%'}}
                alignItems="center"
                justifyContent={'center'}
              >
                <Typography>{button.min}</Typography>
                <Slider
                  aria-label="Volume"
                  sx={{minWidth: '220px'}}
                  disabled={button.mode === 'INPUT'}
                  min={button.min}
                  max={button.max}
                  valueLabelDisplay="auto"
                />
                <Typography>{button.max}</Typography>
              </Stack>
            )}
          </Stack>
        )
      })}
    </Stack>
  )
}
