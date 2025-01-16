import {useState} from 'react'
import {useForm, useSelector, useToast} from '../../../../../hooks'
import type {FormInputType} from '../../../../atoms'
import type {GetFormPropsTypeFunction} from '../../model'
import {FeedService} from '../../../../../services'

export const AddFeed: GetFormPropsTypeFunction = handleClose => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
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
      required: true,
      handleChange: value => {
        onChange('type', value as string)
      }
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    FeedService.createFeed(premises!.premisesId, values)
      .then(() => {
        onClear()
        handleClose()
        // dispatch(addBoardInPremises(board.boardId))
        // dispatch(updateBoard(board))
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
