import {useState} from 'react'
import {useDispatch, useForm, useToast} from '../../../../hooks'
import {BoardService} from '../../../../services'
import {updateBoard} from '../../../../store/actions/boards'
import type {FormInputType} from '../../../atoms'
import type {GetFormPropsTypeFunction} from '../model'
import type {Board} from '../../../../typing/board'

export type EditBoardNamePropsType = {board: Board}

export const EditBoardName: GetFormPropsTypeFunction<EditBoardNamePropsType> = (handleClose, {board}) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const dispatch = useDispatch()
  const {values, handleSubmit, onChange} = useForm({name: board.name})

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Update Board name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    }
  ]

  const onSubmit = (values: {name: string}) => {
    setLoading(true)
    BoardService.updateBoardName(values, board.boardId)
      .then(({name}) => {
        dispatch(updateBoard({...board, name}))
        handleClose()
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
    submitLabel: 'Update board name'
  }
}
