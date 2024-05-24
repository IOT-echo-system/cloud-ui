import {IconButton, Stack} from '@mui/material'
import React from 'react'
import type {TitleWithIdProps} from './TitleWithId'
import {TitleWithId} from './TitleWithId'
import {PolicyAllowed} from './PolicyAllowed'
import type {ModalFormsPropsType} from '../organisms'
import {ModalForms} from '../organisms'
import {Edit} from '@mui/icons-material'

type EditableTitleWithIdProps<T extends Record<string, unknown>> = {policyId: string} & ModalFormsPropsType<T> &
  TitleWithIdProps

export const EditableTitleWithId = <T extends Record<string, unknown>>(
  props: EditableTitleWithIdProps<T>
): React.JSX.Element => {
  return (
    <Stack direction={'row'} alignItems={'start'} spacing={2}>
      <TitleWithId title={props.title} id={props.id} idLabel={props.idLabel} />
      <PolicyAllowed policyId={props.policyId}>
        <ModalForms {...props.getFormDetails} {...props}>
          <IconButton color={'primary'}>
            <Edit />
          </IconButton>
        </ModalForms>
      </PolicyAllowed>
    </Stack>
  )
}
