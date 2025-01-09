import {useState} from 'react'
import {useDispatch, useForm, useToast} from '../../../../../hooks'
import type {FormInputType} from '../../../../atoms'
import type {GetFormPropsTypeFunction} from '../../model'
import {BoardService} from '../../../../../services'
import {updateBoard} from '../../../../../store/actions/boards'
import type {Board} from '../../../../../typing/board'

export const UpdateBoardName: GetFormPropsTypeFunction<{board: Board}> = (handleClose, {board}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  const {values, handleSubmit, onChange} = useForm({name: board.name})

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Board name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    BoardService.updateName(board.premisesId, board.boardId, values)
      .then(board => {
        handleClose()
        dispatch(updateBoard(board))
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
    formTitle: 'Update board name',
    submitLabel: 'Update name'
  }
}
