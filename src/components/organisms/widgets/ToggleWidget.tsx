import type {FC} from 'react'
import {IconButton, Stack, Switch, Typography} from '@mui/material'
import {useSelector} from '../../../hooks'
import {FlashOff, FlashOn} from '@mui/icons-material'
import type {WidgetPropsType} from '../Widget'

export const ToggleWidget: FC<WidgetPropsType> = ({widget, updateValue}) => {
  const feed = useSelector(state => state.feeds[widget.feedId])
  const handleClick = () => {
    updateValue(1 - feed.value)
  }

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
      <Stack direction={'row'} alignItems={'center'} ml={-1}>
        <IconButton onClick={handleClick} disabled={feed.type === 'INPUT'}>
          {feed.value === 1 ? <FlashOn color={'primary'} /> : <FlashOff />}
        </IconButton>
        <Typography>{widget.name}</Typography>
      </Stack>
      <Switch checked={feed.value === 1} onClick={handleClick} disabled={feed.type === 'INPUT'} />
    </Stack>
  )
}
