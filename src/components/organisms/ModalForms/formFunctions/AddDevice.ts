import {useState} from 'react'
import {useDispatch, useForm, useSelector, useToast} from '../../../../hooks'
import {BoardService} from '../../../../services/boardService'
import {setBoards} from '../../../../store/actions/boards'
import type {FormInputType} from '../../../atoms'
import type {GetFormPropsTypeFunction} from '../model'

export const AddDevice: GetFormPropsTypeFunction = handleClose => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const {boards} = useSelector(state => state)
  const dispatch = useDispatch()
  const {onClear, values, handleSubmit, onChange} = useForm({name: ''})

  const formInputs: FormInputType[] = [
    {
      label: 'Device name',
      value: values.name,
      required: true,
      onChange: event => {
        onChange('name', event.target.value)
      }
    }
  ]

  const onSubmit = (values: {name: string}) => {
    setLoading(true)
    BoardService.createBoard(values)
      .then(board => {
        onClear()
        dispatch(setBoards([board, ...boards]))
        handleClose()
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  return {handleSubmit: handleSubmit(onSubmit), loading, formInputs, formTitle: 'Add Device', submitLabel: 'Add device'}
}
