import {useEffect, useState} from 'react'
import {useDispatch, useForm, useSelector, useToast} from '../../../../../hooks'
import type {FormInputType, FormSelectOption} from '../../../../atoms'
import type {GetFormPropsTypeFunction} from '../../model'
import {BoardService} from '../../../../../services'
import {MasterService} from '../../../../../services/masterService'
import {updateBoard} from '../../../../../store/actions/boards'
import {addBoardInPremises} from '../../../../../store/actions/premises'

export const AddBoard: GetFormPropsTypeFunction = handleClose => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  const premises = useSelector(state => state.premises)!
  const [boards, setBoards] = useState<FormSelectOption[]>([])
  const {onClear, values, handleSubmit, onChange} = useForm({name: '', type: ''})

  useEffect(() => {
    MasterService.getBoards()
      .then(boardsType => {
        setBoards(boardsType.map(board => ({label: board.name, value: board.name})))
      })
      .catch(toast.error)
  }, [])

  const formInputs: FormInputType[] = [
    {
      inputType: 'textField',
      label: 'Board name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    },
    {
      inputType: 'selectField',
      label: 'Board type',
      options: boards,
      required: true,
      handleChange: value => {
        onChange('type', value as string)
      }
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    BoardService.createBoard(premises.premisesId, values)
      .then(board => {
        onClear()
        handleClose()
        dispatch(addBoardInPremises(board.boardId))
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
    formTitle: 'Add board',
    submitLabel: 'Add board'
  }
}
