import type React from 'react'
import {useState} from 'react'
import type {CollectionOfButtonsWidget} from '../../../../../typing/widget/widget'
import type {ButtonType} from '../../../../../typing/widget/collectionOfButtons'
import {CollectionOfButtonsService} from '../../../../../services/widgets'
import {useDispatch, useToast} from '../../../../../hooks'
import {updateWidget} from '../../../../../store/actions/boards'

type EventsMap = {
  boolean: React.ChangeEvent<HTMLInputElement>
  number: Event
}

type ValueMap = {
  boolean: boolean
  number: number | number[]
}

type UseSwitchButtonsType = (widget: CollectionOfButtonsWidget) => {
  handleChange: <U extends 'number' | 'boolean'>(
    button: ButtonType
  ) => (_event: EventsMap[U], value: ValueMap[U]) => void
  editMode: boolean
  toggleEditMode: () => void
}

export const useSwitchButtons: UseSwitchButtonsType = (widget: CollectionOfButtonsWidget) => {
  const [editMode, setEditMode] = useState(false)
  const toggleEditMode = () => {
    setEditMode(!editMode)
  }
  const dispatch = useDispatch()
  const toast = useToast()
  let timeout: NodeJS.Timeout
  let time: number

  const handleChange = <T extends 'number' | 'boolean'>(button: ButtonType) => {
    return (_event: EventsMap[T], value: ValueMap[T]): void => {
      if (time > new Date().getTime() - 100) {
        clearTimeout(timeout)
      }
      timeout = setTimeout(() => {
        CollectionOfButtonsService.updateButtonValue(+value, button.buttonId, widget)
          .then(({buttons}) => {
            dispatch(updateWidget({...widget, buttons}, widget.boardId))
          })
          .catch(toast.error)
      }, 100)
      time = new Date().getTime()
    }
  }

  return {editMode, toggleEditMode, handleChange}
}
