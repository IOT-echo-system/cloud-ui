import {useState} from 'react'
import {useDispatch, useForm, useSelector, useToast} from '../../../../../hooks'
import type {FormInputType} from '../../../../atoms'
import type {GetFormPropsTypeFunction} from '../../model'
import {FeedService} from '../../../../../services'
import {updateFeed} from '../../../../../store/actions/feeds'

export const AddFeed: GetFormPropsTypeFunction = handleClose => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  const {premises, boards} = useSelector(state => state)
  const boardIds = premises!.boards.map(boardId => ({label: `${boards[boardId].name} (${boardId})`, value: boardId}))
  const {onClear, values, handleSubmit, onChange} = useForm({name: '', boardId: '', type: ''})

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Feed name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    },
    {
      inputType: 'selectField',
      label: 'Board',
      options: boardIds,
      value: values.boardId,
      required: true,
      handleChange: value => {
        onChange('boardId', value as string)
      }
    },
    {
      inputType: 'selectField',
      label: 'Type',
      options: [
        {label: 'INPUT', value: 'INPUT'},
        {label: 'OUTPUT', value: 'OUTPUT'}
      ],
      value: values.type,
      required: true,
      handleChange: value => {
        onChange('type', value as string)
      }
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    FeedService.createFeed(values)
      .then(feed => {
        onClear()
        handleClose()
        dispatch(updateFeed(feed))
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    handleSubmit: handleSubmit(onSubmit),
    loading,
    formInputs,
    formTitle: 'Add feed',
    submitLabel: 'Add feed'
  }
}
