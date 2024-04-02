import type {PropsWithChildren} from 'react'
import React, {useState} from 'react'
import type {ModalFormSelectInputType} from '../../atoms'
import {ModalFormSelect} from '../../atoms'
import {Stack} from '@mui/material'
import type {Board} from '../../../typing/board'
import {useDispatch, useForm, useToast} from '../../../hooks'
import {WidgetService} from '../../../services/widgets/widgetService'
import {widgets} from '../widgets'
import {addWidget} from '../../../store/actions/boards'

type AddWidgetPropsType = {board: Board}

export const AddWidget: React.FC<PropsWithChildren<AddWidgetPropsType>> = ({children, board}) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()
  const {onClear, values, handleSubmit, onChange} = useForm({type: ''})

  const formInputs: ModalFormSelectInputType[] = [
    {
      label: 'Select widget',
      value: values.type,
      required: true,
      handleChange: (_event, value) => {
        onChange('type', value ?? '')
      },
      options: [...widgets]
    }
  ]

  const onSubmit = () => {
    setLoading(true)
    WidgetService.addWidget({...values, boardId: board.boardId})
      .then(widget => {
        onClear()
        dispatch(addWidget(widget, board.boardId))
        handleClose()
      })
      .catch(toast.error)
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Stack>
      <Stack
        onClick={() => {
          setOpen(true)
        }}
      >
        {children}
      </Stack>
      <ModalFormSelect
        open={open}
        handleClose={handleClose}
        formInputs={formInputs}
        formTitle={'Add widget'}
        loading={loading}
        handleSubmit={handleSubmit(onSubmit)}
        submitLabel={'Add widget'}
      />
    </Stack>
  )
}
