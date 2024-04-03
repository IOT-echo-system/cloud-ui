import React from 'react'
import {useInvoiceSeed} from './useInvoiceSeed'
import type {Widget} from '../../../../../typing/widget'
import {Stack, Typography} from '@mui/material'
import {Button} from '../../../../atoms'
import {ModalForms} from '../../../ModalForms/ModalForms'
import {Add} from '@mui/icons-material'
import {AddInvoiceSeedItem} from './AddInvoiceSeedItem'

type InvoiceSeedPropsType = {widget: Widget}
export const InvoiceSeed: React.FC<InvoiceSeedPropsType> = ({widget}) => {
  const {open, handleToggle, seed, addSeed} = useInvoiceSeed(widget)

  return (
    <Stack alignItems={'start'} spacing={2}>
      <Stack direction={'row'} spacing={2}>
        <Button onClick={handleToggle} variant={'contained'}>
          {open ? 'Hide' : 'Show'} seed data
        </Button>
        {open && (
          <ModalForms getFormDetails={AddInvoiceSeedItem} widget={widget} addSeed={addSeed}>
            <Button endIcon={<Add />} variant={'contained'}>
              Add Seed
            </Button>
          </ModalForms>
        )}
      </Stack>
      {open && (
        <>
          <Stack>
            {seed.isEmpty() ? (
              <Typography color={'error'}>You haven't configured any seed data!!!</Typography>
            ) : (
              <>Seed Data</>
            )}
          </Stack>
        </>
      )}
    </Stack>
  )
}
