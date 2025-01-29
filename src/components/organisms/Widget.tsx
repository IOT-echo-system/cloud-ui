import type {FC} from 'react'
import {useDispatch, useSelector, useToast} from '../../hooks'
import type {WidgetTypes} from './ModalForms/formFunctions/premises/widgets/widgets'
import type {Widget as WidgetType} from '../../typing/widget/widget'
import {SliderWidget, ToggleWidget} from './widgets'
import {updateFeed} from '../../store/actions/feeds'
import {FeedService} from '../../services'
import type {ServerError} from '../../typing/error'

const WidgetComponent: Record<WidgetTypes, FC<WidgetPropsType>> = {
  TOGGLE: ToggleWidget,
  SLIDER: SliderWidget
}

export const Widget: FC<{widgetId: string}> = ({widgetId}) => {
  const {widgets, feeds} = useSelector(state => state)
  const dispatch = useDispatch()
  const toast = useToast()

  const widget = widgets[widgetId]
  const Component = WidgetComponent[widget.type]

  const handleUpdateValue = (value: number) => {
    const oldFeed = {...feeds[widget.feedId]}
    dispatch(updateFeed({...feeds[widget.feedId], value}))
    FeedService.updateValue(widget.feedId, value)
      .then(feed => {
        dispatch(updateFeed(feed))
      })
      .catch((error: ServerError) => {
        toast.error(error)
        dispatch(updateFeed(oldFeed))
      })
  }

  return <Component widget={widget} updateValue={handleUpdateValue} />
}

export type WidgetPropsType = {widget: WidgetType; updateValue: (value: number) => void}
